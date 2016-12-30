//=include ./filter.js
//=include ./slider.js 
(function(){
	//=include ./slider.js 
	//SLIDERS INIT
	//Promo
	let SliderPromo = new Slider('promo-slider', 'promo-slider-nav');
	SliderPromo.activeStateSlider();
	//Area
	let SliderArea = new Slider('offer-area-slider','offer-area-slider-nav','offer-area', 4);
	SliderArea.activeStateSlider();
	SliderArea.activeToggler();
	SliderArea.initToggler('offer-area-button');
	//Lot
	let SliderLot = new Slider('offer-lot-slider','offer-lot-slider-nav','offer-lot', 4);
	SliderLot.initToggler('offer-lot-button');
	//Details
	let SliderDetail = new Slider('details-slider', 'details-slider-nav');
	SliderDetail.activeStateSlider();

	// // List load more function
	// $(".area-cards__item, .lots-cards__item").slice(0, 8).show();
 //   	$("#loadMore").on('click', function (e) {
 //       e.preventDefault();
 //       $(".area-cards__item:hidden, .lots-cards__item:hidden").slice(0, 4).slideDown();
 //       if ($(".area-cards__item:hidden, .lots-cards__item:hidden").length == 0) {
 //           $("#loadMore").fadeOut('slow');
 //       }
 //       $('html,body').animate({
 //           scrollTop: $(this).offset().top
 //       }, 1500);
 //   	});
})();

$(document).ready(function() {
	//Выпадающий баннер шапки
	var foldingHeader = $('.header__content');

	foldingHeader.addClass('opened');
	$(window).on('scroll', function() {
		foldingHeader.hide();
	});

	$(".fancybox").fancybox();

	//Задвигающийся лого шапки
	var foldingLogo = $('.logo');
	// var foldingBreadcrumbs = $('.breadcrumbs > ul');
	$(window).on('scroll', function() {
		if ($(window).scrollTop() === 0) {
			foldingLogo.removeClass('folded');
			// foldingBreadcrumbs.removeClass('unfolded');
		} else {
			foldingLogo.addClass('folded');
			// foldingBreadcrumbs.addClass('unfolded');
		}
	});

	// Filter animation
	$(document).on('click', '[data-toggle="dropdown"]', function(e) {
		// //Add folding menu animation
		// $(this).next().addClass('opened');
		//Reset all the carets in filter
		$(this).parent().siblings('.dropdown').children('button').children('.my-caret').removeClass('animated');
		//Add caret rotation animation
		if($(this).attr('aria-expanded') == 'true') {
			$(this).children('.my-caret').addClass('animated');
		} else {
			$(this).children('.my-caret').removeClass('animated');
		}
	})

	//Cards show phone functionality
	$(document).on('click', '[data-phone-link]', function(e) {
		$(this).hide(); //Hide pop-up "Show phone number"
		$(this).prev().hide(); //Hide shorten phone number
		$(this).next().show(); //Show full phone number
		$(this).parent().css('border', 0); //Delete borders of rounded parent button
	})

	//Show|Hide map
	$('#show-map-btn').click(function(e) {
		e.preventDefault();
		if ($(this).data('state') == 'closed') {
			$(this).data('state', 'opened');
			console.log();
			$(this).children('.show-map-btn--toggler').html('▼');
			$(".map-section").show();
		} else {
			$(this).data('state', 'closed');
			$(this).children('.show-map-btn--toggler').html('►');
			$(".map-section").hide();
		}
	})

	//Show filter reset button emultaion
	$('#filter').on('click', '.dropdown-menu--terem>li', function(e) {
		e.preventDefault();
		$('.col--show-map-btn')
			.removeClass('col--show-map-btn')
			.css('padding', '0');
		$('.col--filter-reset').css('visibility', 'visible');
	})

	//Details info block functionality
	$('.details__tabs').on('click', '.tab > a', function(e){
		e.preventDefault();
		var tmp = $(this)
			.addClass('link--active')
			.removeClass('link--gray')
			.parent('div')
			.siblings('div')
			.children()
			.removeClass('link--active')
			.addClass('link--gray');
	})

	// //Slider in Details page
	// var sync1 = $('[data-item="details-big-picture"]');
	// var sync2 = $('[data-item="details-thumbnails"]');
	
	// sync1.owlCarousel({
	// 	items: 1,
	// 	slideSpeed: 1000,
	// 	nav: true,
	// 	dots:false,
	// 	onChanged: syncPosition,
	// 	responsiveRefreshRate: 200,
	// });
	
	// sync2.owlCarousel({
	// 	items: 2,
	// 	itemsDesktop: [1199,5],
	// 	itemsDesktopSmall: [979,5],
	// 	itemsTablet: [768,5],
	// 	itemsMobile: [479,3],
	// 	pagination: false,
	// 	margin: 10,
	// 	responsiveRefreshRate: 100,
	// 	onInitialized: function(){
	// 		$(this)[0]._items[0].addClass('synced');
	// 	}
	// });
	
	// function syncPosition(){
	// 	var allItems = $(this)[0]._items;
	// 	var current = 1;
	// 	for (var i in allItems) {
	// 		if ($(allItems[i]).hasClass('active')) {
	// 			current = i;
	// 		}
	// 	}
	// 	$(sync2)
	// 	.find(".owl-item")
	// 	.removeClass("synced")
	// 	.eq(current)
	// 	.addClass("synced")
	// 	.trigger('to.owl.carousel', current);
	// }
	
	// $(sync2).on("click", ".owl-item", function(e){
	// 	e.preventDefault();
	// 	var target = $(e.target).parent();
	// 	var owlItemList = $(target)[0].parentNode.childNodes;
	// 	var index = $(owlItemList).index(target);
	// 	console.log(index);
	// 	sync1.trigger('to.owl.carousel', index);
	// });
	var App = function (){
		$('[data-phone="true"]').mask("+7 (999) 999-99-99");
		
		var stackModal = 0;

		$(document).on('show.bs.modal', '.modal', function (event) {
			var zIndex = 1040 + (10 * $('.modal:visible').length);
			$(this).css('z-index', zIndex);
			stackModal++;
			setTimeout(function() {
				$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
			}, 0);
		});
		$(document).on('hidden.bs.modal', '.modal', function (event) {
			stackModal--;
			if(stackModal > 0) {
				$('body').addClass("modal-open");
			} else {
				$('body').removeClass("modal-open");
			}
		});

		$('a.smooth').click(function(){
			$('html, body').animate({
				scrollTop: $( $.attr(this, 'href') ).offset().top - 100
			}, 1000);
			return false;
		});

		var svg = document.querySelector('svg');

		if (svg) {
			let items = [];
			let Item = [];
			let scale = svg.querySelectorAll('.scale');
			let clickHandler = (evt) => {
				let newtarget = evt.currentTarget || event.currentTarget;
				console.log(newtarget);
			}
			Array.prototype.forEach.call(scale, (item) => {
				Item.push(item);
				item.addEventListener("mouseenter", clickHandler, false);
			});
			items.push(...Item);
			console.log(items);
		}
		
		var Form = {
			ValidationOptions: {
				framework: 'bootstrap',

				locale: 'ru_RU',
				
				fields: {
					
					userPhoneNumber: {
						trigger: 'keyup keydown',
						validators: {
							callback: {
								message: 'Это не похоже на телефон!',
								callback: function($field){
									if(/[+][7]\s[()][0-9]{3}[)]\s[0-9]{3}[-][0-9]{2}[-][0-9]{2}/i.test($field) === true){
										return true;
									} else {
										return false;
									}
								}
							},
							notEmpty: {
								message: 'Не заполнено поле «Телефон»'
							},
							blank: {}
						}
					},
					userName: {
						trigger: 'keyup keydown',
						validators: {
							notEmpty: {
								message: 'Не заполнено поле «ФИО»'
							},
							blank: {}
						}
					},
					userAddress: {
						trigger: 'keyup keydown',
						validators: {
							notEmpty: {
								message: 'Не заполнено поле «Город»'
							},
							blank: {}
						}
					},
					userDirection: {
						trigger: 'keyup keydown',
						validators: {
							notEmpty: {
								message: 'Не заполнено поле «Направление»'
							},
							blank: {}
						}
					},
					userEmail: {
						trigger: 'keyup keydown',
						validators: {
							emailAddress: {
								message: 'Это не похожу на E-mail'
							},
							notEmpty: {
								message: 'Не заполнено поле «E-mail»'
							},
							blank: {}
						}
					},
					time: {
						trigger: 'keyup keydown change',
						validators: {
							notEmpty: {
								message: 'Не заполнено поле «Время»'
							},
							blank: {}
						}
					}
				}
			},

			initialize : function () {
				this.Validation('#call2,#call,#thx');
			},
			Validation:function(form){
				$(form).formValidation(this.ValidationOptions)
				.on('success.form.fv', function(e) {
					e.preventDefault();
					var $form = $(e.target);

					console.log($form);

					fv = $form.data('formValidation');

					$form.ajaxSubmit({
						success: function(responseText, statusText, xhr, $form) {
							console.log(responseText,statusText,xhr,$form);
							$('#call2').modal('hide');
							$('#call').modal('hide');
							$('#thx').modal('show');
						}
					});
				});
			}
		};
		Form.initialize();		
	}
	App();
});