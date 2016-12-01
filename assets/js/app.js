'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function () {
	function Filter(value) {
		var helper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'area';
		var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'area';

		_classCallCheck(this, Filter);

		this.defaultType = type;
		this.defaultObject = this.getJsonObject(helper);
		this.wrapperFilter = value;
		this.FormHeader = '<form action="" method="" id="filter" class="filter-form">';
		this.FormFooter = '<div class="filter-button">\n\t\t\t\t\t\t\t\t<button class="refresh-button" type="reset">\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C</button>\n\t\t\t\t\t\t\t\t<button class="submit-button" type="submit">\u041D\u0430\u0439\u0442\u0438</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</form>';
		this.FormText = '';
		this.bindObjInputs = [];
		this.PriceObjects = [];
	}

	_createClass(Filter, [{
		key: 'CreatePriceObject',
		value: function CreatePriceObject(name) {
			this.neme = name;
			this.textFrom = 0;
			this.textTo = 0;
			this.text = '';
		}
	}, {
		key: 'render',
		value: function render() {
			var typesearch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultObject;
			var reinit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var objs = [];
			var inputIDX;
			var cnt = 0;
			for (var idx in typesearch) {
				var givenObj = typesearch[idx];
				if (!!!givenObj.default) {
					for (var ids in givenObj) {
						var innerObj = givenObj[ids];
						this.PriceObjects[cnt] = {
							name: innerObj[0].name,
							textFrom: 0,
							textTo: 0,
							text: ''
						};
						cnt++;
					}
				}
			}
			if (reinit) {
				$(this.wrapperFilter).html('');
				this.FormText = '';
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
					this.bindObjInputs.push(range_obj);
					this.FormText += this.tmpRange(range_obj);
				}
			}

			$(this.wrapperFilter).html(this.FormHeader + ' ' + this.FormText + '' + this.FormFooter);
			this.Binds();
			this.BindListSelect();
			this.BindRangeInput(this.bindObjInputs);
		}
	}, {
		key: 'Binds',
		value: function Binds() {
			var _this = this;
			var searchObject = '';
			$(this.wrapperFilter + ' > form').bind('click', function (e) {
				var action = $(e.target).attr('id') ? $(e.target).attr('id') : $(e.target).attr('data-type');
				if (!!action) {
					if (action == 'lots' || action == 'area') {
						searchObject = _this.getJsonObject(action);
						_this.render(searchObject, 1);
					}
				}
			});
			$(this.wrapperFilter + ' > form').find('.refresh-button').bind('click', function (e) {
				_this.render(_this.defaultObject, 1);
			});
		}
	}, {
		key: 'BindListSelect',
		value: function BindListSelect() {
			$(this.wrapperFilter + ' li').on('click', function (e) {
				var target = e.target || window.target;
				var targetLi = $(target).parent();
				var val = $(target).html();
				var filterBtn = $(this).parent().prev();
				var refreshBtn = $('.refresh-button');

				targetLi.addClass('active');
				targetLi.siblings().removeClass('active');
				filterBtn.html(val + '<span class="my-caret"></span>').prev().val(val);
				if ($(target).attr('data-type') == 'lots' || $(target).attr('data-type') == 'area') {
					refreshBtn.hide();
				} else {
					refreshBtn.show();
				}
			});
		}
	}, {
		key: 'BindRangeInput',
		value: function BindRangeInput() {
			var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var ___this = this;
			var _obj = obj;
			var textTo = '';
			var textFrom = '';
			var refreshBtn = $('.refresh-button');

			if (!!obj) {
				$('' + this.wrapperFilter).on('input', 'input', function (e) {

					var target = e.target || window.target;
					var valTarget = parseInt(Math.abs($(target).val()));
					var filterBtn = $(this).parent().parent().prev();
					var inputIDX = '';
					var inputText = '';
					var inputUnit = '';
					var ObjIDX = '';

					for (var idx in _obj) {
						var givenObj = _obj[idx];

						if ($(target).attr('data-name') == '' + givenObj.name) {
							inputIDX = '' + givenObj.name;
							inputUnit = givenObj.type;

							for (var i in ___this.PriceObjects) {
								if (givenObj.name == ___this.PriceObjects[i].name) {
									ObjIDX = i;
								}
							}
						}

						if ($(target).attr('id') == givenObj.name + '-from') {
							___this.PriceObjects[ObjIDX].textFrom = ___this.textCombinate('text-from', valTarget);
						}

						if ($(target).attr('id') == givenObj.name + '-up-to') {
							___this.PriceObjects[ObjIDX].textTo = ___this.textCombinate('text-up-to', valTarget);
						}

						if (ObjIDX) {
							var textInput = '';

							if (___this.PriceObjects[ObjIDX].textFrom) {
								textInput += ___this.PriceObjects[ObjIDX].textFrom + ' ' + inputUnit + ' ';
							}

							if (___this.PriceObjects[ObjIDX].textTo) {
								textInput += ___this.PriceObjects[ObjIDX].textTo + ' ' + inputUnit;
							}

							if (!___this.PriceObjects[ObjIDX].textFrom && !___this.PriceObjects[ObjIDX].textTo && $(target).attr('data-name') == '' + givenObj.name || !textInput && $(target).attr('data-name') == '' + givenObj.name) {
								textInput = givenObj.name_text + ' <span class="my-caret"></span>';
							}

							if ($(target).attr('data-name') == '' + givenObj.name) {
								inputIDX = '' + givenObj.name;
								inputText = givenObj.name_text + ' <span class="my-caret"></span>';
							}
						}
					}

					if (!textInput) {
						$('#' + inputIDX + 'Dropdown').html(inputText);
					} else {
						filterBtn.html(textInput);
					}
					refreshBtn.show();
				});
			}
		}
	}, {
		key: 'textCombinate',
		value: function textCombinate(idx, vals) {
			var result = false;

			if (idx == 'text-from') {
				var Text = 'от';
			}
			if (idx == 'text-up-to') {
				var Text = 'до';
			}
			if (!isNaN(vals) && vals && vals != 0) {
				result = Text;
				result += ' ' + vals;
			} else {
				result = false;
			}
			return result;
		}
	}, {
		key: 'getJsonObject',
		value: function getJsonObject(type) {
			var urlJSON = '/assets/js/helpers/' + type + '.helper.json';
			var xhr = new XMLHttpRequest();
			xhr.open('GET', urlJSON, false);
			xhr.send();
			if (xhr.status == 200) {
				return JSON.parse(xhr.responseText);
			} else {
				return false;
			}
		}
	}, {
		key: 'tmpSelect',
		value: function tmpSelect() {
			var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var tmp = '';
			var listStr = '';
			//ообрабтываешь гед параметры
			//при совпадении добавляешь нужнему li класс active (который стилизован в CSS) 
			var objValue = Object.keys(obj.values);

			if (obj) {
				if (!!obj.values) {
					if (obj.name == 'type') {

						if (this.defaultType != 'none') {
							if (objValue[0] == 'area') {
								var listItem = '<li class="active"><a href="#" data-type="area" data-name="' + obj.values['area'] + '">' + obj.values['area'] + '</a></li>\n\t\t\t\t\t\t\t\t\t\t<li><a href="#" data-type="lots" data-name="' + obj.values['lots'] + '">' + obj.values['lots'] + '</a></li>';
								listStr = listItem;
							} else if (objValue[0] == 'lots') {
								var _listItem = '<li><a href="#" data-type="area" data-name="' + obj.values['area'] + '">' + obj.values['area'] + '</a></li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="active"><a href="#" data-type="lots" data-name="' + obj.values['lots'] + '">' + obj.values['lots'] + '</a></li>';
								listStr = _listItem;
							}

							tmp = '<div class="dropdown">\n\t\t\t\t\t\t\t\t<input type="text" name="' + obj.name + '" value="' + obj.name_text + '" class="hidden">\n\t\t\t\t\t\t\t\t<button class="btn btn-filter btn-lg dropdown-toggle" type="button" id="' + obj.name + 'Dropdown" data-placeholder="' + obj.name_text + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n\t\t\t\t\t\t\t\t\t' + obj.name_text + '\n\t\t\t\t\t\t\t\t\t<span class="my-caret"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<ul class="dropdown-menu" aria-labelledby="dropdownRoad">\n\t\t\t\t\t\t\t\t\t<span class="arrow-top"></span>\n\t\t\t\t\t\t\t\t\t' + listStr + '\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>';
						}
					} else {
						for (var value in obj.values) {
							var _listItem2 = '<li><a href="#" data-name="' + obj.values[value] + '">' + obj.values[value] + '</a></li>';
							listStr += _listItem2;
						}
						tmp = '<div class="dropdown">\n\t\t\t\t\t\t\t\t<input type="text" name="' + obj.name + '" value="" class="hidden">\n\t\t\t\t\t\t\t\t<button class="btn btn-filter btn-lg dropdown-toggle" type="button" id="' + obj.name + 'Dropdown" data-placeholder="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n\t\t\t\t\t\t\t\t\t' + obj.name_text + '\n\t\t\t\t\t\t\t\t\t<span class="my-caret"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<ul class="dropdown-menu" aria-labelledby="dropdownRoad">\n\t\t\t\t\t\t\t\t\t<span class="arrow-top"></span>\n\t\t\t\t\t\t\t\t\t' + listStr + '\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>';
					}
				}
			}
			return tmp;
		}
	}, {
		key: 'tmpRange',
		value: function tmpRange() {
			var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			//ообрабтываешь гед параметры
			//при совпадении заносишь value согласно get параметрам в нужный шаблон
			//естественно добавить 2й шаблон рендера для отображение выбранного
			var tmp = null;

			if (!!obj.values) {
				tmp = '<div class="dropdown">\n\t\t\t\t\t\t<input type="text" name="' + obj.name + '" value="" class="hidden">\n\t\t\t\t\t\t<button class="btn btn-filter btn-lg dropdown-toggle" type="button" id="' + obj.name + 'Dropdown" data-placeholder="\u0423\u0434\u0430\u043B\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u043E\u0442 \u041C\u041A\u0410\u0414" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n\t\t\t\t\t\t\t' + obj.name_text + '\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<div class="dropdown-menu" aria-labelledby="' + obj.name + 'Dropdown">\n\t\t\t\t\t\t\t<span class="arrow-top"></span>\n\t\t\t\t\t\t\t<div class="range-box">\n\t\t\t\t\t\t\t\t<input type="number" name="' + obj.name + 'From" data-name="' + obj.name + '" id="' + obj.name + '-from" placeholder="' + obj.min_text + ' ' + obj.values.min + '">\n\t\t\t\t\t\t\t\t<span> - </span>\n\t\t\t\t\t\t\t\t<input type="number" name="' + obj.name + 'Upto" data-name="' + obj.name + '" id="' + obj.name + '-up-to" placeholder="' + obj.max_text + ' ' + obj.values.max + '">\n\t\t\t\t\t\t\t\t<span>' + obj.type + '</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>';
			}
			return tmp;
		}

		// 	resetForm() {
		// 		let _this = this;
		// 		$(`${this.wrapperFilter} > form`).bind('click', '.refresh-button', function(e){
		// 			console.log('here');
		// 			let target = e.target || window.target;
		// 			_this.render(this.defaultObject, 1);
		// 		});
		// 	}

	}]);

	return Filter;
}();

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
			navContainer: '.' + elemNav,
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
		key: 'initToggler',
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
		key: 'onResize',
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
		key: 'activeStateSlider',
		value: function activeStateSlider() {
			$(this.Slider).show();
			$(this.SliderNav).show();
		}
	}, {
		key: 'activeToggler',
		value: function activeToggler() {
			$(this.Toggler).addClass('success');
		}
	}, {
		key: 'hideSlider',
		value: function hideSlider() {
			$(this.Toggler).removeClass('success');
			$(this.Slider).hide('drop', 'easeInQuad', 200, false);
			$(this.SliderNav).hide();
		}
	}, {
		key: 'showSlider',
		value: function showSlider() {
			this.Slider.trigger('initialize.owl.carousel');
			$(this.Toggler).addClass('success');
			$(this.Slider).show('drop', 'easeInQuad', 200, false);
			$(this.SliderNav).show();
		}
	}]);

	return Slider;
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
				navContainer: '.' + elemNav,
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
			key: 'initToggler',
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
			key: 'onResize',
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
			key: 'activeStateSlider',
			value: function activeStateSlider() {
				$(this.Slider).show();
				$(this.SliderNav).show();
			}
		}, {
			key: 'activeToggler',
			value: function activeToggler() {
				$(this.Toggler).addClass('success');
			}
		}, {
			key: 'hideSlider',
			value: function hideSlider() {
				$(this.Toggler).removeClass('success');
				$(this.Slider).hide('drop', 'easeInQuad', 200, false);
				$(this.SliderNav).hide();
			}
		}, {
			key: 'showSlider',
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
	//Details
	var SliderDetail = new Slider('details-slider', 'details-slider-nav');
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

$(document).ready(function () {
	//Выпадающий баннер шапки
	var foldingHeader = $('.header__content');

	foldingHeader.addClass('opened');
	$(window).on('scroll', function () {
		foldingHeader.hide();
	});

	$(".fancybox").fancybox();

	// Filter animation
	$(document).on('click', '[data-toggle="dropdown"]', function (e) {
		//Add folding menu animation
		$(this).next().addClass('opened');
		//Reset all the carets in filter
		$(this).parent().siblings('.dropdown').children('button').children('.my-caret').removeClass('animated');
		//Add caret rotation animation
		if ($(this).attr('aria-expanded') == 'true') {
			$(this).children('.my-caret').addClass('animated');
		} else {
			$(this).children('.my-caret').removeClass('animated');
		}
	});

	//Cards show phone functionality
	$(document).on('click', '[data-phone-link]', function (e) {
		$(this).hide(); //Hide pop-up "Show phone number"
		$(this).prev().hide(); //Hide shorten phone number
		$(this).next().show(); //Show full phone number
		$(this).parent().css('border', 0); //Delete borders of rounded parent button
	});

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
	};
	App();
});