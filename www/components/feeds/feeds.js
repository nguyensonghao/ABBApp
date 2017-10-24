app.directive('ngFeeds', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/feeds/feeds.html',
        scope: {
            data: '=data'
        },
        controller: ["$rootScope", "$scope", "UtilService", "DataService", "$timeout", '$state', function ($rootScope, $scope, UtilService, DataService, $timeout, $state) {
            var loadData = function () {
                UtilService.showLoading();
                DataService.all('articles').then(function (data) {
                    UtilService.hideLoading();
                    $scope.posts = data;
                })
            }

            $scope.getDate = function (time) {
                var d = new Date(time);
                var month = d.getMonth() + 1;
                var date = d.getDate();
                return date + " tháng " + month;
            }

            $scope.getDay = function (time) {
                var d = new Date(time);
                var day = d.getDay() + 1;
                return day < 8 ? "Thứ " + day : "Chủ nhật"; 
            }

            loadData();
        }]
    }
})