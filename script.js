/* script.js */
document.addEventListener('DOMContentLoaded',()=>{
    const musicBtn=document.getElementById('music-toggle');
    const audio=document.getElementById('bg-music');
    const canvas=document.getElementById('fft-canvas');
    const ctx=canvas.getContext('2d');
  
    // Resize canvas
    function resizeCanvas(){
      canvas.width=canvas.clientWidth;
      canvas.height=canvas.clientHeight;
    }
    window.addEventListener('resize',resizeCanvas);
    resizeCanvas();
  
    // audio & visualizer setup
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    const audioCtx=new AudioContext();
    const track=audioCtx.createMediaElementSource(audio);
    const analyser=audioCtx.createAnalyser();
    analyser.fftSize=256;
    track.connect(analyser).connect(audioCtx.destination);
    const bufferLength=analyser.frequencyBinCount;
    const dataArray=new Uint8Array(bufferLength);
  
    // music toggle
    musicBtn.addEventListener('click',()=>{
      if(audioCtx.state==='suspended') audioCtx.resume();
      if(audio.paused){ audio.play(); musicBtn.classList.add('playing'); }
      else { audio.pause(); musicBtn.classList.remove('playing'); }
    });
  
    // draw FFT
    function drawFFT(){
      requestAnimationFrame(drawFFT);
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const barWidth=canvas.width/bufferLength;
      for(let i=0;i<bufferLength;i++){
        const barHeight=dataArray[i]/255*canvas.height;
        ctx.fillStyle='var(--color-accent-dark)';
        ctx.fillRect(i*barWidth,canvas.height-barHeight,barWidth*0.8,barHeight);
      }
    }
    drawFFT();
  });