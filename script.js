// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL UNTUK ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.2)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// INTERSECTION OBSERVER UNTUK ANIMASI
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards dan project cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    observer.observe(card);
});

// ============================================
// CONTACT FORM HANDLER
// ============================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validasi form
        if (!name || !email || !message) {
            showNotification('Harap isi semua kolom!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Harap masukkan email yang valid!', 'error');
            return;
        }
        
        // Simulasi pengiriman pesan (ubah sesuai backend Anda)
        console.log('Pesan dikirim:', { name, email, message });
        
        // Tampilkan notifikasi sukses
        showNotification('Pesan berhasil dikirim! Terima kasih telah menghubungi kami.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 51, 102, 0.2)'};
        border: 1px solid ${type === 'success' ? '#00ff88' : '#ff3366'};
        color: ${type === 'success' ? '#00ff88' : '#ff3366'};
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Hapus notifikasi setelah 5 detik
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// ACTIVE NAV LINK INDICATOR
// ============================================

const navLinks2 = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks2.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// LAZY LOADING UNTUK GAMBAR
// ============================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// DYNAMIC COUNTER UNTUK STATISTIK
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Gunakan ketika elemen counter masuk viewport
const counterElements = document.querySelectorAll('[data-counter]');
if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.counter);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counterElements.forEach(element => counterObserver.observe(element));
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // ESC untuk menutup mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.id = 'backToTop';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #00d4ff 0%, #00f7ff 100%);
        color: #0a0e27;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createBackToTopButton();

// ============================================
// DARK/LIGHT MODE TOGGLE (OPTIONAL)
// ============================================

function initThemeToggle() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
}

initThemeToggle();

// ============================================
// ANIMASI CSS UNTUK NOTIFIKASI
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        color: #00d4ff;
    }
    
    .nav-menu a.active::after {
        width: 100%;
    }
    
    /* Hamburger active state */
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-8px, 8px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-7px, -7px);
    }
`;

document.head.appendChild(style);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function untuk scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// PARALLAX EFFECT (OPTIONAL)
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', debounce(() => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementPosition = element.offsetTop;
            const distance = scrollPosition - elementPosition;
            const speed = element.dataset.parallax || 0.5;
            
            element.style.transform = `translateY(${distance * speed}px)`;
        });
    }, 10));
}

initParallax();

// ============================================
// INIT - JALANKAN SAAT DOCUMENT READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Website loaded successfully!');
    console.log('✓ All interactive features are ready');
});

// Log untuk monitoring
console.log('🚀 Portfolio website initialized');
console.log('💡 Features: Smooth scroll, Mobile menu, Form validation, Notifications, Back to top');
