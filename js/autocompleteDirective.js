// File: autocompleteDirective.js
// Author: Pat Migliaccio (github.com/pmigliaccio)
// Last Revised: 6/3/16

(function () {
    'use strict';

    var app = angular.module('MyApp');
	
	//autocomplete directive
    app.directive('autoComplete', ['dataService', function (dataService) {
        return {
            restrict: 'A',
            require: 'ngModel', //requires an ngModel value on the input field
            link: function (scope, elem, attrs, ctrl) {

                dataService.getStaticData()	//.getData() for Ajax service call
                    .then(function (data) {
                        if (typeof data !== "undefined" && data != null){
                            $(elem).devbridgeAutocomplete({
                                lookup: $.map(data, function (object) {
                                    return { value: object.value, data: object }; //value parameter will update the autocomplete field
                                }),
                                //updates on field selection
                                onSelect: function () {
                                    update();
                                },
                                //if not an autocomplete option, empties field
                                onInvalidateSelection: function () {
                                    $(this).val('');
                                }
                            });  
                        }
                    });

				//updates only on loss of field focus
                elem.off('input keydown change');
                elem.on('blur', function () {
                    update();
                });
				
				//updates the model
                var update = function () {
                    var value = elem[0].value;

                    scope.$apply(function () {
                        ctrl.$setViewValue(value);
                        ctrl.$render();
                    });
                };
            }
        };
    }]);

})();