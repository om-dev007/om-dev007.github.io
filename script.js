const scrollTopBtn = document.getElementById("scrollTopBtn");
const navbar = document.getElementById("mainNav");

window.onscroll = function () {
    if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
    ) {
        scrollTopBtn.style.display = "flex";
        navbar.classList.add("scrolled");
    } else {
        scrollTopBtn.style.display = "none";
        navbar.classList.remove("scrolled");
    }
};

scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
            });

            // Close the mobile menu after clicking a link
            const navbarToggler = document.querySelector(".navbar-toggler");
            const navbarCollapse = document.querySelector(".navbar-collapse");
            if (window.getComputedStyle(navbarToggler).display !== "none") {
                navbarCollapse.classList.remove("show");
            }
        }
    });
});
