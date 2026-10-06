/* Colorful language site - the whole script.
 *
 * Four small behaviours, no dependencies:
 *   theme toggle (persisted), mobile menu, code copy buttons, docs scroll spy.
 */
(function () {
  'use strict';

  var THEME_KEY = 'colorful-theme';

  /* ------------------------------------------------------------- theming */

  function preferredTheme() {
    var stored = null;
    try {
      stored = window.localStorage.getItem(THEME_KEY);
    } catch (error) {
      stored = null;
    }
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var button = document.querySelector('[data-theme-toggle]');
    if (button) {
      var label = theme === 'dark' ? '切换到浅色主题' : '切换到深色主题';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    }
  }

  function initTheme() {
    applyTheme(preferredTheme());
    var button = document.querySelector('[data-theme-toggle]');
    if (!button) {
      return;
    }
    button.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        /* private mode: the choice just will not persist */
      }
    });
  }

  /* ---------------------------------------------------------- mobile menu */

  function initMenu() {
    var button = document.querySelector('[data-menu-toggle]');
    var nav = document.querySelector('[data-nav]');
    if (!button || !nav) {
      return;
    }
    button.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (event) {
      if (event.target && event.target.tagName === 'A') {
        nav.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------------- copy buttons */

  function initCopyButtons() {
    var blocks = document.querySelectorAll('.code');
    Array.prototype.forEach.call(blocks, function (block) {
      var pre = block.querySelector('pre');
      if (!pre) {
        return;
      }
      var head = block.querySelector('.code-head');
      if (!head) {
        return;
      }
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-btn';
      button.textContent = '复制';
      button.addEventListener('click', function () {
        var text = pre.innerText;
        var done = function () {
          button.textContent = '已复制';
          window.setTimeout(function () {
            button.textContent = '复制';
          }, 1400);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, fallback);
        } else {
          fallback();
        }
        function fallback() {
          var area = document.createElement('textarea');
          area.value = text;
          area.setAttribute('readonly', '');
          area.style.position = 'fixed';
          area.style.opacity = '0';
          document.body.appendChild(area);
          area.select();
          try {
            document.execCommand('copy');
            done();
          } catch (error) {
            button.textContent = '复制失败';
          }
          document.body.removeChild(area);
        }
      });
      head.appendChild(button);
    });
  }

  /* ------------------------------------------------------------ scroll spy */

  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.docs-sidebar a[href^="#"]')
    );
    if (!links.length || !('IntersectionObserver' in window)) {
      return;
    }

    var byId = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) {
        byId[id] = link;
        sections.push(section);
      }
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          links.forEach(function (link) {
            link.classList.remove('active');
          });
          var active = byId[entry.target.id];
          if (active) {
            active.classList.add('active');
          }
        });
      },
      { rootMargin: '-84px 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------------ misc */

  function initYear() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    initTheme();
    initMenu();
    initCopyButtons();
    initScrollSpy();
    initYear();
  });
})();
