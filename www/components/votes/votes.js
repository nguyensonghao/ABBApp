app.directive('ngVotes', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/votes/votes.html',
        scope: {
            data: '=data'
        },
        controller: ["$rootScope", "$scope", "UtilService", "DataService", "$timeout", '$state', '$rootScope', function ($rootScope, $scope, UtilService, DataService, $timeout, $state, $rootScope) {
            var loadData = function () {
                UtilService.showLoading();
                firebase.database().ref('items').on("value", function(list) {
                    list = list.val();
                    var result = [];
                    for (var key in list) {
                        list[key]['id'] = key;
                        result.push(list[key]);
                    }
                
                    $timeout(function () {
                        $scope.votes = result;
                        UtilService.hideLoading();
                    })
                });
            }

            $scope.detail = function (vote) {
                $state.go('vote-detail', {
                    id: vote.id
                })
            }

            $scope.voteItem = function (vote, event) {
                event.stopPropagation();
                if (!vote.listUser)
                        vote.listUser = [];
                if (vote.listUser.indexOf($rootScope.CurrentUser.id) == -1) {
                    event.stopPropagation();
                    vote.num = vote.num ? ++ vote.num : 1;
                    vote.listUser.push($rootScope.CurrentUser.id);
                    var voteUpdate = {
                        id: vote.id,
                        title: vote.title,
                        content: vote.content,
                        img: vote.img,
                        video: vote.video,
                        imageName: vote.imageName,
                        num: vote.num,
                        listUser: vote.listUser
                    }

                    DataService.update('items', voteUpdate);
                }
            }

            $scope.isVoted = function (vote) {
                if (!vote.listUser)
                    return false;
                return vote.listUser.indexOf($rootScope.CurrentUser.id) != -1
            }

            loadData();
        }]
    }
})