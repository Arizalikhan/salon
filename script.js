(function(){
  // header scroll state
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // cursor glow (desktop only)
  const glow = document.getElementById('cursor-glow');
  let gx = window.innerWidth/2, gy = window.innerHeight/2, cx = gx, cy = gy;
  const hasFinePointer = window.matchMedia('(pointer:fine)').matches;
  if(hasFinePointer){
    window.addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; });
    (function loop(){
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    })();
  } else {
    glow.style.display = 'none';
  }

  // mobile menu
  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-panel');
  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
  });
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => panel.classList.remove('open')));

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // testimonial slider
  const quotes = document.querySelectorAll('.quote');
  const dotsWrap = document.getElementById('quote-dots');
  let active = 0;
  quotes.forEach((_, i) => {
    const dot = document.createElement('button');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showQuote(i));
    dotsWrap.appendChild(dot);
  });
  function showQuote(i){
    quotes[active].classList.remove('active');
    dotsWrap.children[active].classList.remove('active');
    active = i;
    quotes[active].classList.add('active');
    dotsWrap.children[active].classList.add('active');
  }
  setInterval(() => showQuote((active + 1) % quotes.length), 5500);

  // booking form
  const form = document.getElementById('booking-form');
  const msg = document.getElementById('form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bf-name').value.trim();
    const phone = document.getElementById('bf-phone').value.trim();
    const service = document.getElementById('bf-service').value;
    if(!name || !phone){
      msg.textContent = 'Please add your name and phone number.';
      return;
    }
    msg.textContent = `Thank you, ${name} — we'll confirm your ${service || 'visit'} by phone shortly.`;
    form.reset();
  });
})();