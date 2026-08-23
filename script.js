gsap.registerPlugin(ScrollTrigger);

// Initialize Particles.js
if (window.particlesJS) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#7a35ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#7a35ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const hoverElements = document.querySelectorAll('a, button, .tag-pill, .skill-card, .info-card, .project-card, .timeline-item, .theme-toggle');

if (window.matchMedia("(pointer: fine)").matches && cursor) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            ease: "power2.out"
        });
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

// Theme Toggle Logic
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// Fade in Hero Elements (Except Name)
gsap.from('.center-hero .role-pill, .center-hero .hero-subtitle, .center-hero .hero-desc, .center-hero .contact-btn', {
    y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2
});

// Staggered Character Reveal for Hero Name
const heroName = document.querySelector('.hero-name');
if (heroName) {
    const text = heroName.textContent;
    heroName.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        heroName.appendChild(span);
    });
    
    gsap.from('.hero-name span', {
        y: 40,
        opacity: 0,
        rotationX: -90,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
        delay: 0.1
    });
}

gsap.from('.hero-image-col', {
    x: -50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '#about', start: 'top 80%' }
});
gsap.from('.info-card', {
    x: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '#about', start: 'top 80%' }
});

// Generic Scroll Fade-in for Cards and Timeline
gsap.utils.toArray('.skill-card, .soft-skills-card, .project-card, .timeline-item').forEach((item) => {
    gsap.fromTo(item,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Progress Bar Animation for Skills
gsap.utils.toArray('.skill-card').forEach((card) => {
    const bars = card.querySelectorAll('.progress-bar-fill');
    
    ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => {
            bars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                gsap.to(bar, { 
                    width: width, 
                    duration: 1.5, 
                    ease: 'power3.out',
                    delay: 0.2
                });
            });
        }
    });
});

// Active Navigation Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Timeline Line Draw Animation
gsap.to('.timeline', {
    '--line-height': '100%',
    ease: 'none',
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top center',
        end: 'bottom 80%',
        scrub: true
    }
});

// Magnetic Button Effect
const magneticElements = document.querySelectorAll('.contact-btn, .contact-submit-btn');
magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
        const position = el.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        gsap.to(el, { x: x * 0.3, y: y * 0.5, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
});

// 3D Glass Tilt Effect
if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".card, .info-card, .skill-card, .project-card, .contact-form-card, .contact-info-card"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.05,
    });
}

// Save Contact Form to TXT (Local Download)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload or PHP execution
        
        const name = this.name.value;
        const email = this.email.value;
        const message = this.message.value;
        
        // Format the text content
        const textContent = `Name: ${name}\nEmail: ${email}\nMessage:\n${message}\n\n-------------------------\n`;
        
        // Create a blob and trigger download
        const blob = new Blob([textContent], { type: "text/plain" });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `Contact_Message_From_${name.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Reset form and show alert
        this.reset();
        alert("Your message has been saved as a .txt file!");
    });
}
