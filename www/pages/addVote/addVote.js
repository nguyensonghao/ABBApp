app.controller('AddVoteController', ['$stateParams', 'DataService', 'UtilService', '$rootScope', '$ionicActionSheet',
function ($stateParams, DataService, UtilService, $rootScope, $ionicActionSheet) {
    var vm = this;
    vm.imageUrl = "";
    vm.vote = {};
    vm.send = function () {
        if (validate()) {
            var storageRef = firebase.storage().ref();
            var fileName = "item/" + new Date().getTime() + ".png";
            UtilService.showLoading();
            storageRef.child(fileName).putString(vm.imageUrl, 'data_url').then(function (snapshot) {
                DataService.insert('items', {
                    title: vm.vote.title,
                    content: vm.vote.content,
                    img: snapshot.downloadURL,
                    video: '',
                    imageName: fileName,
                    num: 0,
                    userId: $rootScope.CurrentUser.id,
                    listUser: [],
                    comment: 0,
                }).then(function (result) {
                    vm.vote = {};
                    vm.imageUrl = "";
                    UtilService.showAlert($rootScope.INSERT_VOTE_SUCCESS);
                    UtilService.hideLoading();
                }).catch(function (e) {
                    UtilService.hideLoading();
                    console.log(e);
                });
            })
        } else {
            
        }
    }


    vm.getImage = function () {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Chụp ảnh' },
                { text: 'Chọn ảnh từ thư viện' }
            ],
            titleText: 'Thêm ảnh cho tiết mục',
            cancelText: 'Hủy',
            cancel: function() {
                console.log('Cancel action sheet');
            },
            buttonClicked: function(index) {
                var sourceType = index ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;
                UtilService.takePicture(sourceType).then(function (image) {
                    vm.imageUrl = image;
                })
                return true;
            }
       });
    }

    var validate = function () {
        if (!vm.vote.title) {
            UtilService.showAlert('Thông báo', $rootScope.TITLE_REQUIRED);
            return false;
        } else if (!vm.vote.content) {
            UtilService.showAlert('Thông báo', $rootScope.CONTENT_REQUIRED);
            return false;
        } else if (!vm.imageUrl) {
            UtilService.showAlert('Thông báo', $rootScope.IMAGE_REQUIRED);
            return false;
        } else {
            return true;
        }
    }
}])