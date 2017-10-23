app.controller('ForgotPasswordController', ['AuthService', 'UtilService', function (AuthService, UtilService) {
    var vm = this;

    vm.forgotPassword = function () {
    	UtilService.showLoading();
    	AuthService.forgotPassword(vm.email).then(function () {
    		UtilService.hideLoading();
    		UtilService.showAlert('Thông báo', 'Hãy truy cập email để tạo mật khẩu mới');
    	});
    }
}])