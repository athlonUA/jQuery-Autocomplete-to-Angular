(function() {
    'use strict';

    var app = angular.module('MyApp');

    app.directive('autoComplete', ['dataService', function (dataService) {
        return {
            restrict: 'A',
            require: 'ngModel', //requires an ngModel value on the input field
            link: function (scope, elem, attrs, ctrl) {

                dataService.getStaticData()	//.getData() for Ajax service call
                    .then(function (data) {
                        $(elem).devbridgeAutocomplete({
                            lookup: $.map(data, function (object, i) {
                                return { value: object.value, data: object }; //value parameter will update the autocomplete field
                            }),
                            onSelect: function () {
                                update();
                            },
                            onInvalidateSelection: function () {
                                $(this).val('');
                            }
                        });
                    });

                elem.off('input keydown change');
                elem.on('blur', function () {
                    update();
                });

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