app.controller('VoteDetailController', ['$stateParams', 'DataService', 'UtilService', 'youtubeEmbedUtils', '$rootScope',
function ($stateParams, DataService, UtilService, youtubeEmbedUtils, $rootScope) {
    var vm = this;

    var loadData = function () {
        UtilService.showLoading();
        DataService.findById('items', $stateParams.id).then(function (value) {
            vm.vote = value;
            UtilService.hideLoading();
        })
    }

    vm.voteItem = function () {
   //  	vm.vote.num = vm.vote.num ? ++ vm.vote.num : 1;
   //  	var voteUpdate = {
   //  		id: vm.vote.id,
   //  		title: vm.vote.title,
			// content: vm.vote.content,
			// img: vm.vote.img,
			// video: vm.vote.video,
			// imageName: vm.vote.imageName,
			// num: vm.vote.num
   //  	}

   //  	DataService.update('items', voteUpdate);

        if (!vm.vote.listUser)
                vm.vote.listUser = [];
        if (vm.vote.listUser.indexOf($rootScope.CurrentUser.id) == -1) {
            vm.vote.num = vm.vote.num ? ++ vm.vote.num : 1;
            vm.vote.listUser.push($rootScope.CurrentUser.id);
            var voteUpdate = {
                id: vm.vote.id,
                title: vm.vote.title,
                content: vm.vote.content,
                img: vm.vote.img,
                video: vm.vote.video,
                imageName: vm.vote.imageName,
                num: vm.vote.num,
                listUser: vm.vote.listUser
            }

            DataService.update('items', voteUpdate);
        }
    }

    vm.getIdVideo = function (link) {
        return youtubeEmbedUtils.getIdFromURL(link);
    }

    loadData();
}])