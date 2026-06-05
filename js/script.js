/* =============================================
   CA Portal - JavaScript Functionality
   Stage 2: Functionality
   ============================================= */

/* ---- 1. MOBILE HAMBURGER MENU TOGGLE ---- */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('open');
}

/* ---- 2. DARK MODE TOGGLE ---- */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('darkModeBtn');
    if (document.body.classList.contains('dark-mode')) {
        btn.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        btn.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

/* ---- 3. CONTACT FORM VALIDATION ---- */
function validateForm(e) {
    e.preventDefault();

    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const feedback = document.getElementById('formFeedback');

    // Reset
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    // Validation checks
    if (!name) {
        showFeedback(feedback, '❌ Please enter your name.', 'error');
        return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback(feedback, '❌ Please enter a valid email address.', 'error');
        return;
    }
    if (message.length < 10) {
        showFeedback(feedback, '❌ Message must be at least 10 characters.', 'error');
        return;
    }

    showFeedback(feedback, '✅ Message sent successfully! We will get back to you soon.', 'success');
    e.target.reset();
}

function showFeedback(el, msg, type) {
    el.textContent = msg;
    el.classList.add(type);
}

/* ---- 4. SCROLL-TO-TOP BUTTON ---- */
window.addEventListener('scroll', function () {
    const btn = document.getElementById('scrollTopBtn');
    if (btn) {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- 5. ANIMATED COUNTERS (About page) ---- */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = current + (counter.getAttribute('data-suffix') || '');
        }, 30);
    });
}

/* ---- 6. GALLERY LIGHTBOX ---- */
function openLightbox(src, alt) {
    const overlay = document.getElementById('lightboxOverlay');
    const img = document.getElementById('lightboxImg');
    if (overlay && img) {
        img.src = src;
        img.alt = alt || '';
        overlay.classList.add('active');
    }
}

function closeLightbox() {
    const overlay = document.getElementById('lightboxOverlay');
    if (overlay) overlay.classList.remove('active');
}

/* ---- 7. EVENT REGISTRATION MODAL ---- */
function registerEvent(eventName) {
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalEventName');
    if (modal && modalTitle) {
        modalTitle.textContent = eventName;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) modal.classList.remove('active');
}

function submitRegistration(e) {
    e.preventDefault();
    const name  = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const status = document.getElementById('regStatus');

    if (!name || !email) {
        status.textContent = '❌ Please fill in all fields.';
        status.style.color = '#ef4444';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = '❌ Invalid email address.';
        status.style.color = '#ef4444';
        return;
    }

    status.textContent = `✅ ${name}, you are registered!`;
    status.style.color = '#22c55e';
    e.target.reset();
    setTimeout(closeModal, 2000);
}

/* ---- 8. SEARCH / FILTER EVENTS ---- */
function filterEvents() {
    const query = document.getElementById('eventSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}

/* ---- 9. FADE-IN ON SCROLL (Intersection Observer) ---- */
function initFadeIn() {
    const items = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    items.forEach(item => observer.observe(item));
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', function () {

    // Restore dark mode preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('darkModeBtn');
        if (btn) btn.textContent = '☀️ Light Mode';
    }

    // Contact form
    const form = document.getElementById('contactForm');
    if (form) form.addEventListener('submit', validateForm);

    // Event registration form
    const regForm = document.getElementById('regForm');
    if (regForm) regForm.addEventListener('submit', submitRegistration);

    // Close modal / lightbox on overlay click
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', function (e) {
            if (e.target === lightboxOverlay) closeLightbox();
        });
    }

    const eventModal = document.getElementById('eventModal');
    if (eventModal) {
        eventModal.addEventListener('click', function (e) {
            if (e.target === eventModal) closeModal();
        });
    }

    // Counters on About page
    if (document.querySelector('.counter')) animateCounters();

    // Fade-in scroll effect
    initFadeIn();
});
