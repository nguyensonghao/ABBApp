app.controller('EventDetailController', ['$stateParams', 'DataService', 'UtilService', 'youtubeEmbedUtils',
function ($stateParams, DataService, UtilService, youtubeEmbedUtils) {
    var vm = this;

    var loadData = function () {
        UtilService.showLoading();
        DataService.findById('articles', $stateParams.id).then(function (value) {
            vm.post = value;
            UtilService.hideLoading();
        })
    }

    vm.getIdVideo = function (video) {
    	return youtubeEmbedUtils.getIdFromURL(video);
    }

    vm.playerVars = {
        controls: 1,
        showinfo: 0
    };

    loadData();
}])