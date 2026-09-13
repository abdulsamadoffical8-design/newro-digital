document.addEventListener('DOMContentLoaded', () => {

  /* ── EmailJS ── */
  if (typeof emailjs !== 'undefined') {
    emailjs.init('zb5fmeysOHaBH8bZS');
  }

  /* ── Navbar ── */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNav = () => {
    const scrollY = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = navMenu.querySelector(`a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ── Scroll animations ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));

  /* ── Counter animation ── */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        const duration = 2000;
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  /* ── Card mouse tracking for shine effect ── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  /* ── Contact form ── */
  var form = document.getElementById('contactForm');
  var sendBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var service = document.getElementById('service').value;
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !service || !message) {
        alert('Please fill all fields.');
        return;
      }

      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.querySelector('span').textContent = 'Sending...';
      }

      var params = {
        from_name: name,
        from_email: email,
        service: service,
        message: message,
      };

      emailjs.send('service_j5ebj3m', 'waomvf8', params)
        .then(function(response) {
          console.log('SUCCESS', response.status, response.text);
          form.innerHTML = '<div class="form-success"><h3>Message Sent!</h3><p>Thanks ' + name + '. We will reach out within 24 hours.</p></div>';
        })
        .catch(function(err) {
          console.error('FAILED', err);
          alert('Error: ' + JSON.stringify(err));
          if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.querySelector('span').textContent = 'Send Message';
          }
        });
    });
  }

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── Parallax on hero glow ── */
  const heroGlow = document.querySelector('.hero-glow');
  if (heroGlow) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }, { passive: true });
  }

});
