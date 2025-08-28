// Main JS for yasio-inspired portfolio
const $ = (s,o=document)=>o.querySelector(s);
const $$ = (s,o=document)=>[...o.querySelectorAll(s)];

// year
const y = new Date().getFullYear();
document.getElementById('year').textContent = y;

// IntersectionObserver reveals
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('show');
  });
},{threshold:0.18});
$$('.reveal, .tile, .portrait').forEach(el=>io.observe(el));

// Subtle tilt on tiles
$$('.tilt').forEach(card=>{
  card.addEventListener('mousemove', (ev)=>{
    const r = card.getBoundingClientRect();
    const mx = (ev.clientX - r.left)/r.width;
    const my = (ev.clientY - r.top)/r.height;
    const rx = (my - .5) * -6;
    const ry = (mx - .5) * 6;
    card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', ()=>card.style.transform='');
});

// avoid wheel hijack; keep native smoothness
