'use strict';

angular.module('hackCup', [
    'ngRoute',
    'hackCup.ctrl',
    'hackCup.directive'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'view/home.html', controller: 'HomeCtrl'});
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

angular.module('hackCup.ctrl', []);
angular.module('hackCup.directive', []);