app.directive('ngFloatButton', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/floatButton/floatButton.html',
        controller: ["$rootScope", "$scope", "UtilService", "DataService", "$state", function ($rootScope, $scope, UtilService, DataService, $state) {
            $scope.addVote = function () {
		        $state.go('add-vote');
		    }

		    $scope.listVote = function () {
		        $state.go('list-vote');
		    }
        }]
    }
})