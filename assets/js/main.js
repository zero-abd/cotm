(function ($) {
"use strict";

//preloader activation
var win =  $(window);
win.on('load', function () {
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})
    
// meanmenu
$('#bd-mobile-menu').meanmenu({
	meanMenuContainer: '.bd-mobile-menu',
	meanScreenWidth: "1199"
});

//mobile side menu
$('.side-toggle').on('click', function () {
	$('.side-info').addClass('info-open');
	$('.offcanvas-overlay').addClass('overlay-open');
})

$('.side-info-close,.offcanvas-overlay').on('click', function () {
	$('.side-info').removeClass('info-open');
	$('.offcanvas-overlay').removeClass('overlay-open');
})

//sidebar menu
$('.side-toggle1').on('click', function () {
	$('.side-info1').addClass('info-open1');
	$('.offcanvas-overlay1').addClass('overlay-open1');
})

$('.side-info-close1,.offcanvas-overlay1').on('click', function () {
	$('.side-info1').removeClass('info-open1');
	$('.offcanvas-overlay1').removeClass('overlay-open1');
})

//sticky menu activation
win.on('scroll', function () {
	var scroll = win.scrollTop();
	if (scroll < 105) {
		$(".header-sticky").removeClass("sticky-menu");
	} else {
		$(".header-sticky").addClass("sticky-menu");
	}
});
    
// data - background
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    })

    $("[data-bg-color]").each(function () {
        $(this).css("background-color", $(this).attr("data-bg-color"))
    })

// magnificPopup img view
$(".popup-image").magnificPopup({
	type: "image",
	gallery: {
		enabled: true,
	},
});

// magnificPopup video view
$(".popup-video").magnificPopup({
	type: "iframe",
});

    
// Scroll To Top Js
	function smoothSctollTop() {
		$('.smooth-scroll a').on('click', function (event) {
			var target = $(this.getAttribute('href'));
			if (target.length) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top - 0
				}, 1500);
			}
		});
	}
	smoothSctollTop();

	// Show or hide the sticky footer button
	win.on('scroll', function(event) {
		if($(this).scrollTop() > 600){
			$('#scroll').fadeIn(200)
		} else{
			$('#scroll').fadeOut(200)
		}
	});

	//Animate the scroll to yop
	$('#scroll').on('click', function(event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: 0,
		}, 1500);
	});
    
    
	// WOW active
	var wow = new WOW(
		{
			mobile: false,
		}
	);
	wow.init();


	// Active Odometer Counter 
	jQuery('.odometer').appear(function (e) {
		var odo = jQuery(".odometer");
		odo.each(function () {
			var countNumber = jQuery(this).attr("data-count");
			jQuery(this).html(countNumber);
		});
	});

	/*------------------------------------
        isotop activation
    --------------------------------------*/

    $('.bd-portfolio-area-three').imagesLoaded( function() {
        // init Isotope
        var $grid = $('.bd-portfolio-active').isotope({
          itemSelector: '.grid-item',
          percentPosition: true,
          masonry: {
            // use outer width of grid-sizer for columnWidth
            columnWidth: 1,
          }
        });
        
        // filter items on button click
        $('.bd-portfolio-three-menu').on( 'click', 'button', function() {
          var filterValue = $(this).attr('data-filter');
          $grid.isotope({ filter: filterValue });
        });
    
    });
    
    //for menu active class
    $('.bd-portfolio-three-menu button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    
	/*------------------------------------
        Slider
	--------------------------------------*/
	if (jQuery(".bd-slider-active").length > 0) {
		let sliderActive1 = '.bd-slider-active';
		let sliderInit1 = new Swiper(sliderActive1, {
			// Optional parameters
			slidesPerView: 1,
			slidesPerColumn: 1,
			paginationClickable: true,
			loop: true,
			effect: 'fade',

			autoplay: {
				delay: 5000,
			},

			// If we need pagination
			pagination: {
				el: '.swiper-paginations',
				// dynamicBullets: true,
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			a11y: false
		});

		function animated_swiper(selector, init) {
			let animated = function animated() {
				$(selector + ' [data-animation]').each(function () {
					let anim = $(this).data('animation');
					let delay = $(this).data('delay');
					let duration = $(this).data('duration');

					$(this).removeClass('anim' + anim)
						.addClass(anim + ' animated')
						.css({
							webkitAnimationDelay: delay,
							animationDelay: delay,
							webkitAnimationDuration: duration,
							animationDuration: duration
						})
						.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
							$(this).removeClass(anim + ' animated');
						});
				});
			};
			animated();
			// Make animated when slide change
			init.on('slideChange', function () {
				$(sliderActive1 + ' [data-animation]').removeClass('animated');
			});
			init.on('slideChange', animated);
		}
		animated_swiper(sliderActive1, sliderInit1);
	}
    
    // testimonial 1 activation
	var tesimonialThumb = new Swiper('.testimonial-nav', {
		slidesPerView: 2,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
	  });
	var testimonialText = new Swiper('.testimonial-text', {
	spaceBetween: 0,
	loop: true,
	// loopedSlides: 5, //looped slides should be the same
	centeredSlides: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	thumbs: {
		swiper: tesimonialThumb,
	},
	});

	// brand activation
	if (jQuery(".bd-brand-active").length > 0) {
	let brand = new Swiper('.bd-brand-active', {
		slidesPerView: 2,
		spaceBetween: 30,
		// direction: 'vertical',
		loop: true,
        autoplay: {
				delay: 5000,
			},
	  
		// If we need pagination
		pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		},
	  
		// Navigation arrows
		navigation: {
		  nextEl: '.brand-button-next',
		  prevEl: '.brand-button-prev',
		},
	  
		// And if we need scrollbar
		scrollbar: {
		  el: '.swiper-scrollbar',
		},
		breakpoints: {
			550: {
			  slidesPerView: 3,
			},
			768: {
			  slidesPerView: 4,
			},
			1200: {
			  slidesPerView: 5,
			},
			1400: {
				slidesPerView: 6,
			  }
		  }
	  });
	}

	// brand activation
	if (jQuery(".bd-brand-active-two").length > 0) {
		let brandTwo = new Swiper('.bd-brand-active-two', {
			slidesPerView: 2,
			spaceBetween: 30,
			// direction: 'vertical',
			loop: true,
			autoplay: {
					delay: 5000,
				},
		  
			// If we need pagination
			pagination: {
			  el: '.swiper-pagination',
			  clickable: true,
			},
		  
			// Navigation arrows
			navigation: {
			  nextEl: '.brand-button-next',
			  prevEl: '.brand-button-prev',
			},
		  
			// And if we need scrollbar
			scrollbar: {
			  el: '.swiper-scrollbar',
			},
			breakpoints: {
				550: {
				  slidesPerView: 2,
				},
				768: {
				  slidesPerView: 2,
				},
				1200: {
				  slidesPerView: 3,
				},
			  }
		  });
		}

	// project activation
	if (jQuery(".bd-portfolio-active-two").length > 0) {
		let portfolio = new Swiper('.bd-portfolio-active-two', {
			slidesPerView: 1,
			spaceBetween: 30,
			// direction: 'vertical',
			loop: true,
			autoplay: {
					delay: 5000,
				},
		  
			// If we need pagination
			pagination: {
			  el: '.portfolio-pagination',
			  clickable: true,
			},
		  
			// Navigation arrows
			navigation: {
			  nextEl: '.brand-button-next',
			  prevEl: '.brand-button-prev',
			},
		  
			// And if we need scrollbar
			scrollbar: {
			  el: '.swiper-scrollbar',
			},
			breakpoints: {
				550: {
				  slidesPerView: 2,
				},
				768: {
				  slidesPerView: 2,
				},
				1200: {
				  slidesPerView: 3,
				},
			  }
		  });
		}

	// team activation
	if (jQuery(".bd-team-active").length > 0) {
		let portfolio = new Swiper('.bd-team-active', {
			slidesPerView: 1,
			spaceBetween: 30,
			// direction: 'vertical',
			loop: true,
			autoplay: {
					delay: 5000,
				},
		  
			// If we need pagination
			pagination: {
			  el: '.team-pagination',
			  clickable: true,
			},
		  
			// Navigation arrows
			navigation: {
			  nextEl: '.brand-button-next',
			  prevEl: '.brand-button-prev',
			},
		  
			// And if we need scrollbar
			scrollbar: {
			  el: '.swiper-scrollbar',
			},
			breakpoints: {
				550: {
				  slidesPerView: 2,
				},
				768: {
				  slidesPerView: 2,
				},
				1200: {
				  slidesPerView: 3,
				},
			  }
		  });
		}


	// testimonial activation
	if (jQuery(".bd-testimonial-four-active").length > 0) {
		let testimonialFour = new Swiper('.bd-testimonial-four-active', {
			slidesPerView: 1,
			spaceBetween: 30,
			// direction: 'vertical',
			loop: true,
			autoplay: {
					delay: 5000,
				},
		  
			// If we need pagination
			pagination: {
			  el: '.testimonial-pagination',
			  clickable: true,
			},
		  
			// Navigation arrows
			navigation: {
			  nextEl: '.brand-button-next',
			  prevEl: '.brand-button-prev',
			},
		  
			// And if we need scrollbar
			scrollbar: {
			  el: '.swiper-scrollbar',
			},
			breakpoints: {
				550: {
				  slidesPerView: 1,
				},
				768: {
				  slidesPerView: 1,
				},
				1200: {
				  slidesPerView: 1,
				},
			  }
		  });
		}

	// portfolio activation
	if (jQuery(".bd-portfolio-active-five").length > 0) {
		let portfolioFive = new Swiper('.bd-portfolio-active-five', {
			slidesPerView: 1,
			spaceBetween: 30,
			// direction: 'vertical',
			loop: true,
			autoplay: {
					delay: 5000,
				},
		  
			// If we need pagination
			pagination: {
			  el: '.portfolio-pagination',
			  clickable: true,
			},
		  
			// Navigation arrows
			navigation: {
			  nextEl: '.brand-button-next',
			  prevEl: '.brand-button-prev',
			},
		  
			// And if we need scrollbar
			scrollbar: {
			  el: '.swiper-scrollbar',
			},
			breakpoints: {
				550: {
				  slidesPerView: 2,
				},
				768: {
				  slidesPerView: 3,
				},
				1200: {
				  slidesPerView: 3,
				},
			  }
		  });
		}

	// portfolio activation
	if (jQuery(".bd-portfolio-active-seven").length > 0) {
		let portfolioSeven = new Swiper('.bd-portfolio-active-seven', {
			slidesPerView: 1,
			spaceBetween: 30,
			// direction: 'vertical',
			loop: true,
			autoplay: {
					delay: 5000,
				},
		  
			// If we need pagination
			pagination: {
			  el: '.portfolio-pagination',
			  clickable: true,
			},
		  
			// Navigation arrows
			navigation: {
			  nextEl: '.brand-button-next',
			  prevEl: '.brand-button-prev',
			},
		  
			// And if we need scrollbar
			scrollbar: {
			  el: '.swiper-scrollbar',
			},
			breakpoints: {
				550: {
				  slidesPerView: 1,
				},
				768: {
				  slidesPerView: 3,
				},
				1200: {
				  slidesPerView: 4,
				},
				1400: {
					slidesPerView: 4,
				  }
			  }
		  });
		}

	/*------------------------------------
        serach activation
    --------------------------------------*/

	var $searchWrap = $('.search-wrap');
	var $navSearch = $('.nav-search');
	var $searchClose = $('#search-close');

	$('.search-trigger').on('click', function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: 'toggle' }, 500);
		$navSearch.add($searchClose).addClass("open");
	});

	$('.search-close').on('click', function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: 'toggle' }, 500);
		$navSearch.add($searchClose).removeClass("open");
	});

	function closeSearch() {
		$searchWrap.fadeOut(200);
		$navSearch.add($searchClose).removeClass("open");
	}

	$(document.body).on('click', function (e) {
		closeSearch();
	});

	$(".search-trigger, .main-search-input").on('click', function (e) {
		e.stopPropagation();
	});

	/*----------------------------------------------
	5. Particles
	----------------------------------------------*/

	jQuery(function($) {

		'use strict';

		function particles(type, ID) {

			if(type === 'default') {
				particlesJS(ID,{particles:{number:{value:80,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.25,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:5,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:.25,width:1},move:{enable:!0,speed:6,direction:"none",random:!1,straight:!1,out_mode:"out",attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:0,mode:"repulse"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0,config_demo:{hide_card:!1,background_color:"#b61924",background_image:"",background_position:"50% 50%",background_repeat:"no-repeat",background_size:"cover"}});
			}

			if(type === 'bubble') {
				particlesJS(ID,{particles:{number:{value:6,density:{enable:!0,value_area:800}},color:{value:"#182c50"},shape:{type:"polygon",stroke:{width:0,color:"#000"},polygon:{nb_sides:6},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.3,random:!0,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:160,random:!1,anim:{enable:!0,speed:10,size_min:40,sync:!1}},line_linked:{enable:!1,distance:200,color:"#ffffff",opacity:1,width:2},move:{enable:!0,speed:8,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"grab"},onclick:{enable:!1,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0});
			}

			if(type === 'space') {
				particlesJS(ID,{particles:{number:{value:160,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:1,random:!0,anim:{enable:!0,speed:1,opacity_min:0,sync:!1}},size:{value:3,random:!0,anim:{enable:!1,speed:4,size_min:.3,sync:!1}},line_linked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:1,direction:"none",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:600}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"bubble"},onclick:{enable:!0,mode:"repulse"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:250,size:0,duration:2,opacity:0,speed:3},repulse:{distance:400,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0});
			}
		}

		$('.particles').each(function() {

			let type = $(this).data('particle');
			let ID   = $(this).attr('id');

			particles(type, ID);
		})
	})


})(jQuery);

