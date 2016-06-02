# jQuery-Autocomplete-to-Angular

Devbridge Group's Ajax AutoComplete for jQuery used as an AngularJS Directive

## Installing

Retrieve and reference the latest release of [Devbridge's Ajax Autocomplete for jQuery plugin](https://github.com/devbridge/jQuery-Autocomplete) in your project.

Copy autocompleteDirective.js and dataService.js into your AngularJS app.

Modify the module name in each to meet your application.

```
var app = angular.module('MyApp');
```

Update dataService.js with ajax call you normally would make.

```
getData: function () {
	if (!data) {
		data = $http.get('api/data')
```

Update autocompleteDirective.js with .getData() (use .getStaticData() if using a static array in the service).

```
dataService.getData()
	.then(function (data) {
```

Update autocompleteDirective.js with the object property that you want the autocomplete to use.

```
lookup: $.map(data, function (object, i) {
	return { value: object.value, data: object };
}),
```

Add the directive to the input field(s) of your choosing.

```
<input type="text" ng-model="my.value" auto-complete />
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

* Tomas Kirda / [@tkirda](https://twitter.com/tkirda)
* Devbridge Group / [GitHub](https://github.com/devbridge) / [jQuery-Autocomplete](https://github.com/devbridge/jQuery-Autocomplete)


