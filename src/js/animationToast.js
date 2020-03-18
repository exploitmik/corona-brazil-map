export default
  gsap.timeline({paused: true})
    .from('.toast', { x: 50, autoAlpha: 0, ease: "expo.out" })
    .from('.toast__item', { stagger: .1, x: 80, autoAlpha: 0, ease: "expo.out" }, "-=.8");