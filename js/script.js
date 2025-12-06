// Hamburger Menu with Animation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu on link click
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 0);
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".section-header, .service-card, .about-image, .about-content"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Testimonial Carousel
const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let interval;

function showTestimonial(index) {
  testimonials.forEach((test) => test.classList.remove("active"));
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
    dot.setAttribute("aria-selected", i === index);
    dot.tabIndex = i === index ? 0 : -1;
  });
  testimonials[index].classList.add("active");
  currentIndex = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showTestimonial(index);
    resetInterval();
  });
  dot.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      showTestimonial(index);
      resetInterval();
    }
  });
});

function nextTestimonial() {
  let next = (currentIndex + 1) % testimonials.length;
  showTestimonial(next);
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextTestimonial, 5000);
}

resetInterval();

// Active Navigation Link Highlighting
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function highlightNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navAnchors.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavLink);