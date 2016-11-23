const searchAreasHelpers = {
   "url": {
      "default": "/area/"
   },
   "selects":{
   		"select1":[{
   			"name": "road",
   			"name_text": "Шоссе",
   			"values":{
   				"v1":"Можайское шоссе",
   				"v2":"Киевское шоссе",
   				"v3":"Разянское шоссе"
   			}
   		}]
   },
   "ranges": {
   		"range1":[{
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
   		"range2":[{
   			"name": "area",
   			"name_text": "Размер",
   			"type": "м",
   			"min_text": "от",
   			"max_text": "до",
   			"values":{
   				"min": 6,
   				"max": 10
   			}
   		}],
   		"range3":[{
   			"name": "price",
   			"name_text": "Цена",
   			"type": "р.",
   			"min_text": "от",
   			"max_text": "до",
   			"values":{
   				"min": 100000,
   				"max": 3000000
   			}
   		}]  		
   }
}