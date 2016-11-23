"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var searchAreasHelpers = {
	"url": {
		"default": "/area/"
	},
	"selects": {
		"select1": [{
			"name": "road",
			"name_text": "Шоссе",
			"values": {
				"v1": "Можайское шоссе",
				"v2": "Киевское шоссе",
				"v3": "Разянское шоссе"
			}
		}]
	},
	"ranges": {
		"range1": [{
			"name": "distance",
			"name_text": "Удаленность от МКАД",
			"type": "км",
			"min_text": "от",
			"max_text": "до",
			"values": {
				"min": 10,
				"max": 100
			}
		}],
		"range2": [{
			"name": "area",
			"name_text": "Размер",
			"type": "м",
			"min_text": "от",
			"max_text": "до",
			"values": {
				"min": 6,
				"max": 10
			}
		}],
		"range3": [{
			"name": "price",
			"name_text": "Цена",
			"type": "р.",
			"min_text": "от",
			"max_text": "до",
			"values": {
				"min": 100000,
				"max": 3000000
			}
		}]
	}
};
var searchLotHelpers = {
	"url": {
		"default": "/lots/"
	},
	"ranges": {
		"range1": [{
			"name": "distance",
			"name_text": "Test",
			"type": "км",
			"min_text": "от",
			"max_text": "до",
			"values": {
				"min": 10,
				"max": 100
			}
		}]

	}
};

var Filter = function () {
	function Filter(value) {
		_classCallCheck(this, Filter);

		this.areaObject = searchAreasHelpers;
		this.lotsObject = searchLotHelpers;
		this.wrapperFilter = value;
		this.FormHeader = "<form action=\"\" method=\"\" id=\"filter\" class=\"filter-form\">\n   \t\t\t\t\t\t\t<div class=\"dropdown\">\n   \t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" name=\"type\" id=\"typeSearch\" value=\"area\" class=\"hidden\">\n   \t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-filter btn-lg dropdown-toggle\" type=\"button\" id=\"typeDropdown\" data-placeholder=\"\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\u0423\u0447\u0430\u0441\u0442\u043A\u0438<span class=\"my-caret\"></span>\n   \t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n   \t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownRoad\">\n   \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"arrow-top\"></span>\n   \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li><a href=\"#\" data-type=\"area\">\u0423\u0447\u0430\u0441\u0442\u043A\u0438</a></li>\n   \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li><a href=\"#\" data-type=\"lots\">\u041B\u043E\u0442\u044B</a></li>\n   \t\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n   \t\t\t\t\t\t\t\t\t\t\t\t\t</div>";
		this.FormFooter = "<div class=\"filter-button\">\n\t\t\t\t\t\t\t\t<button class=\"refresh-button\">\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C</button>\n\t\t\t\t\t\t\t\t<button class=\"submit-button\">\u041D\u0430\u0439\u0442\u0438</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</form>";
		this.FormText = '';
		this.Bind = function () {
			var typeSearch = '';
			var areas = this.areaObject;
			var lots = this.lotsObject;
			var _this = this;

			$(this.wrapperFilter + " > form").bind('click', function (e) {
				var action = $(e.target).attr('id') ? $(e.target).attr('id') : $(e.target).attr('data-type');
				if (!!action) {
					//Обработка типа поиска
					if (action == 'lots') {
						typeSearch = lots;
						_this.render(typeSearch, 1);
					}

					if (action == 'area') {
						typeSearch = areas;
						_this.render(typeSearch, 1);
					}
				}
			});
		};
		this.onSelectChoose = function () {
			$(this.wrapperFilter + " li").on('click', function (e) {
				var target = e.target || window.target;
				var val = $(target).html();
				var filterBtn = $(this).parent().prev();
				filterBtn.html(val).prev().val(val);
			});
		};
		this.onRangeChoose = function () {
			// $('.range-box > input').on('input', function(e) {
			// 	var target = e.target || window.target;
			// 	var val = $(target).val();
			// 	var filterBtn = $(this).parent().parent().prev();
			// 	var valTarget = parseInt($(target).val());
		};
	}

	_createClass(Filter, [{
		key: "render",
		value: function render() {
			var typesearch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.areaObject;
			var reinit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


			if (reinit) {
				$(this.wrapperFilter).html(' ');
				this.FormText = '';
				console.log(1);
				console.log($(this.wrapperFilter));
			}

			if (!!typesearch.selects) {
				for (var key in typesearch.selects) {
					var select_obj = typesearch.selects[key][0];
					this.FormText += this.tmpSelect(select_obj);
				}
			}

			if (!!typesearch.ranges) {
				for (var _key in typesearch.ranges) {
					var range_obj = typesearch.ranges[_key][0];
					this.FormText += this.tmpRange(range_obj);
				}
			}

			$(this.wrapperFilter).html(this.FormHeader + ' ' + this.FormText + '' + this.FormFooter);
			this.Bind();
		}
	}, {
		key: "tmpSelect",
		value: function tmpSelect() {
			var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


			var tmp = null;
			var listStr = '';

			if (obj) {
				if (!!obj.values) {
					for (var value in obj.values) {
						var listItem = "<li><a href=\"#\">" + obj.values[value] + "</a></li>";
						listStr += listItem;
					}
					tmp = "<div class=\"dropdown\">\n\t\t\t\t\t\t\t<input type=\"text\" name=\"" + obj.name + "\" value=\"\" class=\"hidden\">\n\t\t\t\t\t\t\t<button class=\"btn btn-filter btn-lg dropdown-toggle\" type=\"button\" id=\"" + obj.name + "Dropdown\" data-placeholder=\"\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t\t\t\t\t\t" + obj.name_text + "\n\t\t\t\t\t\t\t\t<span class=\"my-caret\"></span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownRoad\">\n\t\t\t\t\t\t\t\t<span class=\"arrow-top\"></span>\n\t\t\t\t\t\t\t\t" + listStr + "\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>";
				}
			}

			return tmp;
		}
	}, {
		key: "tmpRange",
		value: function tmpRange() {
			var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


			var tmp = null;

			if (!!obj.values) {
				tmp = "<div class=\"dropdown\">\n\t\t\t\t\t\t<input type=\"text\" name=\"" + obj.name + "\" value=\"\" class=\"hidden\">\n\t\t\t\t\t\t<button class=\"btn btn-filter btn-lg dropdown-toggle\" type=\"button\" id=\"" + obj.name + "Dropdown\" data-placeholder=\"\u0423\u0434\u0430\u043B\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u043E\u0442 \u041C\u041A\u0410\u0414\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t\t\t\t\t" + obj.name_text + "\n\t\t\t\t\t\t\t<span class=\"my-caret\"></span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<div class=\"dropdown-menu\" aria-labelledby=\"" + obj.name + "Dropdown\">\n\t\t\t\t\t\t\t<span class=\"arrow-top\"></span>\n\t\t\t\t\t\t\t<div class=\"range-box\">\n\t\t\t\t\t\t\t\t<input type=\"number\" name=\"" + obj.name + "From\" id=\"" + obj.name + "-from\" placeholder=\"" + obj.min_text + " " + obj.values.min + " " + obj.type + "\">\n\t\t\t\t\t\t\t\t<input type=\"number\" name=\"" + obj.name + "Upto\" id=\"" + obj.name + "-up-to\" placeholder=\"" + obj.max_text + " " + obj.values.max + " " + obj.type + "\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>";
			}
			return tmp;
		}
	}]);

	return Filter;
}();

(function () {
	var Slider = function () {
		function Slider(elem, elemNav, elemName, itemsCount) {
			_classCallCheck(this, Slider);

			this.Toggler = '#' + elemName + '-button';
			this.SliderNav = '.' + elemName + '-slider-nav';
			this.Slider = $('[data-item="' + elem + '"]').owlCarousel({
				loop: true,
				margin: 1,
				items: itemsCount || 1,
				nav: true,
				navContainer: "." + elemNav,
				navText: ['', ''],
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true
			});
			//Initial state - hidden
			$(this.Slider).hide();
			$(this.SliderNav).hide();
		}

		_createClass(Slider, [{
			key: "initToggler",
			value: function initToggler(elemBtn) {
				$('#' + elemBtn).on('click', function () {
					var idx = $(this).attr('id');
					if ('#' + idx == SliderArea.Toggler) {
						SliderLot.hideSlider();
						SliderArea.showSlider();
					} else {
						SliderLot.showSlider();
						SliderArea.hideSlider();
					}
				});
			}
		}, {
			key: "onResize",
			value: function onResize() {
				$(this.Slider).owlCarousel({
					onResize: reloadItems
				});
				function reloadItems(e) {
					var items = e.item.count;
					console.log(items);
				}
			}
		}, {
			key: "activeStateSlider",
			value: function activeStateSlider() {
				$(this.Slider).show();
				$(this.SliderNav).show();
			}
		}, {
			key: "activeToggler",
			value: function activeToggler() {
				$(this.Toggler).addClass('success');
			}
		}, {
			key: "hideSlider",
			value: function hideSlider() {
				$(this.Toggler).removeClass('success');
				$(this.Slider).hide('drop', 'easeInQuad', 200, false);
				$(this.SliderNav).hide();
			}
		}, {
			key: "showSlider",
			value: function showSlider() {
				this.Slider.trigger('initialize.owl.carousel');
				$(this.Toggler).addClass('success');
				$(this.Slider).show('drop', 'easeInQuad', 200, false);
				$(this.SliderNav).show();
			}
		}]);

		return Slider;
	}();
	//SLIDERS INIT
	//Promo


	var filter = new Filter('.main-banner__filter');
	filter.render();
	filter.onSelectChoose();

	var SliderPromo = new Slider('promo-slider', 'promo-slider-nav');
	SliderPromo.activeStateSlider();
	//Area
	var SliderArea = new Slider('offer-area-slider', 'offer-area-slider-nav', 'offer-area', 4);
	SliderArea.activeStateSlider();
	SliderArea.activeToggler();
	SliderArea.initToggler('offer-area-button');
	//Lot
	var SliderLot = new Slider('offer-lot-slider', 'offer-lot-slider-nav', 'offer-lot', 4);
	SliderLot.initToggler('offer-lot-button');
})();

$(document).ready(function () {
	//Выпадающий баннер шапки
	var foldingHeader = $('.header__content');

	foldingHeader.addClass('opened');
	$(window).on('scroll', function () {
		foldingHeader.hide();
	});

	$(".fancybox").fancybox();

	var App = function App() {
		$('[data-phone="true"]').mask("+7 (999) 999-99-99");

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

		// Filter animation
		$('button[data-toggle="dropdown"]').on('click', function (e) {
			$(this).next().addClass('opened');
		});

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
	};
	App();
});