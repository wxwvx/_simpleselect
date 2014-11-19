$.fn.simpleSelect = function(){
	var $this = $(this);

	$this.each(function(){
		var $this = $(this),
			currentClasses = $this.attr('class'),
			markup = '<div class="selectbox ' + currentClasses +'"></div>';

		$this.css({
			'position'  : 'absolute',
			'left'      : '-9999px'
		}).wrap(markup);

		var container = $this.closest('.selectbox'),
			structure = '<div class="selectbox__inner">' +
				'<div class="selectbox__display">' +
				'<div class="selectbox__display-title">' +
				'<div class="selectbox__title-text"></div>' +
				'</div>' +
					'<div class="selectbox__display-btn">' +
						'<div class="selectbox__btn-icon"></div>' +
					'</div>' +
				'</div>' +
				'<div class="selectbox__dropdown">' +
				'<ul class="selectbox__dropdown-list"></ul>' +
				'</div>' +
				'</div>';

		container.append(structure);

		var options = $this.find('option'),
			dropdown = container.find('.selectbox__dropdown-list');

		options.each(function(){
			var $this = $(this),
				label = $this.text();

			var itemHtml = '<li class="selectbox__dropdown-item">' +
				'<span class="selectbox__item-link">'+ label +'</span>' +
				'</li>';

			dropdown.append(itemHtml);
		});

		var selected    = container.find('option:selected'),
			display     = container.find('.selectbox__display'),
			displayText = display.find('.selectbox__title-text');

		var firstSelectedOption = container.find('.selectbox__dropdown-list .selectbox__dropdown-item').eq(selected.index());

		firstSelectedOption.addClass('selected');

		displayText.text(selected.text());

		display.on('click', function(){
			var $this = $(this),
				container = $this.closest('.selectbox'),
				openedCount = $('body .selectbox.opened').length;

			if (container.hasClass('opened')) {
				container.removeClass('opened');

			} else {
				if (openedCount > 0) {
					$('body .selectbox.opened').removeClass('opened');
				}
				container.addClass('opened');
			}
		});
	});

	$('body').on('click', '.selectbox__item-link',  function(){
		var $this       = $(this),
			container   = $this.closest('.selectbox'),
			displayText = container.find('.selectbox__title-text'),
			dropdown	= $this.closest('.selectbox__dropdown-list'),
			optionItems = dropdown.find('.selectbox__dropdown-item'),
			option      = $this.closest('.selectbox__dropdown-item'),
			curOption   = option.index(),
			options     = container.find('option'),
			label       = $this.text();

		if (!option.hasClass('selected')) {

			optionItems.removeClass('selected');
			option.addClass('selected');

			options.each(function(){
				var $this = this;

				if ($this.index === curOption) {
					$this.selected = true;
				} else {
					$this.selected = false;
				}
			});

			displayText.text(label);
			container.find('select').trigger('change');
		}

		container.removeClass('opened');

	});

	$(document).on('click', function(e){
		var $this = $(e.target),
			container = $this.closest('.selectbox');

		if (!container.hasClass('opened') && !$(e.target).closest('.selectbox__dropdown').length) {
			$('.selectbox').removeClass('opened');
		}
	});
}
