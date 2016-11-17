"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {

	$(".fancybox").fancybox();
	var App = function App() {
		$('[data-phone="true"]').mask("+7 (999) 999-99-99");
		$('[data-item="slider"]').owlCarousel(_defineProperty({
			loop: true,
			margin: 0,
			nav: true,
			dots: true,
			items: 1,
			navContainer: '.main-navigation',
			dotsContainer: '.main-dots',
			autoplayHoverPause: true,
			autoplay: false,
			navSpeed: 500,
			dotsSpeed: 500
		}, "dots", true));

		var stackModal = 0;

		$(document).on('show.bs.modal', '.modal', function (event) {
			var zIndex = 1040 + 10 * $('.modal:visible').length;
			$(this).css('z-index', zIndex);
			stackModal++;
			setTimeout(function () {
				$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
			}, 0);
		});
		$(document).on('hidden.bs.modal', '.modal', function (event) {
			stackModal--;
			if (stackModal > 0) {
				$('body').addClass("modal-open");
			} else {
				$('body').removeClass("modal-open");
			}
		});

		$('a.smooth').click(function () {
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top - 100
			}, 1000);
			return false;
		});

		var svg = document.querySelector('svg');

		if (svg) {
			(function () {
				var items = [];
				var Item = [];
				var scale = svg.querySelectorAll('.scale');
				var clickHandler = function clickHandler(evt) {
					var newtarget = evt.currentTarget || event.currentTarget;
					console.log(newtarget);
				};
				Array.prototype.forEach.call(scale, function (item) {
					Item.push(item);
					item.addEventListener("mouseenter", clickHandler, false);
				});
				items.push.apply(items, Item);
				console.log(items);
			})();
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
								callback: function callback($field) {
									if (/[+][7]\s[()][0-9]{3}[)]\s[0-9]{3}[-][0-9]{2}[-][0-9]{2}/i.test($field) === true) {
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

			initialize: function initialize() {
				this.Validation('#call2,#call,#thx');
			},
			Validation: function Validation(form) {
				$(form).formValidation(this.ValidationOptions).on('success.form.fv', function (e) {
					e.preventDefault();
					var $form = $(e.target);

					console.log($form);

					fv = $form.data('formValidation');

					$form.ajaxSubmit({
						success: function success(responseText, statusText, xhr, $form) {
							console.log(responseText, statusText, xhr, $form);
							$('#call2').modal('hide');
							$('#call').modal('hide');
							$('#thx').modal('show');
						}
					});
				});
			}
		};
		Form.initialize();

		// Filter search
		$('.dropdown-menu > li').on('click', function (e) {
			var target = e.target || window.target;
			var val = $(target).html();
			var filterBtn = $(this).parent().prev();
			filterBtn.html(val).prev().val(val);
		});

		// Filter price block
		var fromPrice = {
			textTo: 'от',
			textFrom: 'до',
			text: ''
		};

		$('.range-box > input').on('input', function (e) {
			var target = e.target || window.target;
			var val = $(target).val();
			var filterBtn = $(this).parent().parent().prev();
			var valTarget = parseInt($(target).val());

			if ($(target).attr('id') == 'price-from') {
				fromPrice.textTo = combTextInput('price-from', valTarget);
			} else {
				fromPrice.textFrom = combTextInput('price-up-to', valTarget);
			}

			var textInputPrice = '';

			if (fromPrice.textTo != 'от') {
				textInputPrice += fromPrice.textTo + ' р. ';
			}
			if (fromPrice.textFrom != 'до') {
				textInputPrice += fromPrice.textFrom + ' р.';
			}
			if (!isNaN(fromPrice.from) && fromPrice.from) {
				fromPrice.textAll += ' ' + fromPrice.textFrom + ' ' + fromPrice.from;
			}

			filterBtn.html(textInputPrice);

			if (!filterBtn.html()) {
				filterBtn.html('Цена <span class="my-caret"></span>');
			}
		});

		function combTextInput(idx, vals, obj) {
			var result = '';
			if (idx == 'price-up-to') {
				var Text = 'до';
			}
			if (idx == 'price-from') {
				var Text = 'от';
			}

			if (!isNaN(vals) && vals) {
				result = Text;
				result += ' ' + vals;
			} else {
				result = Text;
			}
			return result;
		}

		// Filter range input
		$("#range_01").ionRangeSlider({
			type: "double",
			grid: false,
			min: 0,
			max: 100,
			from: 200,
			to: 80,
			prefix: "сотки "
		});
	};
	App();
});
"use strict";