
/* =========================================
   SAURABH YADAV — PORTFOLIO JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Typing animation
    const typingElement = document.getElementById("typing-text");

    if (typingElement) {
        const phrases = [
            "Software Developer",
            "Web Developer",
            "UI/UX Designer",
            "Technology Enthusiast"
        ];

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            typingElement.textContent = phrases[0];
        } else {
            let phraseIndex = 0;
            let characterIndex = 0;
            let deleting = false;

            function typeText() {
                const currentPhrase = phrases[phraseIndex];

                if (!deleting) {
                    characterIndex++;

                    typingElement.textContent =
                        currentPhrase.substring(0, characterIndex);

                    if (characterIndex >= currentPhrase.length) {
                        deleting = true;
                        setTimeout(typeText, 1300);
                        return;
                    }

                    setTimeout(typeText, 75);
                } else {
                    characterIndex--;

                    typingElement.textContent =
                        currentPhrase.substring(0, characterIndex);

                    if (characterIndex <= 0) {
                        deleting = false;
                        phraseIndex = (phraseIndex + 1) % phrases.length;
                        setTimeout(typeText, 350);
                        return;
                    }

                    setTimeout(typeText, 35);
                }
            }

            typeText();
        }
    }

    // Mobile navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        function closeMenu() {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) {
                closeMenu();
            }
        });
    }

    // Highlight the navigation link for the visible section
    const sections = document.querySelectorAll("main section[id]");
    const navigationLinks = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

    if ("IntersectionObserver" in window && sections.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.id;

                        navigationLinks.forEach((link) => {
                            const isActive =
                                link.getAttribute("href") === `#${currentId}`;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => observer.observe(section));
    }

    // Automatic footer year
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
