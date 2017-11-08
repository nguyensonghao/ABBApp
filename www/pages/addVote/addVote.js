app.controller('AddVoteController', ['$stateParams', 'DataService', 'UtilService', '$rootScope',
function ($stateParams, DataService, UtilService, $rootScope) {
    var vm = this;
    var imageUrl = "";
    vm.vote = {};
    vm.send = function () {
        DataService.insert('items', {
            title: vm.vote.title,
            content: vm.vote.content,
            img: "https://firebasestorage.googleapis.com/v0/b/abbapp-b24de.appspot.com/o/article%2F1510112907454.png?alt=media&token=690d2fcf-8282-4ccd-a64b-76ea80b4193a",
            imageName: "https://firebasestorage.googleapis.com/v0/b/abbapp-b24de.appspot.com/o/article%2F1510112907454.png?alt=media&token=690d2fcf-8282-4ccd-a64b-76ea80b4193a",
            num: 0,
            like: 0,
            video: "",
            userId: $rootScope.CurrentUser.id,
            listUser: []
        }).then(function (data) {
            vm.vote = {};
            imgUrl = "";
        })
    }


    vm.getImage = function () {
        UtilService.takeImage().then(function (data) {
            imageUrl = data;
        })
    }
}])