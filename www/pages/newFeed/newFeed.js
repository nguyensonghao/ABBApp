app.controller('NewFeedController', ['DataService', 'UtilService', function (DataService, UtilService) {
    var vm = this;
    vm.posts = [];
    
    var loadData = function () {
        UtilService.showLoading();
        DataService.all('articles').then(function (data) {
            UtilService.hideLoading();
            vm.posts = data;
        })
    }

    vm.getDate = function (time) {
        var d = new Date(time);
        var month = d.getMonth() + 1;
        var date = d.getDate();
        return date + " tháng " + month;
    }

    vm.getDay = function (time) {
        var d = new Date(time);
        var day = d.getDay() + 1;
        return day < 8 ? "Thứ " + day : "Chủ nhật"; 
    }

    loadData();
}])