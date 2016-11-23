//=include ./helpers/area.helper.js
//=include ./helpers/lot.helper.js
class Filter {  
	constructor(value) {
		this.areaObject = searchAreasHelpers;
		this.lotsObject = searchLotHelpers;
		this.wrapperFilter = value;
   		this.FormHeader = `<form action="" method="" id="filter" class="filter-form">
   							<div class="dropdown">
   														<input type="text" name="type" id="typeSearch" value="area" class="hidden">
   														<button class="btn btn-filter btn-lg dropdown-toggle" type="button" id="typeDropdown" data-placeholder="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Участки<span class="my-caret"></span>
   														</button>
   														<ul class="dropdown-menu" aria-labelledby="dropdownRoad">
   															<span class="arrow-top"></span>
   															<li><a href="#" data-type="area">Участки</a></li>
   															<li><a href="#" data-type="lots">Лоты</a></li>
   														</ul>
   													</div>`;
   		this.FormFooter = `<div class="filter-button">
								<button class="refresh-button">Сбросить</button>
								<button class="submit-button">Найти</button>
							</div>
							</form>`;
		this.FormText = '';
		this.Bind = function(){
			var typeSearch = '';
			let areas = this.areaObject
			let lots = this.lotsObject
			var _this = this;

			$(`${this.wrapperFilter} > form`).bind('click',function(e){
				let action = $(e.target).attr('id') ? $(e.target).attr('id') : $(e.target).attr('data-type');
				if(!!action){
		 		//Обработка типа поиска
			 		if(action == 'lots'){
			 			typeSearch = lots;
			 			_this.render(typeSearch,1);
			 		}

			 		if(action == 'area'){
			 			typeSearch = areas;
			 			_this.render(typeSearch,1);
			 		}
		 		}
			});
		};
		this.onSelectChoose = function() {
			$(`${this.wrapperFilter} li`).on('click', function(e) {
				var target = e.target || window.target;
				var val = $(target).html();
				var filterBtn = $(this).parent().prev();
				filterBtn.html(val).prev().val(val);
			});
		};
		this.onRangeChoose = function() {
			// $('.range-box > input').on('input', function(e) {
			// 	var target = e.target || window.target;
			// 	var val = $(target).val();
			// 	var filterBtn = $(this).parent().parent().prev();
			// 	var valTarget = parseInt($(target).val());
		}
	}
	
		

		

	render(typesearch = this.areaObject, reinit = false){

		if(reinit){
			$(this.wrapperFilter).html(' ');
			this.FormText = '';
			console.log(1);
			console.log($(this.wrapperFilter));
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
		 		this.FormText += this.tmpRange(range_obj);
		 	}
		 }

		 $(this.wrapperFilter).html(this.FormHeader + ' ' + this.FormText + '' + this.FormFooter);
		 this.Bind();

	}




	
	tmpSelect(obj = false){
		
		let tmp = null;
		let listStr = '';

		if(obj){
			if (!!obj.values) {
				for (let value in obj.values) {
					let listItem = `<li><a href="#">${obj.values[value]}</a></li>`;
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
		
		return tmp;
	}

	tmpRange(obj = false) {
	
		let tmp = null;

		if (!!obj.values) {
			tmp = `<div class="dropdown">
						<input type="text" name="${obj.name}" value="" class="hidden">
						<button class="btn btn-filter btn-lg dropdown-toggle" type="button" id="${obj.name}Dropdown" data-placeholder="Удаленность от МКАД" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							${obj.name_text}
							<span class="my-caret"></span>
						</button>
						<div class="dropdown-menu" aria-labelledby="${obj.name}Dropdown">
							<span class="arrow-top"></span>
							<div class="range-box">
								<input type="number" name="${obj.name}From" id="${obj.name}-from" placeholder="${obj.min_text} ${obj.values.min} ${obj.type}">
								<input type="number" name="${obj.name}Upto" id="${obj.name}-up-to" placeholder="${obj.max_text} ${obj.values.max} ${obj.type}">
							</div>
						</div>
					</div>`;
		}
		return tmp;
	}
	
}