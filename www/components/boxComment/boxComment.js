app.directive('ngBoxComment', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/boxComment/boxComment.html',
        scope: {
            vote: '=data'
        },
        controller: ["$rootScope", "$scope", "UtilService", "DataService", "$timeout", '$state', 'youtubeEmbedUtils', function ($rootScope, $scope, UtilService, DataService, $timeout, $state, youtubeEmbedUtils) {
            $scope.rows = 1;
            $scope.send = function (message) {
            	if (!message)
            		return;

            	var comment = {
            		userId: $rootScope.CurrentUser.id,
                    userName: $rootScope.CurrentUser.username,
            		voteId: $scope.vote.id,
            		content: message,
                    time: new Date().getTime()
            	}

            	DataService.insert('comments', comment).then(function (result) {
                    DataService.update('items', {
                        id: $scope.vote.id,
                        comment: ++$scope.vote.comment
                    })
                    
            		$scope.message = "";
            	})
            }
        }]
    }
})