// Navigation active link toggle
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Let's Talk Modal Logic ---
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

    // 4. WEBSITE KHOLTE HI (Page Load par) TURANT POPUP DIKHANE KE LIYE
    if (contactModal) {
        contactModal.classList.add('active');
    }

    // 5. SCROLLSPY: Scroll karte waqt active section ke hisab se navbar links par underline/active aane ke liye
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPos = window.scrollY + 180; // Offset taaki sahi section aane par navbar update ho jaye

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Agar link ka href section ki id se match karta hai toh use active/underline kar do
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});