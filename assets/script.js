/* ==========================================================================
   J&R Garage Door Services, LLC — site scripts
   - Mobile navigation
   - LeadrVision form submission (fetch with graceful native-form fallback)
   - "?submitted=1" confirmation for no-JavaScript submissions
   ========================================================================== */
(function () {
  'use strict';

  /* --------------------------- mobile navigation -------------------------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 780) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------ footer year ----------------------------- */
  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* --------------------------- form confirmation -------------------------- */
  function showSuccess(form) {
    var banner = document.getElementById('form-success');
    if (banner) {
      banner.hidden = false;
      try {
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (err) {
        banner.scrollIntoView();
      }
    }
    var status = form.querySelector('.form-status');
    if (status) {
      status.textContent = 'Thanks, your message was sent.';
      status.classList.remove('is-error');
    }
    form.reset();
    var pageField = form.querySelector('input[name="_page"]');
    if (pageField) pageField.value = window.location.href;
  }

  /* ------------------------------ form submit ----------------------------- */
  function initForms() {
    var forms = document.querySelectorAll('form[data-leadrvision]');
    if (!forms.length) return;

    Array.prototype.forEach.call(forms, function (form) {
      /* Keep _page current on every form (used by JSON / fetch submissions). */
      var pageField = form.querySelector('input[name="_page"]');
      if (pageField) pageField.value = window.location.href;

      form.addEventListener('submit', function (event) {
        /* Honeypot: silently stop bots that fill the hidden field. */
        var gotcha = form.querySelector('input[name="_gotcha"]');
        if (gotcha && gotcha.value.trim() !== '') {
          event.preventDefault();
          return;
        }

        /* Without fetch, let the browser perform a normal POST. */
        if (typeof window.fetch !== 'function' || typeof FormData !== 'function') {
          return;
        }

        event.preventDefault();

        var submitBtn = form.querySelector('[type="submit"]');
        var status = form.querySelector('.form-status');
        var originalLabel = submitBtn ? submitBtn.textContent : '';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending\u2026';
        }
        if (status) {
          status.textContent = '';
          status.classList.remove('is-error');
        }

        var data = new FormData(form);
        var params = new URLSearchParams();
        data.forEach(function (value, key) {
          params.append(key, value);
        });
        /* Ensure _page travels with fetch bodies too (belt and braces). */
        if (!params.has('_page')) {
          params.append('_page', window.location.href);
        }

        fetch(form.action, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: params.toString()
        })
          .then(function (response) {
            return response.json()
              .then(function (json) { return { ok: response.ok, json: json }; })
              .catch(function () { return { ok: response.ok, json: null }; });
          })
          .then(function (result) {
            var json = result.json;
            var succeeded = result.ok && (!json || json.ok === true || json.ok === 'true');
            if (succeeded) {
              showSuccess(form);
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalLabel;
              }
            } else {
              /* Server responded but did not confirm: fall back to native POST. */
              form.submit();
            }
          })
          .catch(function () {
            /* Network or CORS failure: fall back to native POST so the lead
               is still delivered by the plain-HTML path. */
            form.submit();
          });
      });
    });
  }

  /* --------------------- "?submitted=1" confirmation ---------------------- */
  function initSubmittedFlag() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('submitted') !== '1') return;

    var banner = document.getElementById('form-success');
    if (banner) {
      banner.hidden = false;
      try {
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (err) {
        banner.scrollIntoView();
      }
    }
    var status = document.querySelector('#contact-form .form-status');
    if (status) {
      status.textContent = 'Thanks, your message was sent.';
      status.classList.remove('is-error');
    }
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    initNav();
    initYear();
    initForms();
    initSubmittedFlag();
  });
})();
