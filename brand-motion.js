(() => {
  'use strict';
  const ready = () => document.body.classList.add('is-ready');
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once:true});
  else ready();
  const prefersReduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections=document.querySelectorAll('.home-services-head,.home-service-row,.home-how-head,.home-step,.home-final-inner,.editorial-band-inner,.lead-spread .container,.ruled-section .container');
  if (!prefersReduce && 'IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)} });
    },{threshold:.1,rootMargin:'0px 0px 25px 0px'});
    sections.forEach(el=>{el.classList.add('art-reveal');observer.observe(el)});
  } else {sections.forEach(el=>el.classList.add('is-visible'))}
  // The PCB&T logo is deliberately never animated, redrawn, tinted or recoloured.
})();
