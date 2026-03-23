/* ==========================================================
   BERYL YEH - PORTFOLIO SCRIPTS
   Handles: nav scroll, mobile menu, reveal animations,
            active link highlighting, stat counters
   ========================================================== */

/* ----------------------------------------------------------
   NAV SCROLL SHADOW
   ---------------------------------------------------------- */
var header = document.getElementById('site-header');

window.addEventListener('scroll', function () {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* ----------------------------------------------------------
   MOBILE BURGER MENU
   ---------------------------------------------------------- */
var burger     = document.getElementById('burger');
var mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', function () {
  var isOpen = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

mobileMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

/* ----------------------------------------------------------
   SCROLL REVEAL
   ---------------------------------------------------------- */
var revealEls = document.querySelectorAll('.reveal');

var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(function (el) {
  revealObserver.observe(el);
});

/* ----------------------------------------------------------
   ACTIVE NAV LINK HIGHLIGHT
   ---------------------------------------------------------- */
var sections = document.querySelectorAll('section[id]');
var navLinks  = document.querySelectorAll('.primary-nav a');

var sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var id = entry.target.getAttribute('id');
      navLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'var(--teal)';
        } else {
          link.style.color = '';
        }
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

/* ----------------------------------------------------------
   STAT COUNTER ANIMATION
   ---------------------------------------------------------- */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCounter(el) {
  var target   = parseFloat(el.getAttribute('data-target'));
  var isFloat  = el.getAttribute('data-float') === 'true';
  var suffix   = el.getAttribute('data-suffix') || '';
  var duration = 1200;
  var startTime = null;

  function tick(timestamp) {
    if (!startTime) startTime = timestamp;
    var elapsed  = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var eased    = easeOutCubic(progress);
    var value    = isFloat
      ? (eased * target).toFixed(1)
      : Math.round(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

var statsEl = document.querySelector('.hero-stats');

if (statsEl) {
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.sc-num').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  statsObserver.observe(statsEl);
}
