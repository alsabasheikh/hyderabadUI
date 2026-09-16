document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Let's Talk Modal & Scroll Logic ---
    const letsTalkBtns = document.querySelectorAll('.lets-talk-btn');
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = document.getElementById('closeModal');

    // 1. "Let's Talk" buttons par click karne par modal kholne ke liye
    letsTalkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (contactModal) {
                contactModal.classList.add('active');
            }
        });
    });

    // 2. Close (X) button par click karne par modal band karne ke liye
    if (closeModalBtn && contactModal) {
        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });
    }

    // 3. Modal ke bahar dark background par click karne par bhi modal band ho jaye
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
            }
        });
    }

    // 4. WEBSITE KHOLTE HI TURANT POPUP DIKHANE KE LIYE
    if (contactModal) {
        contactModal.classList.add('active');
    }

    // 5. COMBINED SCROLLSPY LOGIC (Sections + Footer / Contact Underline Fix)
    let hasOpenedOnScroll = false;
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0 && !hasOpenedOnScroll && contactModal) {
            contactModal.classList.add('active');
            hasOpenedOnScroll = true;
        }

        let currentSection = '';
        const scrollPos = window.scrollY + 180;
        const sections = document.querySelectorAll('section, footer'); // Footer/Contact bhi included hai
        const navLinks = document.querySelectorAll('.nav-links a');

        // Agar user scroll karke bilkul niche (footer/contact) par pahunch gaya hai
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            currentSection = 'contact';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});