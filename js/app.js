var app = angular.module('eletromec', ['ngSanitize','ngRoute']);

app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
       templateUrl: "/views/main.html",
       controller:'initialPageController',
      })
      .when('/elcm', {
       templateUrl: "/views/elcm/view.html"
      })
      .when('/elmd', {
       templateUrl: "/views/elmd/view.html"
      })
      .when('/eldr', {
       templateUrl: "/views/eldr/view.html"
      })
      .when('/elps', {
       templateUrl: "/views/elps/view.html"
      })
      .when('/fusivel_cartucho', {
       templateUrl: "/views/fusivel_cartucho/view.html"
      })
      .when('/fusivel_nh', {
       templateUrl: "/views/fusivel_nh/view.html"
      })
      .otherwise({ redirectTo: '/' });

      $locationProvider.hashPrefix('');
}]);
