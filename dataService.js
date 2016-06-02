(function () {
    'use strict';

    var app = angular.module('MyApp');

    //get data service
    app.factory('dataService', ['$http', '$q', function ($http, $q) {
        var data;

        return {
            getData: function () {
                if (!data) {
                    data = $http.get('api/data') //url for the HttpRequest
                                .then(function (response) {
                                    return response.data;
                                }, function (error) {
                                    console.log(error);
                                });
                }
                return data;
            },
			//a method without a Http call can be used as well
			getStaticData: function (){
				//a deferred promise is returned to handle the .then() 
				//called to this service from the directive (mocking an async call)				
				var deferred = $q.defer();
				
				var items = [
					{
						value: "Foo Bar",
						first:	"Foo",
						last: "Bar"
					},
					{
						value: "Hello World",
						first: "Hello",
						last: "World"
					}
				];
				
				deferred.resolve(items);
				return deferred.promise;
			}
        }
    }]);

})();