app.directive('ngListComment', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/listComment/listComment.html',
        scope: {
            vote: '=data'
        },
        controller: ["$rootScope", "$scope", "UtilService", "DataService", "$timeout", function ($rootScope, $scope, UtilService, DataService, $timeout) {
            $scope.list = [];
            firebase.database().ref('comments').orderByChild('voteId').equalTo($scope.vote.id).on('child_added', function (comment) {
                $scope.list.push(comment.val());
            })

            $scope.getContent = function (content) {
                return UtilService.getContent(content);
            }
        }]
    }
})