/* ============================================================
   1. ГЕНЕРАЦИЯ ФОНОВЫХ ЧАСТИЦ
============================================================ */
const particlesContainer = document.getElementById('particles');

function createParticles() {
    const count = window.innerWidth < 768 ? 20 : 45;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 5 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 15 + 10) + 's';
        p.style.animationDelay = (Math.random() * 15) + 's';
        p.style.opacity = Math.random() * 0.4 + 0.1;
        particlesContainer.appendChild(p);
    }
}
createParticles();

/* ============================================================
   2. ЭФФЕКТ ПЕЧАТАЮЩЕГОСЯ ТЕКСТА
============================================================ */
const nameText = "Куренная Полина";
const typedElement = document.getElementById('typedName');
let charIndex = 0;

function typeWriter() {
    if (charIndex < nameText.length) {
        typedElement.textContent += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else {
        typedElement.style.borderRight = '4px solid #b57bff';
        typedElement.style.paddingRight = '8px';
        setInterval(() => {
            typedElement.style.borderRightColor =
                typedElement.style.borderRightColor === 'transparent'
                    ? '#b57bff' : 'transparent';
        }, 500);
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 600);
});

/* ============================================================
   3. SCROLL-АНИМАЦИИ
============================================================ */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 150);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .counter-item, .cta h2, .about-card').forEach(el => {
    observer.observe(el);
});

/* ============================================================
   4. АНИМИРОВАННЫЕ СЧЁТЧИКИ
============================================================ */
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.target;
            let current = 0;
            const increment = target / 60;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target;
                }
            };
            updateCounter();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-value').forEach(el => {
    counterObserver.observe(el);
});

/* ============================================================
   5. ПРОГРЕСС-БАР И КНОПКА ВВЕРХ
============================================================ */
const progressBar = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    if (scrollTop > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   6. ПАРАЛЛАКС-ЭФФЕКТ ДЛЯ ФОТО
============================================================ */
const heroImage = document.querySelector('.hero-image');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (heroImage) {
        heroImage.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }
});

document.addEventListener('mouseleave', () => {
    if (heroImage) heroImage.style.transform = 'translate(0, 0)';
});

/* ============================================================
   7. RIPPLE-ЭФФЕКТ НА КНОПКАХ
============================================================ */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.4)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleAnim 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

/* ============================================================
   8. ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ ЗАГРУЗКЕ
============================================================ */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

/* ============================================================
   9. ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ В ШАПКЕ
============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

/* ============================================================
   10. БУРГЕР-МЕНЮ ДЛЯ МОБИЛЬНЫХ
============================================================ */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
    burger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        burger.classList.toggle('active', isOpen);
        burger.setAttribute('aria-expanded', isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
        }
    });
}