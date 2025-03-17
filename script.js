document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menu-button');
  const closeMenu = document.getElementById('close-menu');
  const sidebar = document.getElementById('sidebar');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('theme-toggle');
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark');
  }
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  
  menuButton.addEventListener('click', function() {
    sidebar.classList.add('active');
  });
  
  closeMenu.addEventListener('click', function() {
    sidebar.classList.remove('active');
  });
  
  document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuButton = menuButton.contains(event.target);
    
    if (!isClickInsideSidebar && !isClickOnMenuButton && window.innerWidth < 1024) {
      sidebar.classList.remove('active');
    }
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 1024) {
        sidebar.classList.remove('active');
      }
    });
  });
  
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
