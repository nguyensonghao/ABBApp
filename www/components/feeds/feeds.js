app.directive('ngFeeds', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/feeds/feeds.html',
        scope: {
            data: '=data'
        },
        controller: ["$rootScope", "$scope", "UtilService", "DataService", "$timeout", '$state', 'youtubeEmbedUtils', function ($rootScope, $scope, UtilService, DataService, $timeout, $state, youtubeEmbedUtils) {
            var loadData = function () {
                UtilService.showLoading();
                DataService.all('articles').then(function (data) {
                    UtilService.hideLoading();
                    $scope.posts = data;
                })
            }

            $scope.listYoutube = [];
            $scope.playerVars = {
                controls: 1,
                showinfo: 0
            };

            $scope.getDate = function (time) {
                var d = new Date(time);
                var month = d.getMonth() + 1;
                var date = d.getDate();
                return date + " tháng " + month;
            }

            $scope.getDay = function (
                time) {
                var d = new Date(time);
                var day = d.getDay() + 1;
                return day < 8 ? "Thứ " + day : "Chủ nhật"; 
            }

            $scope.getImageYoutube = function (video) {
                return UtilService.getThumBnailYoutube(getIdVideo(video));
            }

            $scope.getIdVideo = function (link) {
                return youtubeEmbedUtils.getIdFromURL(link);
            }

            $scope.goDetail = function (post) {
                for (var key in $scope.listYoutube) {
                    $scope.listYoutube[key].stopVideo();
                }

                $state.go('event-detail', {
                    id: post.id
                })
            }

            $scope.classVideo = function (video) {
                return video ? 'has-video' : '';
            }

            loadData();
        }]
    }
})