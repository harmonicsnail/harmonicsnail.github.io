/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav    = document.querySelector('.site-nav');
    const musicBtn = document.getElementById('music-toggle');
    const audio   = document.getElementById('bg-music');
  
    // Mobile nav toggle
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  
    // Web Audio API setup for visualizer
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const track = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    track.connect(analyser).connect(audioCtx.destination);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
  
    // Music play/pause toggle
    musicBtn.addEventListener('click', () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      if (audio.paused) {
        audio.play();
        musicBtn.classList.add('playing');
      } else {
        audio.pause();
        musicBtn.classList.remove('playing');
      }
    });
  
    // Animation loop: scale circuit nodes based on audio amplitude
    function animate() {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((sum, v) => sum + v, 0) / dataArray.length;
      const scale = 1 + avg / 200; // subtle scaling
      document.documentElement.style.setProperty('--circuit-scale', scale);
      requestAnimationFrame(animate);
    }
    animate();
  });
  