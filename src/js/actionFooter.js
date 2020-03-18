export default function actionFooter(){
  const btnAction = document.querySelector('.footer__close');
  const footer = document.querySelector('.footer');

  const timelineAnimation =
    gsap
      .timeline()
      .from(footer, { duration: .3, yPercent: 100, ease: "ease.out"});

  btnAction.addEventListener('click', () => {
    footer.classList.toggle('footer--down');
    if ( timelineAnimation.reversed() ){
      timelineAnimation.play();
    }else{
      timelineAnimation.reverse();
    }
  });
}