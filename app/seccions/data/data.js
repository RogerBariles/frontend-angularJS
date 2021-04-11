'use strict';

angular.module('myApp.data', ['ngRoute', 'dataGrid'])


.controller('dataController', ['$scope', '$routeParams', 'Services', function($scope, $routeParams, Services) {

    $scope.contacto = 'contacto@tuten.cl';
    $scope.adminemail = $routeParams.dataEmail;
    $scope.dataGrid = [];
    $scope.dataResponse = {
        'bookingId': 0,
        'cliente': '',
        'bookingTime': 0,
        'streetAddress': '',
        'bookingPrice': 0
    };

    $scope.gridOptions = {
        data: [],
    };


    $scope.loadData = function() {
        let token = localStorage.getItem("token");

        Services.dataListBookings(token, $scope.adminemail, $scope.contacto).then(
            function(resposne) {
                if (resposne) {
                    angular.forEach(resposne.data, function(value, key) {
                        // SETEAMOS LOS VALORES A MOSTRAR
                        $scope.dataResponse.bookingId = value.bookingId;
                        $scope.dataResponse.cliente = value.tutenUserClient.firstName + " " + value.tutenUserClient.lastName;
                        $scope.dataResponse.bookingTime = value.bookingTime;
                        $scope.dataResponse.streetAddress = value.tutenUserProfessional.streetAddress;
                        $scope.dataResponse.bookingPrice = value.bookingPrice;

                        $scope.dataGrid.push($scope.dataResponse);
                        // LIMPIAMOS VARIABLE
                        $scope.dataResponse = {};
                    });

                    $scope.gridOptions.data = $scope.dataGrid;
                    $scope.dataGrid = [];

                }
            });
    };

}]);