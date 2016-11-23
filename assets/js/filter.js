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