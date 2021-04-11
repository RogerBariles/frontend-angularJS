'use strict';

var AppConfig = 'https://dev.tuten.cl:443/TutenREST/rest/';

angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.data',
    'myApp.version'
])

.service('Services', ['$http', function($http) {

    this.authenticate = function(user) {
        return $http({
            url: `${AppConfig}` + 'user/' + `${user.nameUser}`,
            method: 'PUT',
            headers: {
                'password': `${user.password}`,
                'app': `${user.app}`,
            }
        });
    };

    this.dataListBookings = function(token, adminEmail, contacto) {
        return $http({
            url: `${AppConfig}` + 'user/' + `${contacto}` + '/bookings?current=true',
            method: 'GET',
            headers: {
                'app': 'APP_BCK',
                'token': `${token}`,
                'adminemail': `${adminEmail}`
            }
        })
    };

}])

.factory('HttpInterceptor', function($q, $location) {

    return {
        'request': function(config) {
            return config;
        },

        'responseError': function(rejection) {
            var absoluteUrl = $location.absUrl();

            if (absoluteUrl.search('authentication') == -1) {
                if (localStorage.length == 0) {
                    $location.path('');
                } else {
                    if (localStorage.getItem('token') == undefined || localStorage.getItem('token'))
                        $location.path('');
                }
            }
            return rejection;
        }
    };
})

.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .otherwise({ redirectTo: '/authentication' })
        .when('/authentication', {
            templateUrl: 'seccions/login/login.html',
            controller: 'loginController',
        })
        .when('/data/:dataEmail', {
            templateUrl: 'seccions/data/data.html',
            controller: 'dataController'
        });

    $httpProvider.interceptors.push('HttpInterceptor');

}]);