gsap.registerPlugin(ScrollTrigger);

function loader(time) {
  $(window).bind('load', function() {
		$('.overlay').addClass('loaded');
		setTimeout(function() {
			$('.overlay').css({'display':'none'});
      $('.work2').removeClass('displayNone');
		}, time)
	});
  // Will remove overlay after 1min for users cannnot load properly.
	setTimeout(function() {
		$('.overlay').addClass('loaded');
    $('.work2').removeClass('displayNone');
	}, 60000);
}

function animation() {
  const saveStyled = `
    .card1
    .card2
    .card3
  `
  ScrollTrigger.saveStyles(saveStyled);
  const graph = gsap.timeline();
  graph
    .from('#js_triggerHero .leftBox .circle1', {
      y: -1500,
      duration: 1.5
    }, 0.1)
    .from('#js_triggerHero .circle2', {
      y: 1500,
      duration: 1.5
    }, 0.2)
    .from('#js_triggerHero .circle4',{
      y: -500,
      ease: Back.easeInOut,
      duration: 1.5
    }, 0.5)
    .from('#js_triggerHero .rightBox .circle1',{
      y: 500,
      ease: Back.easeInOut,
      duration: 1.5
    }, 0.5)
    .from('#js_triggerHero .triangle',{
      x: 500,
      y: -500,
      duration: 1.5
    }, 0.5)
    .fromTo('#js_triggerHero .card1',{
      x: 2000,
      rotate: 360,
    }, {
      x: 0,
      ease: Elastic.easeOut.config(1, 0.5),
      rotate: 17,
      duration: 3,
    } ,1)
    .fromTo('#js_triggerHero .card2',{
      x: 1000,
      rotation: 360,
    }, {
      x: 0,
      rotate: -15,
      ease: Back.easeOut,
      duration: 1.2
    },1.8)
    .fromTo('#js_triggerHero .card3',{
      x: 1000,
      rotate: 360,
    }, {
      x: 0,
      rotate: 135,
      ease: Back.easeOut,
      duration: 1.2
    }, 2)
    .from('#js_triggerHero .figma',{
      x: -500,
      duration: 1
    },2.2)
    .from('#js_triggerHero .titleText',{
      y: 1000,
      ease: Power4.easeInOut,
      duration: 1
    },2.4)
    .from('#js_triggerHero .subtitleText',{
      y: 1000,
      ease: Power4.easeInOut,
      duration: 1
    },2.6)
}

$(document).ready(function() {
  loader(1500);
  TweenLite.delayedCall(1.5, animation);
});
