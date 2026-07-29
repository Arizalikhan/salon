 // nav shadow on scroll
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', ()=>{
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  function closeMenu(){
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
  }
  function toggleMenu(){
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    navOverlay.classList.toggle('open', isOpen);
  }
  navToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', ()=>{ if(window.innerWidth > 820) closeMenu(); });

  // scroll reveal
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },{threshold:0.15});
  els.forEach(el=>io.observe(el));

  // testimonial rotator
  const quotes = [
    {text:"Every visit here feels less like a service and more like being taken care of by someone who actually knows what they're doing.", who:"— Ayesha Khan, Client since 2019"},
    {text:"My bridal look held up for fourteen hours straight through a wedding, a mehndi hangover, and a lot of crying relatives.", who:"— Zoha Ahmed, Bride"},
    {text:"I've stopped explaining what I want. They just ask two questions and somehow know exactly what I mean.", who:"— Hira Malik, Client since 2016"}
  ];
  let qi = 0;
  const pullText = document.getElementById('pullText');
  const pullWho = document.getElementById('pullWho');
  function renderQ(i){
    pullText.style.opacity = 0;
    pullWho.style.opacity = 0;
    setTimeout(()=>{
      pullText.textContent = quotes[i].text;
      pullWho.textContent = quotes[i].who;
      pullText.style.transition = 'opacity 0.4s ease';
      pullWho.style.transition = 'opacity 0.4s ease';
      pullText.style.opacity = 1;
      pullWho.style.opacity = 1;
    }, 250);
  }
  document.getElementById('nextQ').addEventListener('click', ()=>{ qi=(qi+1)%quotes.length; renderQ(qi); });
  document.getElementById('prevQ').addEventListener('click', ()=>{ qi=(qi-1+quotes.length)%quotes.length; renderQ(qi); });

  // gallery: button-driven scroll (no visible scrollbar)
  const galleryStrip = document.getElementById('galleryStrip');
  const galPrev = document.getElementById('galPrev');
  const galNext = document.getElementById('galNext');
  galleryStrip.classList.add('scrollable');

  function galScrollStep(){
    const item = galleryStrip.querySelector('.g-item');
    return item ? item.offsetWidth + 22 : 300;
  }
  function updateGalButtons(){
    const max = galleryStrip.scrollWidth - galleryStrip.clientWidth - 4;
    galPrev.disabled = galleryStrip.scrollLeft <= 4;
    galNext.disabled = galleryStrip.scrollLeft >= max;
  }
  galNext.addEventListener('click', ()=>{
    galleryStrip.scrollBy({left: galScrollStep(), behavior:'smooth'});
  });
  galPrev.addEventListener('click', ()=>{
    galleryStrip.scrollBy({left: -galScrollStep(), behavior:'smooth'});
  });
  galleryStrip.addEventListener('scroll', updateGalButtons);
  window.addEventListener('resize', updateGalButtons);
  updateGalButtons();