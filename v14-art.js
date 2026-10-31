(()=>{
"use strict";
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const paths=[...document.querySelectorAll('.v14-draw')];
paths.forEach(path=>{try{const l=path.getTotalLength();path.style.strokeDasharray=String(l);path.style.strokeDashoffset=reduce?'0':String(l)}catch(e){}});
const targets=[...document.querySelectorAll('.v14-hero-horizon,.v14-cta-waves,.v14-process-line')];
function activate(el){el.classList.add('is-drawn');el.querySelectorAll('.v14-draw').forEach(path=>path.style.strokeDashoffset='0')}
if(reduce||!('IntersectionObserver' in window)){targets.forEach(activate)}else{const o=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){activate(e.target);o.unobserve(e.target)}})},{threshold:.10,rootMargin:'0px 0px -15px 0px'});targets.forEach(el=>o.observe(el));}
if(!reduce&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.art-directed-hero').forEach(hero=>{let raf=0;hero.addEventListener('pointermove',ev=>{if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--v14-pointer-x',`${Math.round(((ev.clientX-r.left)/r.width)*100)}%`);hero.style.setProperty('--v14-pointer-y',`${Math.round(((ev.clientY-r.top)/r.height)*100)}%`)})},{passive:true})})}
})();
