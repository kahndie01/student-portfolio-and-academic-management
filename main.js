// main.js — shared behaviour across every page: mobile nav + active link + reveal-on-load

document.addEventListener('DOMContentLoaded', function () {
  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the menu automatically once a link is chosen (mobile)
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight the current page in the nav using DOM data, not hardcoding per file
  var currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var linkFile = link.getAttribute('href');
    if (linkFile === currentFile || (currentFile === '' && linkFile === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Gentle reveal-on-load for elements marked .reveal-on-scroll
  var revealTargets = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });
  }

  // Footer year, kept dynamic with plain JS
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
});
