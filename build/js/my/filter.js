class Filter {  
	constructor(value,helper='area', type = 'area') {
		this.defaultType = type;
        this.defaultObject = this.getJsonObject(helper);
		this.wrapperFilter = value;
   		this.FormHeader = `<form action="" method="" id="filter" class="filter-form">`;
   		this.FormFooter = `<div class="filter-button">
								<button class="refresh-button" type="reset">Сбросить</button>
								<button class="submit-button" type="submit">Найти</button>
							</div>
							</form>`;
		this.FormText = '';
		this.bindObjInputs = [];
		this.PriceObjects = [];
	}
	CreatePriceObject(name){
		this.neme = name;
		this.textFrom = 0;
		this.textTo = 0;
		this.text = '';
	}
	render(typesearch = this.defaultObject, reinit = false){
		var objs = [];
		var inputIDX;
		var cnt = 0;
		for (var idx in typesearch){
			var givenObj = typesearch[idx];
			 if(!!!givenObj.default){
			 	for (var ids in givenObj){
			 		var innerObj = givenObj[ids];
					this.PriceObjects[cnt] = {
						name: innerObj[0].name,
						textFrom: 0,
		 				textTo: 0,
		 				text: '',
					}; 
			 		cnt++;
			 	}
			 }
		}
		if(reinit){
			$(this.wrapperFilter).html(''); 
			this.FormText = '';
		}
		if(!!typesearch.selects){

		 	for (let key in typesearch.selects){
		 		let select_obj = typesearch.selects[key][0];
		 		this.FormText += this.tmpSelect(select_obj);
		 	}
		 }
		 if(!!typesearch.ranges){
		 	for (let key in typesearch.ranges){
		 		let range_obj = typesearch.ranges[key][0];
		 		this.bindObjInputs.push(range_obj);
		 		this.FormText += this.tmpRange(range_obj);
		 	}
		 }

		$(this.wrapperFilter).html(this.FormHeader + ' ' + this.FormText + '' + this.FormFooter);
		this.Binds();
		this.BindListSelect();
		this.BindRangeInput(this.bindObjInputs);
	}
        
    Binds(){
        var _this = this;
        let searchObject = '';
		$(`${this.wrapperFilter} > form`).bind('click', function(e){
			let action = $(e.target).attr('id') ? $(e.target).attr('id') : $(e.target).attr('data-type');
			if(!!action){
                if(action == 'lots' || action == 'area'){
                    searchObject = _this.getJsonObject(action);
                    _this.render(searchObject,1);
                }
	 		}
		});
		$(`${this.wrapperFilter} > form`).find('.refresh-button').bind('click', function(e){
			_this.render(_this.defaultObject, 1);
		});
	}

	BindListSelect() {
		$(`${this.wrapperFilter} li`).on('click', function(e) {
			var target = e.target || window.target;
			var targetLi = $(target).parent();
			var val = $(target).html();
			var filterBtn = $(this).parent().prev();
			var refreshBtn = $('.refresh-button');

			targetLi.addClass('active');
			targetLi.siblings().removeClass('active');
			filterBtn.html(val + '<span class="my-caret"></span>').prev().val(val);
			if($(target).attr('data-type') == 'lots' || $(target).attr('data-type') == 'area') {
				refreshBtn.hide();
			} else {
				refreshBtn.show();
			}
			
		});
	}

	BindRangeInput(obj = false) {
		var ___this =  this;
		let _obj = obj;
		var textTo = '';
		var textFrom = '';
		var refreshBtn = $('.refresh-button');

		if (!!obj) {
			$(`${this.wrapperFilter}`).on('input', 'input', function(e) {

				var target = e.target || window.target;
				var valTarget = parseInt(Math.abs($(target).val()));
				var filterBtn = $(this).parent().parent().prev();
				var inputIDX = '';
				var inputText = '';
				var inputUnit = '';
				var ObjIDX = '';

				for (var idx in _obj) {
					var givenObj = _obj[idx];

					if($(target).attr('data-name') == `${givenObj.name}`){
						inputIDX = `${givenObj.name}`;
						inputUnit =  givenObj.type;

						for(var i in ___this.PriceObjects){
							if(givenObj.name == ___this.PriceObjects[i].name){
								ObjIDX = i;
							}
						}
					}
					
					if($(target).attr('id') == `${givenObj.name}-from`) {
							___this.PriceObjects[ObjIDX].textFrom = ___this.textCombinate('text-from', valTarget);
					} 

					if ($(target).attr('id') == `${givenObj.name}-up-to`) {
						___this.PriceObjects[ObjIDX].textTo = ___this.textCombinate('text-up-to', valTarget);
					}

					if(ObjIDX){
						var textInput = '';

						if(___this.PriceObjects[ObjIDX].textFrom){
							textInput += ___this.PriceObjects[ObjIDX].textFrom + ' ' + inputUnit + ' ';
						}

						if(___this.PriceObjects[ObjIDX].textTo){
							textInput += ___this.PriceObjects[ObjIDX].textTo + ' '+ inputUnit; 
						}
						
					
						if(!___this.PriceObjects[ObjIDX].textFrom && !___this.PriceObjects[ObjIDX].textTo && $(target).attr('data-name') == `${givenObj.name}` || !textInput && $(target).attr('data-name') == `${givenObj.name}`){
							textInput = `${givenObj.name_text} <span class="my-caret"></span>`;
						}

						if($(target).attr('data-name') == `${givenObj.name}`){
							inputIDX = `${givenObj.name}`;
							inputText = `${givenObj.name_text} <span class="my-caret"></span>`;
						}
					}
				}

				if(!textInput){
					$('#'+inputIDX+'Dropdown').html(inputText);
				}else{
					filterBtn.html(textInput);
				}
				refreshBtn.show();
			});
		}
	}



	textCombinate(idx,vals) {
		var result = false;

	 	if(idx == 'text-from'){
	 		var Text = 'от';
	 	}
	 	if(idx == 'text-up-to'){
			var Text = 'до';
		}
		if(!isNaN(vals) && vals && vals != 0){
	 			result = Text;
	 			result += ' ' + vals;
	 	}else{
	 		result = false;
	 	}
	 	return result;
	}
        
    getJsonObject(type){
        let urlJSON = '/assets/js/helpers/'+type+'.helper.json';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', urlJSON, false);
        xhr.send();
        if (xhr.status == 200) {
            return JSON.parse(xhr.responseText);
        }else{
            return false; 
        }
    }

	tmpSelect(obj = false){
		let tmp = '';
		let listStr = '';
		//ообрабтываешь гед параметры
		//при совпадении добавляешь нужнему li класс active (который стилизован в CSS) 
		let objValue = Object.keys(obj.values);

		if(obj){
			if (!!obj.values) {
				if (obj.name == 'type') {

					if(this.defaultType != 'none'){
						if (objValue[0] == 'area') {
						let listItem = `<li class="active"><a href="#" data-type="area" data-name="${obj.values['area']}">${obj.values['area']}</a></li>
										<li><a href="#" data-type="lots" data-name="${obj.values['lots']}">${obj.values['lots']}</a></li>`;
						listStr = listItem;
						} else if (objValue[0] == 'lots') {
							let listItem = `<li><a href="#" data-type="area" data-name="${obj.values['area']}">${obj.values['area']}</a></li>
											<li class="active"><a href="#" data-type="lots" data-name="${obj.values['lots']}">${obj.values['lots']}</a></li>`;
							listStr = listItem;
						}



					tmp = `<div class="dropdown">
								<input type="text" name="${obj.name}" value="${obj.name_text}" class="hidden">
								<button class="btn btn-filter btn-lg dropdown-toggle" type="button" id="${obj.name}Dropdown" data-placeholder="${obj.name_text}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									${obj.name_text}
									<span class="my-caret"></span>
								</button>
								<ul class="dropdown-menu" aria-labelledby="dropdownRoad">
									<span class="arrow-top"></span>
									${listStr}
								</ul>
							</div>`;
					}					
				} else {
					for (let value in obj.values) {
						let listItem = `<li><a href="#" data-name="${obj.values[value]}">${obj.values[value]}</a></li>`;
						listStr += listItem;
					}
					tmp = `<div class="dropdown">
								<input type="text" name="${obj.name}" value="" class="hidden">
								<button class="btn btn-filter btn-lg dropdown-toggle" type="button" id="${obj.name}Dropdown" data-placeholder="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									${obj.name_text}
									<span class="my-caret"></span>
								</button>
								<ul class="dropdown-menu" aria-labelledby="dropdownRoad">
									<span class="arrow-top"></span>
									${listStr}
								</ul>
							</div>`;
				}
			}
		}
		return tmp;
	}

	tmpRange(obj = false) {
		//ообрабтываешь гед параметры
		//при совпадении заносишь value согласно get параметрам в нужный шаблон
		//естественно добавить 2й шаблон рендера для отображение выбранного
		let tmp = null;

		if (!!obj.values) {
			tmp = `<div class="dropdown">
						<input type="text" name="${obj.name}" value="" class="hidden">
						<button class="btn btn-filter btn-lg dropdown-toggle" type="button" id="${obj.name}Dropdown" data-placeholder="Удаленность от МКАД" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							${obj.name_text}
						</button>
						<div class="dropdown-menu" aria-labelledby="${obj.name}Dropdown">
							<span class="arrow-top"></span>
							<div class="range-box">
								<input type="number" name="${obj.name}From" data-name="${obj.name}" id="${obj.name}-from" placeholder="${obj.min_text} ${obj.values.min}">
								<span> - </span>
								<input type="number" name="${obj.name}Upto" data-name="${obj.name}" id="${obj.name}-up-to" placeholder="${obj.max_text} ${obj.values.max}">
								<span>${obj.type}</span>
							</div>
						</div>
					</div>`;
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
}