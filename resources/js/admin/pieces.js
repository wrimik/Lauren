var laurenApp = angular.module('laurenApp', []);
laurenApp.controller('PortfolioCtrl', function ($scope, $http) {
    $http.get('/json/pieces.json')
        .then(function (res) {
            $scope.pieces = res.data;
        });
});