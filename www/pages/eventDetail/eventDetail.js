app.controller('EventDetailController', ['$stateParams', 'DataService', 'UtilService', 'youtubeEmbedUtils',
function ($stateParams, DataService, UtilService, youtubeEmbedUtils) {
    var vm = this;
    vm.showMoreStatus = false;
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

    vm.getContent = function (content) {
        if (!content)
            return "";
        return content.replace(/\n/g, "<br/>")
    };
    vm.showMore = function () {
      vm.showMoreStatus = !vm.showMoreStatus;
    }

    loadData();
}])