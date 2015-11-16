/* global _:true */

var app = angular.module('todoApp', ['ngRoute','directives','pages','angular-google-analytics']);
app.constant('_',_);

app.config(['AnalyticsProvider', function (AnalyticsProvider) {
    AnalyticsProvider.setAccount('UA-44527859-5');
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.setDomainName('none');
}]);

app.run(['Analytics', function(Analytics) {}]); //jshint ignore:line

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
        templateUrl: 'views/pages/home/home.html',
        controller: 'IndexPageController'
    }).
        when('/archive', {
            templateUrl: 'views/pages/archive/archive.html',
            controller: 'ArchivePageController'
        });
}]);

app.controller('NavigationController', ['$scope', '$location', '_',
    function($scope, $location, _){

        $scope.menus = [{
            name: 'Home',
            url: '/',
            class: ''
        },{
            name: 'Archive',
            url: '/archive',
            class: ''
        }];

        var updateNavigation = function() {
            var url = $location.url();
            _.each($scope.menus, function(menu) {
                if(menu.url === url || (menu.url + '/') === url) {
                    menu.class = 'active';
                } else {
                    menu.class = '';
                }
            });
        };

        $scope.$on('$routeChangeSuccess', function() {
            updateNavigation();
        });

        updateNavigation();
    }]);

