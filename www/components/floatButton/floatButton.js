app.directive('ngFloatButton', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/floatButton/floatButton.html',
        controller: ["$rootScope", "$scope", "UtilService", "DataService", "$timeout", function ($rootScope, $scope, UtilService, DataService, $timeout) {
            
        }]
    }
})