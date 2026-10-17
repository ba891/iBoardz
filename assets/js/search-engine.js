/**
 * iBoardz — Search Engine
 * ------------------------------------------------------------------
 * Dependency-free client side search that behaves like the big stores:
 *
 *   1. Arabic-aware normalization (أ إ آ ٱ -> ا, ى -> ي, ة -> ه, remove
 *      diacritics + tatweel, Arabic-Indic digits -> latin, punctuation).
 *   2. Bilingual synonyms so "arduino" == "اردوينو" == "لوح".
 *   3. Weighted multi-field index (name > nameAr > keywords > sku >
 *      category > description > specs > badge) with AND token matching.
 *   4. Typo tolerance (Damerau-Levenshtein) with length-aware budget,
 *      memoized so typing stays instant.
 *   5. Relevance ranking, phrase bonus, popularity & stock signals,
 *      plus "did you mean" correction.
 *
 * Usage:  IBSearch.build(products, categories)  ->  IBSearch.query('esp32')
 */
(function (global) {
  'use strict';

  // ===== ARABIC NORMALIZATION =====
  var DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;
  var ARABIC_DIGITS = /[\u0660-\u0669\u06F0-\u06F9]/g;
  var PUNCTUATION = /[^\p{L}\p{N}]+/gu;
  var LATIN_DIACRITICS = /[\u0300-\u036F]/g;

  var LETTER_MAP = {
    '\u0623': '\u0627', // أ
    '\u0625': '\u0627', // إ
    '\u0622': '\u0627', // آ
    '\u0671': '\u0627', // ٱ
    '\u0649': '\u064A', // ى -> ي
    '\u0629': '\u0647', // ة -> ه
    '\u06CC': '\u064A', // ی -> ي
    '\u06A9': '\u0643', // ک -> ك
    '\u0643': '\u0643',
    '\u2010': '-', '\u2011': '-', '\u2012': '-', '\u2013': '-', '\u2014': '-', '\u2015': '-',
    '\u00A0': ' ', '\u2026': ' ',
  };

  function mapChars(str) {
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      out += Object.prototype.hasOwnProperty.call(LETTER_MAP, ch) ? LETTER_MAP[ch] : ch;
    }
    return out;
  }

  function toLatinDigits(str) {
    return str.replace(ARABIC_DIGITS, function (d) {
      var code = d.charCodeAt(0);
      var base = code >= 0x06F0 ? 0x06F0 : 0x0660;
      return String(code - base);
    });
  }

  /** Normalized, comparable form of any text. */
  function normalize(input) {
    if (input == null) return '';
    var s = String(input).toLowerCase();
    s = s.replace(DIACRITICS, '').replace(LATIN_DIACRITICS, '');
    s = mapChars(s);
    s = toLatinDigits(s);
    s = s.replace(PUNCTUATION, ' ');
    return s.replace(/\s+/g, ' ').trim();
  }

  /** Normalized form without spaces — hard fallback matching. */
  function compact(input) {
    return normalize(input).replace(/\s+/g, '');
  }

  function tokenize(input) {
    var n = normalize(input);
    if (!n) return [];
    // esp32c3 -> esp32 c3
    return n.replace(/([a-z])(\d)/g, '$1 $2').replace(/(\d)([a-z])/g, '$1 $2')
      .split(' ').filter(Boolean);
  }

  // ===== SYNONYMS (query expansion) =====
  var RAW_SYNONYMS = {
    // boards & brands
    'اردوينو': ['arduino', 'اوردوينو', 'uno', 'board', 'لوح', 'متحكم'],
    'اوردوينو': ['arduino', 'اردوينو', 'uno', 'board'],
    'ارديوينو': ['arduino', 'اردوينو', 'uno'],
    'اردنو': ['arduino', 'اردوينو'],
    'اردوینو': ['arduino', 'اردوينو'],
    'arduino': ['اردوينو', 'اوردوينو', 'uno', 'لوح', 'متحكم'],
    'esp32': ['واي فاي', 'wifi', 'بلوتوث', 'bluetooth', 'متحكم', 'لوح'],
    'esp8266': ['واي فاي', 'wifi', 'لوح', 'متحكم'],
    'nodemcu': ['esp8266', 'wifi', 'واي فاي'],
    'واي فاي': ['wifi', 'wi-fi', 'wireless', 'لاسلكي', 'انترنت'],
    'wifi': ['واي فاي', 'wi-fi', 'wireless', 'لاسلكي'],
    'بلوتوث': ['bluetooth', 'bt'],
    'iot': ['انترنت الأشياء', 'esp32', 'esp8266', 'واي فاي'],
    'انترنت الأشياء': ['iot', 'esp32', 'esp8266'],

    // generic parts
    'حساس': ['مستشعر', 'sensor', 'قياس', 'detector'],
    'حساسات': ['حساس', 'مستشعر', 'sensor'],
    'مستشعر': ['حساس', 'sensor', 'قياس'],
    'sensor': ['حساس', 'مستشعر', 'قياس'],
    'قياس': ['حساس', 'مستشعر', 'sensor'],
    'شاشة': ['عرض', 'display', 'oled', 'lcd', 'screen'],
    'شاشات': ['شاشة', 'display', 'oled', 'lcd'],
    'display': ['شاشة', 'شاشات', 'oled', 'lcd'],
    'oled': ['شاشة', 'display', 'ssd1306', 'sh1107'],
    'lcd': ['شاشة', 'display', '1602'],
    'محرك': ['موتور', 'motor', 'سيرفو', 'سائق'],
    'محركات': ['محرك', 'motor', 'سائق'],
    'موتور': ['محرك', 'motor', 'سيرفو'],
    'motor': ['محرك', 'موتور', 'سيرفو', 'محركات'],
    'سيرفو': ['servo', 'محرك', 'sg90', 'زاوية'],
    'servo': ['سيرفو', 'محرك', 'sg90'],
    'مضخة': ['pump', 'مياه', 'ماء', 'محرك'],
    'ريليه': ['relay', 'قفل', 'تحكم احمال', '220v'],
    'relay': ['ريليه', 'قفل', 'تحكم احمال'],
    'بطارية': ['battery', 'ليثيوم', 'ليبو', 'شحن', 'طاقة'],
    'بطاريه': ['بطارية', 'battery', 'ليثيوم'],
    'battery': ['بطارية', 'ليثيوم', 'ليبو', 'شاحن'],
    'ليثيوم': ['بطارية', 'battery', '18650', 'شاحن'],
    'ليبو': ['بطارية', 'lipo', 'ليثيوم'],
    'شاحن': ['tp4056', 'شحن', 'بطارية', 'charger'],
    'شحن': ['شاحن', 'بطارية', 'tp4056'],
    'اسلاك': ['أسلاك', 'جumper', 'توصيل', 'wires', 'دوبون'],
    'أسلاك': ['اسلاك', 'jumper', 'توصيل', 'wires', 'دوبون'],
    'توصيل': ['اسلاك', 'أسلاك', 'jumper', 'wires'],
    'wires': ['اسلاك', 'أسلاك', 'جumper', 'توصيل'],
    'wire': ['اسلاك', 'أسلاك', 'جumper', 'توصيل'],
    'جumper': ['اسلاك', 'توصيل', 'wires'],
    'مقاوم': ['مقاومات', 'المقاومة', 'resistor', 'اهم', 'ohm', '220', '10k'],
    'مقاومات': ['مقاوم', 'المقاومة', 'resistor', 'اهم', 'ohm'],
    'المقاومة': ['مقاوم', 'مقاومات', 'resistor', 'اهم'],
    'resistor': ['مقاوم', 'مقاومات', 'اهم', 'ohm'],
    'بريدبورد': ['لوحة تجارب', 'breadboard', 'تجارب', 'توصيل'],
    'breadboard': ['بريدبورد', 'لوحة تجارب', 'تجارب'],
    'لوحة تجارب': ['بريدبورد', 'breadboard', 'تجارب'],
    'مفاتيح': ['لوحة مفاتيح', 'keypad', 'ازار', 'أزرار'],
    'ازار': ['أزرار', 'مفتاح', 'button', 'سويتش'],
    'أزرار': ['ازار', 'مفتاح', 'button'],
    'مفتاح': ['سويتش', 'تبديل', 'switch'],
    'سويتش': ['مفتاح', 'switch', 'تبديل'],
    'جويستك': ['joystick', 'عصا تحكم', 'تحكم'],
    'joystick': ['جويستك', 'عصا تحكم'],
    'لمس': ['ttp223', 'touch', 'حساس لمس'],
    'touch': ['ttp223', 'لمس', 'حساس لمس'],
    'جرس': ['buzzer', 'piezo', 'صوت', 'انذار'],
    'buzzer': ['جرس', 'piezo', 'صوت'],
    'غاز': ['mq2', 'mq135', 'دخان', 'gas'],
    'غازات': ['غاز', 'دخان', 'gas'],
    'gas': ['غاز', 'دخان', 'smoke', 'mq2', 'mq135'],
    'حرارة': ['temperature', 'dht', 'ds18b20', 'حساس حرارة'],
    'رطوبة': ['humidity', 'dht', 'dht11', 'تربة'],
    'مسافة': ['ultrasonic', 'sr04', 'فوق صوتي', 'distance'],
    'تربة': ['رطوبة', 'soil', 'moisture', 'زراعة'],
    'ماء': ['water', 'مياه', 'tds', 'مضخة'],
    'مياه': ['ماء', 'water', 'مضخة'],
    'طاقة': ['بطارية', 'شاحن', 'power', 'جهد'],
    'جهد': ['فولت', 'volt', 'محول', 'step up'],
    'فولت': ['جهد', 'volt', 'بطارية'],
    'اسلاك توصيل': ['اسلاك', 'أسلاك', 'jumper', 'توصيل', 'wires'],
    'led': ['ليد', 'لمبة', 'اضاءة'],
    'ليد': ['led', 'لمبة', 'اضاءة'],
    'لمبة': ['led', 'ليد', 'اضاءة'],
    // common misspellings / colloquial forms
    'سنسور': ['sensor', 'حساس', 'مستشعر'],
    'سنساره': ['حساس', 'sensor', 'مستشعر'],
    'كرت': ['card', 'بطاقه', 'sd', 'ذاكره'],
    'كروت': ['card', 'بطاقه', 'sd'],
    'اردوينوا': ['اردوينو', 'arduino'],
    'فاي': ['wifi', 'واي فاي'],
    'بلوتووث': ['بلوتوث', 'bluetooth'],
    'سيرفو موتور': ['servo', 'محرك', 'sg90'],
    'مائي': ['ماء', 'مياه', 'water', 'pump'],
    'شاشه': ['شاشة', 'display', 'oled', 'lcd'],
    'حراره': ['حرارة', 'temperature', 'dht'],
    'ارطسه': ['حساس', 'sensor'],
    'رطيعه': ['بطاريه', 'بطارية', 'battery'],
  };

  var SYNONYMS = (function () {
    var map = Object.create(null);
    Object.keys(RAW_SYNONYMS).forEach(function (key) {
      var norm = normalize(key);
      if (!norm) return;
      var list = (RAW_SYNONYMS[key] || []).map(normalize).filter(Boolean);
      if (!map[norm]) map[norm] = [];
      map[norm] = map[norm].concat(list);
    });
    return map;
  })();

  /**
   * Single-word synonyms of a token.
   * Multi-word entries ("حساس حرارة") are deliberately NOT split into parts:
   * otherwise "حرارة" would also match every product containing "حساس"
   * (TTP223, moisture sensors...). They are matched as whole phrases instead,
   * see phraseSynonymsFor().
   */
  function synonymsFor(token) {
    var list = SYNONYMS[token];
    if (!list) return [];
    var out = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].indexOf(' ') === -1 && list[i] !== token && out.indexOf(list[i]) === -1) out.push(list[i]);
    }
    return out;
  }

  /** Multi-word synonyms, matched against the compact document text. */
  function phraseSynonymsFor(token) {
    var list = SYNONYMS[token];
    if (!list) return [];
    var out = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].indexOf(' ') > -1 && out.indexOf(list[i]) === -1) out.push(list[i]);
    }
    return out;
  }

  // ===== FUZZY (optimal string alignment distance) =====
  var ARABIC_LETTER = /[\u0600-\u06FF]/;
  function editDistance(a, b, max) {
    if (a === b) return 0;
    var alen = a.length, blen = b.length;
    if (!alen) return blen <= max ? blen : max + 1;
    if (!blen) return alen <= max ? alen : max + 1;
    if (Math.abs(alen - blen) > max) return max + 1;

    var prevPrev = new Array(blen + 1);
    var prev = new Array(blen + 1);
    var curr = new Array(blen + 1);
    var i, j;

    for (j = 0; j <= blen; j++) { prev[j] = j; curr[j] = max + 1; }

    for (i = 1; i <= alen; i++) {
      var rowMin = max + 1;
      curr[0] = i;
      for (j = 1; j <= blen; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        var value = Math.min(
          curr[j - 1] + 1,
          prev[j] + 1,
          prev[j - 1] + cost
        );
        if (i > 1 && j > 1 &&
          a.charCodeAt(i - 1) === b.charCodeAt(j - 2) &&
          a.charCodeAt(i - 2) === b.charCodeAt(j - 1)) {
          value = Math.min(value, prevPrev[j - 2] + 1);
        }
        curr[j] = value;
        if (value < rowMin) rowMin = value;
      }
      if (rowMin > max) return max + 1;
      var swap = prevPrev; prevPrev = prev; prev = curr; curr = swap;
    }
    var result = prev[blen];
    return result <= max ? result : max + 1;
  }

  function typoBudget(term) {
    var len = term.length;
    if (len <= 2) return 0;
    if (len <= 4) return 1;
    if (len <= 8) return 2;   // up to two mistakes: "اردوون" -> "اردوينو"
    return 3;
  }

  /** Accept arrays, strings or nothing — catalog data comes from several sources. */
  function joinList(value) {
    if (Array.isArray(value)) return value.filter(Boolean).join(' ');
    if (value == null) return '';
    return String(value);
  }

  // ===== INDEX =====
  var FIELD_WEIGHTS = {
    name: 10,
    nameAr: 9,
    keywords: 7,
    sku: 6,
    category: 5,
    desc: 3.5,
    specs: 2.5,
    badge: 1,
  };

  function Index(products, categories) {
    this.products = products || [];
    this.categories = categories || [];
    this.terms = Object.create(null);   // token -> true
    this.catLabels = Object.create(null);
    this.docs = [];
    this._fuzzyCache = Object.create(null);
    this._termList = null;

    var self = this;
    (this.categories || []).forEach(function (cat) {
      self.catLabels[cat.key] = { key: cat.key, label: cat.label, aliases: cat.aliases || [] };
      self._indexText(cat.label, -1);
      (cat.aliases || []).forEach(function (alias) { self._indexText(alias, -1); });
    });

    this.products.forEach(function (product, index) {
      var fields = {
        name: product.name || '',
        nameAr: product.nameAr || '',
        keywords: joinList(product.keywords),
        sku: product.sku ? String(product.sku) : '',
        badge: product.badge || '',
        desc: product.desc || '',
        specs: joinList(product.specs),
        category: '',
      };
      var cat = self.catLabels[product.cat];
      fields.category = cat ? cat.label + ' ' + joinList(cat.aliases) : (product.cat || '');

      var doc = { product: product, fields: fields, tokens: Object.create(null), prefix: Object.create(null) };
      doc.nameCompact = compact(fields.name);
      doc.compact = compact([fields.name, fields.nameAr, fields.keywords, fields.sku].join(' '));
      Object.keys(fields).forEach(function (key) {
        tokenize(fields[key]).forEach(function (token) {
          var weight = Math.max(doc.tokens[token] || 0, FIELD_WEIGHTS[key]);
          doc.tokens[token] = weight;
          self.terms[token] = true;
          addPrefixes(doc, token, weight);
        });
      });
      self.docs.push(doc);
    });
  }

  /**
   * Index short prefixes of every token.
   * Arabic readers type one or two letters first ("ا" then "ار" then "اردوينو"),
   * so a prefix hit must count — but only as a weak signal, otherwise a single
   * letter would outrank a real match.
   */
  function addPrefixes(doc, token, weight) {
    var min = ARABIC_LETTER.test(token.charAt(0)) ? 1 : 2;
    var max = Math.min(3, token.length - 1);
    for (var n = min; n <= max; n++) {
      var prefix = token.slice(0, n);
      var current = doc.prefix[prefix];
      if (!current || weight < current.w) doc.prefix[prefix] = { w: weight, len: token.length };
    }
  }

  Index.prototype._indexText = function (text, docIndex) {
    tokenize(text).forEach(function (token) { this.terms[token] = true; }, this);
  };

  Index.prototype.hasTerm = function (term) {
    return this.terms[term] === true;
  };

  /** Cached typo-tolerant neighbours of a token (index-wide, not per product). */
  Index.prototype.fuzzyTerms = function (token) {
    if (this._fuzzyCache[token]) return this._fuzzyCache[token];
    var budget = typoBudget(token);
    var found = [];
    if (budget > 0) {
      if (!this._termList) {
        this._termList = Object.keys(this.terms);
      }
      var list = this._termList;
      var first = token.charAt(0);
      for (var i = 0; i < list.length; i++) {
        var term = list[i];
        if (term.charAt(0) !== first) continue;
        if (term === token) continue;
        // Arabic words that only share a first letter are usually false friends
        // ("حرارة" vs "حساس") — require the ending to match as well.
        if (token.length >= 4 && ARABIC_LETTER.test(token) && ARABIC_LETTER.test(term)) {
          if (term.charAt(term.length - 1) !== token.charAt(token.length - 1)) continue;
        }
        if (term.indexOf(token) === 0) { found.push({ term: term, dist: 0 }); continue; }
        if (Math.abs(term.length - token.length) > budget) continue;
        var dist = editDistance(token, term, budget);
        if (dist <= budget) found.push({ term: term, dist: dist });
      }
      found.sort(function (a, b) {
        return a.dist - b.dist || a.term.length - b.term.length || (a.term < b.term ? -1 : 1);
      });
    }
    this._fuzzyCache[token] = found;
    return found;
  };

  // ===== QUERY =====
  function runQuery(index, query, options) {
    options = options || {};
    var rawTokens = tokenize(query);
    var queryCompact = compact(query);
    if (!rawTokens.length) {
      return { results: [], total: 0, tokens: [], terms: [], corrected: false, suggestion: '', empty: true };
    }

    var pool = options.pool && options.pool.length ? options.pool : null;
    var poolSet = pool ? new Set(pool) : null;
    var fuzzyMap = Object.create(null);
    var phraseMap = Object.create(null);
    var rawTokenSet = Object.create(null);
    rawTokens.forEach(function (token) {
      fuzzyMap[token] = index.fuzzyTerms(token);
      phraseMap[token] = phraseSynonymsFor(token);
      rawTokenSet[token] = true;
    });

    var results = [];
    index.docs.forEach(function (doc) {
      if (poolSet && !poolSet.has(doc.product)) return;

      var score = 0;
      var allMatched = true;
      var usedFuzzy = false;
      var usedSynonym = false;
      var matchedTokens = [];
      var bestWeight = 0;

      for (var t = 0; t < rawTokens.length; t++) {
        var token = rawTokens[t];
        var weight = 0;

        if (doc.tokens[token]) {
          weight = doc.tokens[token];
          if (doc.nameCompact === token) weight *= 2.4;
          else if (doc.nameCompact.indexOf(token) === 0) weight *= 1.5;
        } else if (token.length >= 3 && doc.compact.indexOf(token) >= 0) {
          weight = 4;
        } else if (doc.prefix[token]) {
          // partial word: "ارد" -> "اردوينو" (weak, and weaker the longer the word)
          var pre = doc.prefix[token];
          weight = pre.w * 0.35 * (token.length / pre.len);
        } else {
          var candidates = fuzzyMap[token];
          for (var c = 0; c < candidates.length; c++) {
            var cand = candidates[c].term;
            if (doc.tokens[cand]) {
              // closer typos always outrank further ones
              weight = doc.tokens[cand] * 0.9 * Math.pow(0.72, candidates[c].dist);
              usedFuzzy = true;
              break;
            }
          }
        }

        // synonym rescue: "سنسور" -> sensor/حساس, "كرت" -> بطاقة
        if (!weight) {
          var syns = synonymsFor(token);
          for (var s = 0; s < syns.length; s++) {
            var syn = syns[s];
            // never let one query word rescue another ("حرارة" must not match
            // every product whose name starts with "حساس")
            if (rawTokenSet[syn]) continue;
            if (doc.tokens[syn]) {
              weight = doc.tokens[syn] * 0.6;
              usedSynonym = true;
              break;
            }
            if (syn.length >= 3 && doc.compact.indexOf(syn) >= 0) {
              weight = 4 * 0.6;
              usedSynonym = true;
              break;
            }
          }
          // whole-phrase synonyms: "حرارة" -> "حساس حرارة"
          if (!weight) {
            var phrases = phraseMap[token];
            for (var ph = 0; ph < phrases.length; ph++) {
              if (rawTokenSet[phrases[ph]]) continue;
              if (doc.compact.indexOf(phrases[ph]) >= 0) {
                weight = 4 * 0.6;
                usedSynonym = true;
                break;
              }
            }
          }
        }

        if (!weight) { allMatched = false; break; }
        matchedTokens.push(token);
        if (weight > bestWeight) bestWeight = weight;
        score += weight;
      }

      if (!allMatched) return;

      // phrase bonus — the whole query inside one field
      Object.keys(doc.fields).forEach(function (key) {
        var value = normalize(doc.fields[key]);
        if (!value || !queryCompact) return;
        var w = FIELD_WEIGHTS[key];
        if (value === queryCompact) score += w * 5;
        else if (value.indexOf(queryCompact) === 0) score += w * 2.5;
        else if (value.indexOf(queryCompact) > -1) score += w * 1.2;
      });

      if (doc.product.pop) score += 2.5;
      if (doc.product.badge) score += 0.8;
      if (doc.product.stock === 0) score -= 6;
      score -= Math.min(Number(doc.product.price) || 0, 200) / 2000; // cheap first on ties
      if (usedFuzzy) score *= 0.92;
      if (usedSynonym) score *= 0.85;

      results.push({
        product: doc.product,
        score: score,
        matchedTokens: matchedTokens,
        matchedIn: doc.tokens[rawTokens[0]] ? 'name' : 'details',
        viaSynonym: usedSynonym,
        strength: bestWeight,
      });
    });

    results.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return (a.product.price || 0) - (b.product.price || 0);
    });

    // relevance cut-off: drop the noisy tail far below the best hit
    var ratio = options.minRatio == null ? 0.18 : options.minRatio;
    if (ratio > 0 && results.length > 1) {
      var top = results[0].score;
      var floor = top * ratio;
      var kept = results.filter(function (r) { return r.score >= floor; });
      if (kept.length) results = kept;
    }

    var total = results.length;
    var limit = options.limit || 0;
    var suggestion = '';
    if (!results.length) {
      var guess = didYouMean(index, rawTokens, fuzzyMap);
      // only suggest a correction that actually leads somewhere
      if (guess && countStrict(index, guess, poolSet) > 0) suggestion = guess;
    }

    return {
      results: limit ? results.slice(0, limit) : results,
      total: total,
      tokens: rawTokens,
      corrected: !!suggestion,
      suggestion: suggestion,
      empty: false,
    };
  }

  /** Count documents matching every token exactly (fuzzy disabled). */
  function countStrict(index, query, poolSet) {
    var tokens = tokenize(query);
    if (!tokens.length) return 0;
    var count = 0;
    for (var d = 0; d < index.docs.length; d++) {
      var doc = index.docs[d];
      if (poolSet && !poolSet.has(doc.product)) continue;
      var ok = tokens.every(function (t) {
        return !!doc.tokens[t] || (t.length >= 3 && doc.compact.indexOf(t) >= 0);
      });
      if (ok) count++;
    }
    return count;
  }

  /** "did you mean" — snap misspelled tokens onto real catalog terms. */
  function didYouMean(index, rawTokens, fuzzyMap) {
    var fixed = [];
    var changed = false;
    rawTokens.forEach(function (token) {
      var candidates = fuzzyMap[token] || index.fuzzyTerms(token);
      if (index.hasTerm(token)) { fixed.push(token); return; }
      if (candidates.length) { fixed.push(candidates[0].term); changed = true; }
      else fixed.push(token);
    });
    return changed ? fixed.join(' ') : '';
  }

  // ===== HIGHLIGHT / ESCAPE =====
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Highlight query tokens inside a display string.
   * Matching runs on the normalized text but the ORIGINAL string is returned,
   * so Arabic shaping/HTML of the source is never broken.
   */
  function highlight(text, queryTokens) {
    var original = String(text == null ? '' : text);
    if (!queryTokens || !queryTokens.length) return escapeHtml(original);
    var lower = original.toLowerCase();
    var marks = [];
    queryTokens.forEach(function (token) {
      if (!token || token.length < 2) return;
      var i = 0;
      while (i < lower.length) {
        var at = lower.indexOf(token, i);
        if (at === -1) break;
        marks.push([at, at + token.length]);
        i = at + Math.max(1, token.length);
      }
    });
    if (!marks.length) return escapeHtml(original);
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var merged = [marks[0]];
    for (var m = 1; m < marks.length; m++) {
      var last = merged[merged.length - 1];
      if (marks[m][0] <= last[1]) last[1] = Math.max(last[1], marks[m][1]);
      else merged.push(marks[m]);
    }
    var out = '';
    var cursor = 0;
    merged.forEach(function (range) {
      out += escapeHtml(original.slice(cursor, range[0])) + '<mark>' + escapeHtml(original.slice(range[0], range[1])) + '</mark>';
      cursor = range[1];
    });
    out += escapeHtml(original.slice(cursor));
    return out;
  }

  /** Category counts for a result set (used by the filter bar). */
  function facets(index, results) {
    var counts = Object.create(null);
    (index.categories || []).forEach(function (c) { counts[c.key] = 0; });
    (results || []).forEach(function (r) {
      var key = r.product.cat || 'other';
      counts[key] = (counts[key] || 0) + 1;
    });
    counts.all = (results || []).length;
    return counts;
  }

  var API = {
    normalize: normalize,
    compact: compact,
    tokenize: tokenize,
    highlight: highlight,
    escapeHtml: escapeHtml,
    editDistance: editDistance,
    build: function (products, categories) { return new Index(products, categories); },
    query: runQuery,
    facets: facets,
    Index: Index,
  };

  if (typeof module === 'object' && module.exports) module.exports = API;
  global.IBSearch = API;
})(typeof window !== 'undefined' ? window : globalThis);