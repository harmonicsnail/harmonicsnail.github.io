/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    // Audio and visualizer setup
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    const canvas = document.getElementById('fft-canvas');
    const ctx = canvas.getContext('2d');
    
    // AudioContext initialization - moved outside functions to make it accessible globally
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    
    // Initialize track and analyzer as null
    let track = null;
    let analyser = null;
    let bassFilter, midFilter, trebleFilter;
    
    // Form handling
    const contactForm = document.getElementById('contact-form');
    
    // Typing effect
    const typingText = document.getElementById('typing-text');
    const originalText = typingText ? typingText.textContent : '';
    
    if (typingText) {
      typingText.textContent = '';
      let i = 0;
      const typeWriter = () => {
        if (i < originalText.length) {
          typingText.textContent += originalText.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      setTimeout(typeWriter, 1000);
    }
    
    // Intersection Observer for animations
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });
      
      document.querySelectorAll('.project-card, .experience-card, .education-card').forEach(card => {
        observer.observe(card);
      });
    };
    observeElements();
    
    // Resize function for canvases
    function resizeCanvas() {
      if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Call immediately to set initial size
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Setup Audio and Visualization
    const setupAudio = () => {
      // Create audio source if not already created
      if (!track) {
        track = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        
        // Create filters
        bassFilter = audioCtx.createBiquadFilter();
        bassFilter.type = 'lowshelf';
        bassFilter.frequency.value = 200;
        
        midFilter = audioCtx.createBiquadFilter();
        midFilter.type = 'peaking';
        midFilter.frequency.value = 1000;
        midFilter.Q.value = 1;
        
        trebleFilter = audioCtx.createBiquadFilter();
        trebleFilter.type = 'highshelf';
        trebleFilter.frequency.value = 3000;
        
        // Connect nodes
        track.connect(bassFilter);
        bassFilter.connect(midFilter);
        midFilter.connect(trebleFilter);
        trebleFilter.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        // FFT setup
        analyser.fftSize = 256;
        
        // Get filter control elements
        const bassControl = document.getElementById('bass-control');
        const midControl = document.getElementById('mid-control');
        const trebleControl = document.getElementById('treble-control');
        
        // Add event listeners to controls
        if (bassControl) {
          bassControl.addEventListener('input', () => {
            bassFilter.gain.value = (bassControl.value - 50) / 5;
          });
        }
        
        if (midControl) {
          midControl.addEventListener('input', () => {
            midFilter.gain.value = (midControl.value - 50) / 5;
          });
        }
        
        if (trebleControl) {
          trebleControl.addEventListener('input', () => {
            trebleFilter.gain.value = (trebleControl.value - 50) / 5;
          });
        }
        
        // Start visualization
        drawFFT();
      }
    };
    
    // Draw FFT visualization function
    function drawFFT() {
      if (!analyser) return;
      
      requestAnimationFrame(drawFFT);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      
      // Clear the canvas for new drawing
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = canvas.width / bufferLength;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 255 * canvas.height;
          
          // Create gradient
          const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
          gradient.addColorStop(0, 'var(--color-accent)');
          gradient.addColorStop(1, 'var(--color-accent-light)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, canvas.height - barHeight, barWidth * 0.9, barHeight);
          
          x += barWidth;
        }
      }
    }
    
    // Music toggle functionality
    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        // Resume audio context if suspended
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        
        // Setup audio processing chain if not already setup
        setupAudio();
        
        // Toggle playback
        if (audio.paused) {
          audio.play().catch(err => {
            console.error('Error playing audio:', err);
          });
          musicBtn.classList.add('playing');
        } else {
          audio.pause();
          musicBtn.classList.remove('playing');
        }
      });
    }
    
    // Contact form submission
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Simple validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
          alert('Please fill in all fields');
          return;
        }
        
        // Simulate form submission
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
          // Reset form
          contactForm.reset();
          
          // Notification
          alert('Message sent successfully! Thanks for reaching out.');
          
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      });
    }
    
    // Audio samples setup
    const audioSamples = document.querySelectorAll('.audio-sample audio');
    if (audioSamples.length > 0) {
      audioSamples.forEach(sample => {
        sample.addEventListener('play', () => {
          // Resume audio context if suspended
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
          
          // Create new analyzer for samples if needed
          if (!sample.sampleTrack) {
            sample.sampleTrack = audioCtx.createMediaElementSource(sample);
            sample.sampleAnalyser = audioCtx.createAnalyser();
            sample.sampleTrack.connect(sample.sampleAnalyser);
            sample.sampleAnalyser.connect(audioCtx.destination);
          }
          
          // Pause background music if it's playing
          if (!audio.paused) {
            audio.pause();
            musicBtn.classList.remove('playing');
          }
        });
      });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.project-link, .submit-btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = 'ripple';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const image = card.querySelector('.project-image img');
      
      card.addEventListener('mouseenter', () => {
        if (image) {
          image.style.transform = 'scale(1.05)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (image) {
          image.style.transform = 'scale(1)';
        }
      });
    });
});