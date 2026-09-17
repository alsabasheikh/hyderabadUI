document.addEventListener("DOMContentLoaded", function() {
    // 1. Navigation Links Active State Logic
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Modal Selectors (Aapke HTML ke mutabiq id="contact" set hai)
    const contactModal = document.getElementById('contact');
    const closeModalBtn = document.getElementById('closeModal');
    const letsTalkBtns = document.querySelectorAll('.lets-talk-btn');

    // 3. "Let's Talk" buttons par click karne par modal kholne ke liye
    letsTalkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (contactModal) {
                contactModal.classList.add('active');
            }
        });
    });

    // 4. Close (X) button par click karne par modal band karne ke liye
    if (closeModalBtn && contactModal) {
        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });
    }

    // 5. Modal ke bahar dark background par click karne par modal band ho jaye
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
            }
        });
    }

    // 6. WEBSITE KHOLTE HI TURANT POPUP DIKHANE KE LIYE (Agar aap chahte hain)
    // Agar page load hote hi popup nahi chahiye, toh aap is line ko hata sakte hain.
    if (contactModal) {
        contactModal.classList.add('active');
    }

    // 7. Combined Scrollspy Logic (Sections + Footer / Contact Underline Fix)
    let hasOpenedOnScroll = false;
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0 && !hasOpenedOnScroll && contactModal) {
            contactModal.classList.add('active');
            hasOpenedOnScroll = true;
        }

        let currentSection = '';
        const scrollPos = window.scrollY + 180;
        const sections = document.querySelectorAll('section, footer');
        const navLinks = document.querySelectorAll('.nav-links a');

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