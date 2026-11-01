(() => {
  const intro=document.querySelector('.intro');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers=[];
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];};
  const finish=()=>{clearTimers();if(intro){intro.classList.add('is-finished');intro.inert=true;}document.body.classList.add('is-ready');};
  function play(){clearTimers();intro.inert=false;document.body.classList.remove('is-ready');intro.classList.remove('is-finished','is-playing','is-darkening');void intro.offsetWidth;intro.classList.add('is-playing');timers.push(setTimeout(()=>intro.classList.add('is-darkening'),7900));timers.push(setTimeout(finish,9000));}
  if(intro){
    let visited=false;try{visited=sessionStorage.getItem('rope-swing-intro-v2')==='seen';sessionStorage.setItem('rope-swing-intro-v2','seen');}catch{}
    if(reduced||visited)finish();else play();
    document.querySelector('.skip-intro').addEventListener('click',finish);
    document.querySelector('#replay').addEventListener('click',()=>{window.scrollTo({top:0,behavior:'instant'});if(!reduced)play();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')finish();});
  }else finish();
  document.querySelectorAll('.project-toggle').forEach(button=>button.addEventListener('click',()=>{const expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));const panel=document.getElementById(button.getAttribute('aria-controls'));panel.hidden=expanded;const video=panel.querySelector('iframe[data-src]');if(video){if(expanded)video.removeAttribute('src');else video.src=video.dataset.src;}}));
})();
