document.addEventListener("DOMContentLoaded", () => {
    const customCursor = document.querySelector(".custom-cursor")
    const menuButton = document.querySelector(".menu-button")
    const mobileMenu = document.querySelector(".mobile-menu")
    const navButtons = document.querySelectorAll(".nav-button, .mobile-nav-button")
    const sections = document.querySelectorAll("section[id]")
    const socialIcons = document.querySelectorAll(".floating-social-sidebar .social-icon")
    const typingParagraphs = document.querySelectorAll(".about-paragraph.typing-text")
    const floatingParticlesContainer = document.querySelector(".floating-particles")
  
    // Custom Cursor Movement
    document.addEventListener("mousemove", (e) => {
      if (customCursor) {
        customCursor.style.left = e.clientX + "px"
        customCursor.style.top = e.clientY + "px"
      }
    })
  
    // Mobile Menu Toggle
    if (menuButton && mobileMenu) {
      menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("open")
        if (mobileMenu.classList.contains("open")) {
          menuButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
        } else {
          menuButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>'
        }
      })
    }
  
    // Smooth Scrolling for Navigation Links
    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      if (mobileMenu && mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open")
        menuButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>'
      }
    }
  
    navButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        const sectionId = this.dataset.section
        scrollToSection(sectionId)
      })
    })
  
    // Typing Animation for About Section
    const typeText = (element, text, delay = 0, speed = 30) => {
      let charIndex = 0
      element.textContent = ""
      const cursorSpan = document.createElement("span")
      cursorSpan.className = "typing-cursor"
      element.appendChild(cursorSpan)
  
      setTimeout(() => {
        const typeInterval = setInterval(() => {
          if (charIndex < text.length) {
            element.textContent = text.slice(0, charIndex + 1)
            element.appendChild(cursorSpan)
            charIndex++
          } else {
            clearInterval(typeInterval)
            cursorSpan.remove()
          }
        }, speed)
      }, delay)
    }
  
    // Intersection Observer for Active Navigation and Typing Animation
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentSectionId = entry.target.id
  
          // Update active nav link
          navButtons.forEach((button) => {
            button.classList.remove("active")
            if (button.dataset.section === currentSectionId) {
              button.classList.add("active")
            }
          })
  
          // Trigger typing animation for about section
          if (currentSectionId === "about" && !entry.target.dataset.typed) {
            entry.target.dataset.typed = "true"
            typingParagraphs.forEach((p, index) => {
              const text = p.dataset.text
              const delay = index * 3000
              typeText(p, text, delay)
            })
          }
        }
      })
    }, observerOptions)
  
    sections.forEach((section) => {
      observer.observe(section)
    })
  
    // Floating Social Sidebar Scroll Animation
    const animateSocialIconsOnScroll = () => {
      const scrollY = window.scrollY
      socialIcons.forEach((icon, index) => {
        const yOffset = Math.sin(scrollY * 0.01 + index * 0.5) * 10
        icon.style.transform = `translateY(${yOffset}px)`
  
        let tooltip = icon.querySelector(".tooltip")
        if (!tooltip) {
          tooltip = document.createElement("span")
          tooltip.className = "tooltip"
          tooltip.textContent = icon.dataset.tooltip
          icon.appendChild(tooltip)
        }
      })
    }
  
    window.addEventListener("scroll", animateSocialIconsOnScroll)
    animateSocialIconsOnScroll()
  
    // Floating Particles Generation
    const numParticles = 50
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 5}s`
      particle.style.setProperty("--x-offset", `${Math.random() * 100 - 50}px`)
      particle.style.setProperty("--y-offset", `${Math.random() * 100 - 50}px`)
      floatingParticlesContainer.appendChild(particle)
    }
  })
  