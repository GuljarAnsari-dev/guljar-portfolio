/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

}

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav?.classList.remove("open");

    });

});


/* =====================================================
   CURSOR GLOW
===================================================== */

const cursor = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", event => {

    if (!cursor) return;

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   COUNTERS
===================================================== */

const counters =
    document.querySelectorAll("[data-count]");

const counterObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const element = entry.target;

            const target =
                Number(element.dataset.count);

            let current = 0;

            const step =
                Math.max(1, Math.ceil(target / 40));

            const timer =
                setInterval(() => {

                    current += step;

                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }

                    element.textContent = current;

                }, 30);

            counterObserver.unobserve(element);

        });

    }, {
        threshold: 0.8
    });


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =====================================================
   SKILLS TABS
===================================================== */

const skillTabs =
    document.querySelectorAll(".skill-tab");

const skillPanels =
    document.querySelectorAll(".skill-panel");


skillTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target =
            tab.dataset.target;


        /* Remove active from tabs */

        skillTabs.forEach(item => {

            item.classList.remove("active");

        });


        /* Hide all panels */

        skillPanels.forEach(panel => {

            panel.classList.remove("active");

        });


        /* Activate clicked tab */

        tab.classList.add("active");


        /* Show selected panel */

        const selectedPanel =
            document.querySelector(
                `.skill-panel[data-panel="${target}"]`
            );


        if (selectedPanel) {

            selectedPanel.classList.add("active");

        }

    });

});


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

    if (themeToggle) {
        themeToggle.textContent = "☀";
    }

}


themeToggle?.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    themeToggle.textContent =
        isLight ? "☀" : "☾";

});


/* =====================================================
   CURRENT YEAR
===================================================== */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


contactForm?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        if (formStatus) {

            formStatus.textContent =
                "Sending...";

        }


        const formData =
            Object.fromEntries(
                new FormData(contactForm).entries()
            );


        try {

            const response =
                await fetch("/api/contact", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(formData)

                });


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to send message"
                );

            }


            if (formStatus) {

                formStatus.textContent =
                    result.message ||
                    "Message sent successfully!";

            }


            contactForm.reset();


        } catch (error) {

            console.error(error);

            if (formStatus) {

                formStatus.textContent =
                    "Message could not be sent. Please try again.";

            }

        }

    }
);


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav > a"
    );


const activeObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;


            navLinks.forEach(link => {

                link.classList.toggle(

                    "active",

                    link.getAttribute("href") ===
                    "#" + entry.target.id

                );

            });

        });

    }, {

        rootMargin:
            "-35% 0px -55% 0px",

        threshold: 0

    });


sections.forEach(section => {

    activeObserver.observe(section);

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});