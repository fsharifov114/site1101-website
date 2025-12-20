
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navLinks = document.querySelector(".nav-links")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")

    
    const spans = mobileMenuToggle.querySelectorAll("span")
    spans.forEach((span, index) => {
      if (navLinks.classList.contains("active")) {
        if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
        if (index === 1) span.style.opacity = "0"
        if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        span.style.transform = "none"
        span.style.opacity = "1"
      }
    })
  })
}


document.addEventListener("click", (e) => {
  if (navLinks && navLinks.classList.contains("active")) {
    if (!e.target.closest(".navbar")) {
      navLinks.classList.remove("active")
      const spans = mobileMenuToggle.querySelectorAll("span")
      spans.forEach((span) => {
        span.style.transform = "none"
        span.style.opacity = "1"
      })
    }
  }
})


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})


const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)


document.querySelectorAll(".stat-card, .project-card, .info-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Lightbox for Project 1 image (only runs on Projects page where #project1-link exists)
;(function () {
  const link = document.getElementById('project1-link')
  const lightbox = document.getElementById('lightbox')
  const lbImg = document.getElementById('lightbox-img')
  const lbClose = document.getElementById('lightbox-close')

  if (!link || !lightbox || !lbImg || !lbClose) return

  link.addEventListener('click', function (e) {
    e.preventDefault()
    const src = link.href || (link.querySelector('img') && link.querySelector('img').src)
    if (!src) return
    lbImg.src = src
    lightbox.classList.add('open')
    lightbox.setAttribute('aria-hidden', 'false')
  })

  lbClose.addEventListener('click', function () {
    lightbox.classList.remove('open')
    lightbox.setAttribute('aria-hidden', 'true')
    lbImg.src = ''
  })

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('open')
      lightbox.setAttribute('aria-hidden', 'true')
      lbImg.src = ''
    }
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      lightbox.classList.remove('open')
      lightbox.setAttribute('aria-hidden', 'true')
      lbImg.src = ''
    }
  })
})()

