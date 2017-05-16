

/*************** The menu on the left ********************/	
/* start slide */
$(document).ready(function(){
   $(document).on('click','.moreMenu',function(){
	  $('.sideMenu').addClass('slideOpen');
	  $('.slideLeft').show();
	  $('body').css({'overflow':'hidden'});
   });
   $(document).on('click','.slideLeft, .menuBar a',function(){
	  $('.sideMenu').removeClass('slideOpen');
	  $('.slideLeft').hide();
	  $('body').removeAttr('style');
   });

   setTimeout(function(){
	  var profileHeight = $('.profile').outerHeight();
	   var profileHeight1 = profileHeight + 20;
	  $('.menuBar').css('top', profileHeight1+'px');
   },0);
             
});
/* end slide */

/* start Setting popup */
$(".setting").click(function(e){
			$('.slidepop').removeClass('slidepop');
			e.stopPropagation();		
		
			$(this).parent().parent().parent().find(".custom_popup").slideToggle();
			$(this).toggleClass('slidepop');
			//$('.custom_popup:visible').not($(this).parent().parent().next()).slideUp();
		});	
	
		$(document).click(function (e){
			$('.slidepop').removeClass('slidepop');
		
			var container = $(".custom_popup");
			if (!container.is(e.target)&& container.has(e.target).length === 0) {
				container.hide();
			}
			var container = $(".custom_popup");
			if (!container.is(e.target)&& container.has(e.target).length === 0) {
				container.hide();
			}
		});
/* end Setting popup */

