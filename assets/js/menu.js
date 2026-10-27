/**
 * iBoardz — Mega menu markup
 * ------------------------------------------------------------------
 * Renders the navigation panel opened from the header menu button.
 * Kept separate from app.js so the large menu template is easy to edit.
 */
(function (global) {
  'use strict';

  var MENU = {
    html: function (app) {
      var navMeta = {
        home: { icon: 'home', desc: 'ابدأ من الصفحة الرئيسية', href: app.pagePath('home') },
        products: { icon: 'box', desc: 'تصفّح ' + app.productCount(app.products.length) + ' حسب القسم', href: app.shopUrl() },
        projects: { icon: 'grid', desc: 'أطقم مشاريع جاهزة بسعر واحد', href: app.pagePath('projects') },
        contact: { icon: 'envelope', desc: 'واتساب، بريد ودعم فني', href: app.pagePath('contact') },
        terms: { icon: 'shield', desc: 'الشحن والاسترجاع والضمان', href: app.pagePath('terms') }
      };

      var nav = app.navItems.map(function (n) {
        var meta = navMeta[n.key] || navMeta.home;
        var active = app.state.page === n.key;
        return '<a class="mega-nav-link' + (active ? ' active' : '') + '" href="' + meta.href + '" onclick="App.closeMenu()"' + (active ? ' aria-current="page"' : '') + '>' +
          '<span class="mega-nav-icon">' + app.svgIcon(app.icons[meta.icon] || app.icons.envelope, 17) + '</span>' +
          '<span class="mega-nav-copy"><strong>' + app.esc(n.label) + '</strong><small>' + app.esc(meta.desc) + '</small></span>' +
          '<span class="mega-nav-arrow">' + app.svgIcon('<polyline points="15 18 9 12 15 6"/>', 14) + '</span>' +
        '</a>';
      }).join('');

      var cats = app.cats().filter(function (c) { return c.key !== 'all'; }).map(function (c) {
        return '<a class="mega-cat" href="' + app.categoryUrl(c.key) + '" title="' + app.esc(c.label) + '" onclick="App.closeMenu()">' +
          '<span class="mega-cat-icon">' + app.svgIcon(c.icon, 17) + '</span>' +
          '<span class="mega-cat-copy"><strong>' + app.esc(c.label) + '</strong><small>' + app.productCount(app.catCount(c.key)) + '</small></span>' +
        '</a>';
      }).join('');

      var supportText = 'مرحباً، أحتاج مساعدة في اختيار قطعة من متجر iBoardz';
      var supportUrl = app.wa(supportText);
      var arrow = app.svgIcon('<polyline points="15 18 9 12 15 6"/>', 14);

      return '' +
        '<div class="mega-head">' +
          '<div class="mega-head-copy">' +
            '<span class="mega-kicker">iBoardz · ARDUINO FUTURE</span>' +
            '<h2>تصفّح المتجر</h2>' +
          '</div>' +
          '<button class="mega-close" onclick="App.closeMenu()" aria-label="إغلاق القائمة">' + app.svgIcon(app.icons.close, 18) + '</button>' +
        '</div>' +
        '<div class="mega-body">' +
          '<nav class="mega-nav" aria-label="روابط الموقع">' +
            '<span class="mega-label">روابط سريعة</span>' +
            nav +
            '<a class="mega-support" href="' + supportUrl + '" target="_blank" rel="noopener noreferrer">' +
              '<span class="mega-support-icon">' + app.svgIcon(app.icons.headset, 17) + '</span>' +
              '<span><strong>محتاج مساعدة؟</strong><small>راسلنا على واتساب</small></span>' +
            '</a>' +
          '</nav>' +
          '<div class="mega-cats">' +
            '<div class="mega-cat-head">' +
              '<span class="mega-label">تسوق حسب القسم</span>' +
              '<a class="mega-cat-all" href="' + app.shopUrl() + '" onclick="App.closeMenu()">كل المنتجات ' + arrow + '</a>' +
            '</div>' +
            '<div class="mega-cat-grid">' + cats + '</div>' +
          '</div>' +
          '<aside class="mega-promo" aria-label="مساعدة سريعة">' +
            '<span class="mega-promo-badge">دعم مباشر</span>' +
            '<span class="mega-promo-icon">' + app.svgIcon(app.icons.headset, 20) + '</span>' +
            '<h3>محتاج مساعدة في اختيار القطع؟</h3>' +
            '<p>فريق iBoardz يساعدك في اختيار المكونات المناسبة لمشروعك.</p>' +
            '<a class="mega-promo-btn" href="' + supportUrl + '" target="_blank" rel="noopener noreferrer">' + app.svgIcon(app.icons.whatsapp, 15) + ' تواصل عبر واتساب</a>' +
            '<button class="mega-promo-service" onclick="App.closeMenu();App.showService(\'svc-3d-printing\')">' + app.svgIcon(app.icons.printer, 15) + ' خدمة الطباعة ثلاثية الأبعاد</button>' +
            '<div class="mega-promo-stats">' +
              '<div><strong>' + app.products.length + '</strong><span>منتج</span></div>' +
              '<div><strong>' + (app.cats().length - 1) + '</strong><span>أقسام</span></div>' +
            '</div>' +
          '</aside>' +
        '</div>';
    }
  };

  global.IBOARDZ_MENU = MENU;
})(window);
