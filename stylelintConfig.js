var config = {
	"rules": {
		"at-rule-empty-line-before": [ "always", {
		      except: [
		        "all-nested",
		        "blockless-group"
		      ],
		      ignore: ["after-comment"],
		    } ], //Пустая строка перед @правилом, кроме вложенных блоков
		"at-rule-name-case": "lower", //Только строчные символы для @правил
		"at-rule-name-space-after": "always", //Пробел после @правила
		"at-rule-semicolon-newline-after": "always", //Обязательна новая строка после ;
		"block-opening-brace-space-before": "always", //Обязателен пробел перед {
		"block-opening-brace-newline-after": "always", //Обязательна новая строка после {
		"block-closing-brace-empty-line-before": "never", //Запрет пустых строк перед }
		"block-closing-brace-newline-before": "always", //Обязательна строка перед } 
		"block-closing-brace-newline-after": "always", //Обязательна строка после }
		"block-no-empty": true, //Запрет на пустой блок
		"block-no-single-line": true, //Запрет одностроковых блоков
		"color-no-invalid-hex": true, //Запрет на ошибки в hex цветах
		"color-hex-case": "lower", //Цвета hex строчными символами
	    // "color-hex-length": "short", //Цвета hex укороченной записью (#fff)
	    // "comment-empty-line-before": [ "always", {
	    //   except: ["first-nested"],
	    //   ignore: ["stylelint-commands"],
	    // } ],
	    "comment-no-empty": true, //Запрет пустых комментариев
	    "comment-whitespace-inside": "always", //Пробельный отступ внутри блока комментариев
	    "custom-property-empty-line-before": [ "always", {
	      except: [
	        "after-custom-property",
	        "first-nested",
	      ],
	      ignore: [
	        "after-comment",
	        "inside-single-line-block",
	      ],
	    } ],
	    "declaration-bang-space-after": "never", //Запрет пробела после ! в !important
	    "declaration-bang-space-before": "always", //Пробел перед ! в !important
	    "declaration-block-no-duplicate-properties": [ true, {
	      ignore: ["consecutive-duplicates-with-different-values"],
	    } ], //Запрет повторяющихся свойств в блоке, исключая разные значения
	    "declaration-block-no-ignored-properties": true, //Запрет взаимоисключающих свойств
	    // "declaration-block-no-redundant-longhand-properties": true, //Запрет длинных специфичных свойств (e.x. padding-top)
	    "declaration-block-no-shorthand-property-overrides": true, //Запрет перезаписи значений длинных свойств короткими свойствами (сначала писать общие, потом конкретные)
	    "declaration-block-semicolon-newline-after": "always", //Новая строка после каждой ;
	    "declaration-block-semicolon-space-after": "always-single-line", //Пробел после ; в строчной записи
	    "declaration-block-semicolon-space-before": "never", //Запрет пробела перед ;
	    "declaration-block-single-line-max-declarations": 1, //Кол-во возможных свойств в строчной записи
	    "declaration-block-trailing-semicolon": "always", //Обязательна ; в строчной записи
	    "declaration-colon-newline-after": "always-multi-line", //Новая строка после : в длинной записи значений свойств (запись столбцом)
	    "declaration-colon-space-after": "always-single-line", //Пробел после : и ,
	    "declaration-colon-space-before": "never", //Запрет пробела перед : и ,
	    // "declaration-empty-line-before": [ "always", { //Форматирование для записи свойств столбиком без лишних строк
	    //   except: [
	    //     "after-declaration",
	    //     "first-nested",
	    //   ],
	    //   ignore: [
	    //     "after-comment",
	    //     "inside-single-line-block",
	    //   ],
	    // } ],
	    "function-calc-no-unspaced-operator": true, //Обязательное выделение операторов пробелами в calc()
	    "function-comma-newline-after": "always-multi-line", //Обязательна новая строка после , в многострочной записи функциях
	    "function-comma-space-after": "always-single-line", //Обязателен пробел после , в однострочной записи функций
	    "function-comma-space-before": "never", //Запрет пробела перед , в функциях
	    "function-linear-gradient-no-nonstandard-direction": true, //Запрет невалидных значений в свойствах градиента
	    "function-max-empty-lines": 0, //Кол-во допустимых пустых строк в функциях
	    "function-name-case": "lower", //Название функций строчными символами
	    "function-parentheses-newline-inside": "always-multi-line", //Обязательна новая строка при записи значений функции в столбик
	    "function-parentheses-space-inside": "never-single-line", //Запрет пробелов после ( и перед ) в записи значений функции в строку
	    "function-whitespace-after": "always", //Обязательный пробел после функции
	    "function-url-quotes": "always", //Ссылки в функциях заключаются в ковычки
	    "indentation": "tab", //Отступ в пробелах ("tab", если нужна табуляция)
	    "keyframe-declaration-no-important": true, //Запрет использования !important в @keyframes
	    "length-zero-no-unit": true, //Запрет нулевых значений свойств с указанием ед. (0px => 0)
	    "max-empty-lines": 1, //Макс. кол-во пустых строк
	    "max-nesting-depth": 5, //Макс. глубина вложенности блоков
	    "media-feature-colon-space-after": "always", //Пробел после : в медиа
	    "media-feature-colon-space-before": "never", //Запрет пробела перед : в медиа
	    "media-feature-name-case": "lower", //Название медиа свойств строчными символами
	    "media-feature-name-no-unknown": true, //Запрет использования неизвестных медиа свойств
	    "media-feature-no-missing-punctuation": true, //Запрет пропуска пунктуации в медиа свойствах
	    "media-feature-parentheses-space-inside": "never", //Запрет пробелов после ( и перед ) в записи медиа свойств
	    "media-feature-range-operator-space-after": "always", //Пробел после оператора (>=) в медиа свойстве
	    "media-feature-range-operator-space-before": "always", //Пробел перед оператором (>=) в медиа свойстве
	    "media-query-list-comma-newline-after": "always-multi-line", //Новая строка после , если используется блочная запись медиа свойств
	    "media-query-list-comma-space-after": "always-single-line", //Пробел после , если используется строчная запись медиа свойств
	    "media-query-list-comma-space-before": "never", //Запрет пробела перед , в медиа свойствах
	    // "no-browser-hacks": true, //Запрет костылей и хаков
	    "no-empty-source": true, //Запрет пустых источников
	    "no-eol-whitespace": true, //Запрет пробелов в конце строки
	    "no-extra-semicolons": true, //Запрет лишних ;
	    // "no-indistinguishable-colors": true, //Запрет использования очень похожих цветов
	    "no-invalid-double-slash-comments": true, //Запрет использования // для комментариев внутри CSS
	    // "no-descending-specificity": true, //Запрет перезаписи селекторов большей конкретизации селекторами меньшей конкретизации
	    // "no-missing-end-of-source-newline": true, //Обязательно указание конца сорса (\n)
	    "number-leading-zero": "never", //Обязателен 0 в дробных значениях (0.5)
	    "number-no-trailing-zeros": true, //Запрет лишних 0 в дробных значениях (1.01000px)
	    "property-case": "lower", //Запись свойств строчными символами
	    "property-no-unknown": true, //Запрет неизвестных свойств
	    "property-no-vendor-prefix": true, //Запрет префиксов
	    "rule-nested-empty-line-before": [ "never-multi-line", { //Форматирование для записи вложенных свойств столбиком без лишних строк
	      ignore: ["after-comment"],
	    } ],
	    // "rule-non-nested-empty-line-before": [ "never-multi-line", {
	    //   ignore: ["after-comment"],
	    // } ],
	    "selector-attribute-brackets-space-inside": "never", //Запрет пробелов внутри селектора ([target])
	    "selector-attribute-operator-space-after": "never", //Запрет пробела после оператора = в селекторах ([target=_blank])
	    "selector-attribute-operator-space-before": "never", //Запрет пробела перед оператором = в селекторах
	    "selector-combinator-space-after": "always", //Пробел после комбинаторных операторов селекторов
	    "selector-combinator-space-before": "always", //Пробел перед комбинаторных операторов селекторов
	    "selector-descendant-combinator-no-non-space": true, //Только пробел между соседними селекторами
	    "selector-list-comma-newline-after": "always", //Новая строка после , в списке селекторов
	    "selector-list-comma-space-before": "never", //Запрет пробела перед , в списке селекторов
	    "selector-max-empty-lines": 0, //Кол-во допустимых пустых строк между селекторами
	    "selector-no-empty": true, //Запрет пустых селекторов ( a, , b {})
	    "selector-pseudo-class-case": "lower", //Запись псевдо-классов строчными символами
	    "selector-pseudo-class-no-unknown": true, //Запрет неизвестных псевдо-классов
	    "selector-pseudo-class-parentheses-space-inside": "never", //Запрет пробелов внутри () псевдо-классов
	    "selector-pseudo-element-case": "lower", //Запись псевдо-элементов строчными символами
	    "selector-pseudo-element-colon-notation": "double", //Псевдо-элементы оформляются двойным двоеточем (::before) 
	    "selector-pseudo-element-no-unknown": true, //Запрет неизвестных псевдо-элементов
	    "selector-type-case": "lower", //Запись селекторов строчными символами
	    "selector-type-no-unknown": true, //Запрет неизвестных селекторов
	    // "selector-no-id": true, //Запрет #id в качестве селекторов
	    "shorthand-property-no-redundant-values": true, //Запрет сокращенной записи значений свойств (a { padding: 1px 2px 1px; })
	    "string-quotes": "double", //Строки заключаются в ""
	    "unit-case": "lower", //Запись ед. строчными символами 
	    "string-no-newline": true, //Запрет новых линий в "строках"
		"time-no-imperceptible": true, //Запрет на анимацию меньше 100мс		
	    "unit-no-unknown": true, //Запрет неизвестных ед.
	    "value-list-comma-newline-after": "always-multi-line", //Новая строка после , если значения свойства записаны в столбик
	    "value-list-comma-space-after": "always-single-line", //Пробел после , если значения свойства записаны в строку
	    "value-list-comma-space-before": "never", //Запрет пробела перед , при множестве значений свойства
	    "value-list-max-empty-lines": 0 //Кол-во допустимых пустых строк значениями свойства
	}
}

module.exports = config;