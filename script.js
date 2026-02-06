document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HERO COLOR PICKER (Real Images) ---
    const colorBtns = document.querySelectorAll('.color-option');
    const heroImg = document.getElementById('main-product-img');

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Highlight selected button
            colorBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Get the image file from data-img attribute
            const newImg = btn.getAttribute('data-img');
            
            // Fade out
            heroImg.style.opacity = '0';
            
            // Wait, Swap, Fade In
            setTimeout(() => {
                heroImg.src = newImg;
                heroImg.style.opacity = '1';
            }, 300);
        });
    });


    // --- 2. SCROLL PROGRESS & NAVBAR ---
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
        if (scrollTop > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });


    // --- 3. HERO PARALLAX ---
    const heroBg = document.getElementById('parallax-bg');
    window.addEventListener('scroll', () => {
        const offset = window.scrollY;
        if (heroBg) heroBg.style.transform = `scale(1.1) translateY(${offset * 0.5}px)`;
    });


    // --- 4. GENERAL REVEAL ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));


    // --- 5. STICKY SCROLL IMAGE SWITCHER ---
    const stickyImg = document.getElementById('sticky-img');
    const scrollSteps = document.querySelectorAll('.scroll-step');

    const stepObserverOptions = {
        root: null,
        threshold: 0.6,
        rootMargin: "0px"
    };

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const newImgSrc = entry.target.getAttribute('data-img');
                
                if (!stickyImg.src.includes(newImgSrc)) {
                    stickyImg.classList.add('changing');
                    setTimeout(() => {
                        stickyImg.src = newImgSrc;
                        stickyImg.classList.remove('changing');
                    }, 300);
                }
            }
        });
    }, stepObserverOptions);

    scrollSteps.forEach(step => stepObserver.observe(step));


    // --- 6. RIPPLE BUTTON EFFECT ---
    const rippleBtns = document.querySelectorAll('.ripple-btn');
    rippleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // --- 7. MOBILE MENU ---
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.right = '0';
            navLinks.style.background = '#0a0a0a';
            navLinks.style.width = '100%';
            navLinks.style.padding = '20px';
        });
    }
});