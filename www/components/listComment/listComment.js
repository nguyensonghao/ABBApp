app.directive('ngListComment', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/listComment/listComment.html',
        scope: {
            vote: '=data'
        },
        controller: ["$rootScope", "$scope", "UtilService", "DataService", "$timeout", function ($rootScope, $scope, UtilService, DataService, $timeout) {
            $scope.list = [];
            firebase.database().ref('comments').orderByChild('voteId').equalTo($scope.vote.id).once("value", function(list) {
                list = list.val();
                var result = [];
                for (var key in list) {
                    list[key]['id'] = key;
                    result.push(list[key]);
                }

                $timeout(function () {
                    $scope.list = result;
                })
            });
        }]
    }
})