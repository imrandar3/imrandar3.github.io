// Cursor ring + dot
const ring = document.getElementById('cursorRing');
const dot = document.getElementById('cursorDot');
document.addEventListener('mousemove', e => {
  const x = e.clientX, y = e.clientY;
  ring.style.transform = `translate(${x}px, ${y}px)`;
  dot.style.transform = `translate(0,0)`;
});
// Add slight scale when hovering interactive elements
document.querySelectorAll('a, .tile, .btn').forEach(el=>{
  el.addEventListener('mouseenter', ()=> ring.style.transform += ' scale(1.08)');
  el.addEventListener('mouseleave', ()=> ring.style.transform = ring.style.transform.replace(' scale(1.08)',''));
});
// Intersection observer reveals + counters
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      const num = entry.target.querySelector('.num');
      if(num && !num.dataset.animated){
        const target = parseInt(num.dataset.count||num.textContent||0,10);
        let i=0; num.dataset.animated = 1;
        const t = setInterval(()=>{ i+= Math.ceil(target/20); if(i>=target){ i=target; clearInterval(t);} num.textContent = i; },40);
      }
    }
  });
},{threshold:0.18});
document.querySelectorAll('.reveal, .tile, .portrait-card, .num').forEach(el=>io.observe(el));
// tilt effect
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const mx = (e.clientX - r.left)/r.width;
    const my = (e.clientY - r.top)/r.height;
    const rx = (my-0.5)*-6;
    const ry = (mx-0.5)*6;
    card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', ()=> card.style.transform = '');
});
// year
document.getElementById('year').textContent = new Date().getFullYear();


// 🎬 Video Popup
const playBtn = document.getElementById("playBtn");
const videoPopup = document.getElementById("videoPopup");
const closeBtn = document.getElementById("closeBtn");

playBtn.addEventListener("click", () => {
  videoPopup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  videoPopup.style.display = "none";
});

// 🎯 Custom Cursor
const cursorDot = document.createElement("div");
const cursorCircle = document.createElement("div");

cursorDot.classList.add("cursor-dot");
cursorCircle.classList.add("cursor-circle");

document.body.appendChild(cursorDot);
document.body.appendChild(cursorCircle);

document.addEventListener("mousemove", e => {
  let x = e.clientX;
  let y = e.clientY;

  cursorDot.style.left = `${x}px`;
  cursorDot.style.top = `${y}px`;

  cursorCircle.style.left = `${x}px`;
  cursorCircle.style.top = `${y}px`;
});

// 🎭 On scroll, cursor circle grows
window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  if (scrollY > window.innerHeight / 2) {
    cursorCircle.style.transform = "translate(-50%, -50%) scale(2)";
  } else {
    cursorCircle.style.transform = "translate(-50%, -50%) scale(1)";
  }
});

