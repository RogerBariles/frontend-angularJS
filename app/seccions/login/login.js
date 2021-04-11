'use strict';
angular.module('myApp.login', ['ngRoute'])

.controller('loginController', ['$scope', '$location', 'Services', function($scope, $location, Services) {
    $scope.user = {
        'nameUser': null,
        'password': null,
        'app': 'APP_BCK'
    }
    $scope.loginError = true;
    $scope.msjError = '';

    $scope.login = function() {
        $scope.loginError = false;
        $scope.user.nameUser = $scope.user.nameUser.toLowerCase();
        // LOGUEAR USARIO
        Services.authenticate($scope.user).then(
            function(response) {
                if (response.statusText != 'Bad Request') {
                    let dataAuthentication = response.data;

                    // GUARDAMOS TOKEN PARA PROXIMAS PETICIONES HTTP Y REDIRIGIMOS
                    if (dataAuthentication.sessionTokenBck) {
                        localStorage.setItem("token", dataAuthentication.sessionTokenBck);
                        $location.path(`/data/${$scope.user.nameUser}`);
                    } else {
                        $scope.loginError = true;
                        $scope.msjError = '* Token null';
                    }

                } else {
                    $scope.msjError = '* Datos Erroneos';
                    $scope.loginError = true;
                    $scope.user = {};
                }
            }
        );
    };
}]);