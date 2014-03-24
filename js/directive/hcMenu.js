'use strict';

angular.module('hackCup.directive')
    .directive('hcMenu', [ function () {
        return {
            restrict: 'E',
            templateUrl: 'view/menu.html',
            scope: {},
            link: function () {
            }
        }
    }]);