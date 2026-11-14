/**
 * Design Market - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Design Detail Page - Thumbnail Gallery
  const thumbnailButtons = document.querySelectorAll('.thumbnail-button');
  const mainImage = document.querySelector('.main-image');
  
  if (thumbnailButtons.length && mainImage) {
    thumbnailButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active thumbnail
        thumbnailButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Update main image
        const thumbnailSrc = this.querySelector('img').src;
        const fullSizeSrc = thumbnailSrc.replace('w=120', 'w=1200');
        mainImage.src = fullSizeSrc;
      });
    });
  }

  // Admin Dashboard - Tab Switching
  const adminNavLinks = document.querySelectorAll('.admin-nav-link');
  const adminTabs = document.querySelectorAll('.admin-tab');
  
  if (adminNavLinks.length && adminTabs.length) {
    adminNavLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get target tab ID from href
        const targetId = this.getAttribute('href');
        const targetTab = document.querySelector(targetId);
        
        if (!targetTab) return;
        
        // Update active states
        adminNavLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
        
        adminTabs.forEach(tab => tab.classList.remove('active'));
        targetTab.classList.add('active');
      });
    });
  }

  // Messages Page - Mobile View Switcher
  const contactItems = document.querySelectorAll('.contact-item');
  const chatArea = document.querySelector('.chat-area');
  const contactsSidebar = document.querySelector('.contacts-sidebar');
  const backToContactsButton = document.querySelector('.back-to-contacts');
  
  if (contactItems.length && chatArea && contactsSidebar && backToContactsButton) {
    // Function to check if we're on mobile
    const isMobile = () => window.innerWidth < 640;
    
    contactItems.forEach(item => {
      item.addEventListener('click', function() {
        // Set active contact
        contactItems.forEach(contact => contact.classList.remove('active'));
        this.classList.add('active');
        
        // On mobile, show chat and hide contacts
        if (isMobile()) {
          contactsSidebar.style.display = 'none';
          chatArea.style.display = 'flex';
          if (document.querySelector('.mobile-message-header')) {
            document.querySelector('.mobile-message-header').style.display = 'block';
          }
        }
      });
    });
    
    backToContactsButton.addEventListener('click', function() {
      if (isMobile()) {
        contactsSidebar.style.display = 'flex';
        chatArea.style.display = 'none';
      }
    });
    
    // Reset layout on window resize
    window.addEventListener('resize', function() {
      if (!isMobile()) {
        contactsSidebar.style.display = 'flex';
        chatArea.style.display = 'flex';
      } else if (chatArea.style.display === 'flex') {
        contactsSidebar.style.display = 'none';
      }
    });
  }

  // Form Validation
  const forms = document.querySelectorAll('form');
  
  if (forms.length) {
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        // Prevent actual form submission in demo
        e.preventDefault();
        
        // Add your form validation and submission logic here
        console.log('Form submitted (demo only)');
        
        // For login/signup forms, you could redirect to simulate successful login
        if (form.closest('.auth-form')) {
          window.location.href = 'index.html';
        }
      });
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  if (anchorLinks.length) {
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  
  // Add animations to elements as they enter the viewport
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.design-card, .category-card, .testimonial-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect();
      
      // Check if element is in viewport
      if (elementPosition.top < window.innerHeight && elementPosition.bottom > 0) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animation
  document.querySelectorAll('.design-card, .category-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
  });
  
  // Run once on page load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});