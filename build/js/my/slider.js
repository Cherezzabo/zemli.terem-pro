class Slider {
	constructor(elem, elemNav, elemName, itemsCount) {
		this.Toggler = '#'+elemName+'-button';
		this.SliderNav = '.'+elemName+'-slider-nav';
		this.Slider = $('[data-item="'+elem+'"]').owlCarousel({
			loop: true,
			margin: 1,
			items: itemsCount || 1,
			nav: true,
			navContainer: `.${elemNav}`,
			navText: ['',''],
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true
		});
		//Initial state - hidden
		$(this.Slider).hide();
		$(this.SliderNav).hide(); 
	}

	initToggler(elemBtn) {
		$('#'+elemBtn).on('click', function() {
			let idx = $(this).attr('id');
			if('#'+idx == SliderArea.Toggler) {
				SliderLot.hideSlider();
				SliderArea.showSlider();
			} else {
				SliderLot.showSlider();
				SliderArea.hideSlider();
			}
		});
	}

	onResize() {
		$(this.Slider).owlCarousel({
			onResize: reloadItems
		})
		function reloadItems(e) {
			var items = e.item.count;
			console.log(items);
		}
	}

	activeStateSlider() {
		$(this.Slider).show();
		$(this.SliderNav).show(); 
	}

	activeToggler() {
		$(this.Toggler).addClass('success');
	}

	hideSlider() {
		$(this.Toggler).removeClass('success');
		$(this.Slider).hide('drop', 'easeInQuad', 200, false);
		$(this.SliderNav).hide();
	}
	
	showSlider() {
		this.Slider.trigger('initialize.owl.carousel');
		$(this.Toggler).addClass('success');
		$(this.Slider).show('drop', 'easeInQuad', 200, false);
		$(this.SliderNav).show();
	}
}