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

// Add this to your existing JavaScript
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to clicked link
    this.classList.add('active');
    
    // For mobile menu - close after clicking
    if (window.innerWidth < 768) {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// Highlight current section in navbar on scroll
// Current scroll detection code (replace this entire block)
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollPosition = window.scrollY + window.innerHeight / 3; // Better calculation
  
  // Reset all links first
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Special case for frontpage (when at very top)
  if (window.scrollY < 50) {
    document.querySelector('.nav-link[href="#frontpage"]').classList.add('active');
    return;
  }
  
  // Check each section
  let currentSectionId = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSectionId = sectionId;
    }
  });
  
  // Highlight corresponding nav link
  if (currentSectionId) {
    document.querySelector(`.nav-link[href="#${currentSectionId}"]`).classList.add('active');
  }
  
  // Special case for contact section (when scrolled to bottom)
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('.nav-link[href="#contact"]').classList.add('active');
  }
});