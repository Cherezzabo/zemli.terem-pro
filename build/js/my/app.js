//=include ./filter.js
 
(function(){
	//=include ./slider.js 
	//SLIDERS INIT
	//Promo
	let filter = new Filter('.main-banner__filter');
	filter.render();
	filter.onSelectChoose();

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
})();

$(document).ready(function() {
	//Выпадающий баннер шапки
	var foldingHeader = $('.header__content');

	foldingHeader.addClass('opened');
	$(window).on('scroll', function() {
		foldingHeader.hide();
	});

	$(".fancybox").fancybox();

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

		// Filter animation
		$('button[data-toggle="dropdown"]').on('click', function(e) {
			$(this).next().addClass('opened');
		})

		// Filter search
		// $('.dropdown-menu > li').on('click', function(e) {
		// 	var target = e.target || window.target;
		// 	var val = $(target).html();
		// 	var filterBtn = $(this).parent().prev();
		// 	filterBtn.html(val).prev().val(val);
		// });


		//filterArea.onInput();
		//let filterDistance = new Filter('dropdownDistance', 'distance', 'км', 'Удаленность от МКАД');
		//filterDistance.onInput();
		//let filterPrice = new Filter('dropdownPrice', 'price', 'р.', 'Цена');
		//filterPrice.onInput();


		// Filter price block
		// var rangePrice = {
		// 	textFrom: 'от',
		// 	textTo: 'до',
		// 	text: ''
		// }

		// $('.range-box > input').on('input', function(e) {
		// 	var target = e.target || window.target;
		// 	var val = $(target).val();
		// 	var filterBtn = $(this).parent().parent().prev();
		// 	var valTarget = parseInt($(target).val());


		// 	if($(target).attr('id') == 'price-from') {
		// 		rangePrice.textFrom = combTextInput('price-from',valTarget);
		// 	} else {
		// 		rangePrice.textTo = combTextInput('price-up-to',valTarget);
		// 	}
			
		// 	var textInputPrice = '';

		// 	if(rangePrice.textFrom != 'от') {
		// 		textInputPrice += rangePrice.textFrom + ' р. ';
		// 	}
		// 	if(rangePrice.textTo != 'до') {
		// 		textInputPrice += rangePrice.textTo + ' р.';
		// 	}
		// 	if(!isNaN(rangePrice.from) && rangePrice.from) {
		// 			rangePrice.textAll += ' ' + rangePrice.textTo + ' ' + rangePrice.from;
		// 	}

		// 	filterBtn.html(textInputPrice);
			
		// 	if(!filterBtn.html()) {
		// 		filterBtn.html('Цена <span class="my-caret"></span>');
		// 	}			
		
		// })


		// function combTextInput(idx,vals,obj){
		// 	var result = '';
		// 	if(idx == 'price-up-to'){
		// 		var Text = 'до';
		// 	}
		// 	if(idx == 'price-from'){
		// 		var Text = 'от';
		// 	}
			
		// 	if(!isNaN(vals) && vals){
		// 			result = Text;
		// 			result += ' ' + vals;
		// 	}else{
		// 			result = Text;
		// 	}
		// 	return result;
		// }

		// // Filter range input
		// $("#range_01").ionRangeSlider({
		//     type: "double",
		//     grid: false,
		//     min: 0,
		//     max: 100,
		//     from: 200,
		//     to: 80,
		//     prefix: "сотки "
		// });
	}
	App();
});