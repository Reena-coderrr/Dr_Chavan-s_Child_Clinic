// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = mobileNavToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileNav && mobileNav.classList.contains('active') && 
            !mobileNav.contains(event.target) && 
            !mobileNavToggle.contains(event.target)) {
            mobileNav.classList.remove('active');
            
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add fade-in animation to elements when they come into view
    const fadeElements = document.querySelectorAll('.service-card, .testimonial-card, .about-image, .about-content');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Check if element is in viewport
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run once on page load
    fadeInOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', fadeInOnScroll);
});

// Improve mobile responsiveness
document.addEventListener("DOMContentLoaded", () => {
    // Fix viewport issues on mobile
    function adjustViewport() {
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      if (!viewportMeta) {
        const meta = document.createElement("meta")
        meta.name = "viewport"
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        document.getElementsByTagName("head")[0].appendChild(meta)
      } else {
        viewportMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      }
    }
  
    // Call the function
    adjustViewport()
  
    // Handle orientation changes
    window.addEventListener("orientationchange", () => {
      // Small timeout to let the orientation change complete
      setTimeout(() => {
        adjustViewport()
      }, 100)
    })
  
    // Fix for iOS Safari 100vh issue
    function fixIOSHeight() {
      // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }
  
    // Call the function on initial load
    fixIOSHeight()
  
    // Call the function on resize and orientation change
    window.addEventListener("resize", fixIOSHeight)
    window.addEventListener("orientationchange", fixIOSHeight)
  })
  