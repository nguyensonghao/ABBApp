app.directive('ngBoxComment', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/boxComment/boxComment.html',
        scope: {
            vote: '=data'
        },
        controller: ["$rootScope", "$scope", "UtilService", "DataService", "$timeout", '$state', 'youtubeEmbedUtils', function ($rootScope, $scope, UtilService, DataService, $timeout, $state, youtubeEmbedUtils) {
            $scope.send = function (message) {
            	if (!message)
            		return;

            	var comment = {
            		userId: $rootScope.CurrentUser.id,
            		voteId: $scope.vote.id,
            		content: message
            	}

            	DataService.insert('comments', comment).then(function (result) {
            		console.log(result);
            		$scope.message = "";
            	})
            }
        }]
    }
})