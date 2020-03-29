export default
  gsap.timeline({paused: true})
    .from('.toast', { duration: .5, x: 50, autoAlpha: 0, ease: "expo.out" })
    .from('.toast__item', { x: 80, autoAlpha: 0, ease: "expo.out" }, "-=.9");