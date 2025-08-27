// Muhammad Imran — Portfolio Interactions & Animations
// Smooth scroll with Lenis
const lenis = new Lenis({ smoothWheel: true });
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', ()=> navLinks.classList.toggle('show'));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Cursor glow follows the mouse
const glow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', (e)=>{
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// GSAP setup
gsap.registerPlugin(ScrollTrigger);

// Split headline letters
function splitText(el){
  const text = el.innerHTML;
  const wrapped = text.replace(/([^<\/>])(?=[^<]*?(?:<|$))/g, '<span class="char">$1</span>');
  el.innerHTML = wrapped;
}
document.querySelectorAll('[data-split]').forEach(splitText);

// Intro timeline (WOW): stagger letters, pop stats, float shapes already with CSS
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from('.site-header .brand', { y: -20, opacity: 0, duration: .6 })
  .from('.headline .char', { y: 60, opacity: 0, stagger: 0.02, duration: 0.6 }, '-=0.2')
  .from('.lede', { y: 30, opacity: 0, duration: .5 }, '-=0.2')
  .from('.cta-row .btn', { y: 20, opacity: 0, stagger: 0.1, duration: .4 }, '-=0.2')
  .from('.hero-stats .stat', { y: 20, opacity: 0, stagger: 0.1, duration: .4 })
  .from('.profile-card', { y: 40, opacity: 0, duration: .6 }, '-=0.5');

// Count-up numbers
document.querySelectorAll('.num[data-count]').forEach(el => {
  const target = +el.dataset.count;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 1.6,
    ease: 'power2.out',
    onUpdate(){ el.textContent = Math.floor(obj.val); }
  });
});

// Skills bars animate on scroll
gsap.utils.toArray('.bar span').forEach((bar)=>{
  gsap.to(bar, {
    scaleX: 1,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: bar,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Section reveal
gsap.utils.toArray('.section .card, .section .mini-card, .section .project-card, .section .about-copy').forEach((el)=>{
  gsap.from(el, {
    y: 34, opacity: 0, duration: .7, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

// Tilt effect on project thumbnails (vanilla parallax tilt)
document.querySelectorAll('.tilt').forEach((card)=>{
  const height = 14, width = 14; // tilt strength
  card.addEventListener('pointermove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -height;
    const ry = ((x / rect.width) - 0.5) * width;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
  });
  card.addEventListener('pointerleave', ()=>{
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// Sticky hover underline on nav links
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', ()=> navLinks.classList.remove('show'));
});

// Scroll-linked gradient subtle shift on body background
gsap.to(document.body, {
  backgroundPosition: "50% 100%",
  ease: "none",
  scrollTrigger: { scrub: true }
});
