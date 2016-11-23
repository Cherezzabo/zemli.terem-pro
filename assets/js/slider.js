'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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