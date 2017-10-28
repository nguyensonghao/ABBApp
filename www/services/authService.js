app.service('AuthService', ['$q', 'UtilService', function ($q, UtilService) {
    var service = {};
    var _ref = firebase.database().ref();

    service.login = function (account) {
        var deferred = $q.defer();
        var credential = firebase.auth.EmailAuthProvider.credential(account.email, account.password);
        firebase.auth().signInWithCredential(credential).then(function(user) {
            deferred.resolve(user);
        }).catch(function (error) {
            UtilService.hideLoading();
            if (error.code == 'auth/user-not-found') {
                UtilService.showAlert('Email không đúng hoặc có thể email đã bị xóa.');
            } else if (error.code == 'auth/wrong-password') {
                UtilService.showAlert('Mật khẩu chưa đúng.Vui lòng nhập lại.');
            } else if (error.code == 'auth/network-request-failed') {
                UtilService.showAlert('Thiết bị đang không kết nối mạng. Vui lòng kiểm tra lại đường truyền.');
            } else {
                UtilService.showAlert(error.message);
            }

            deferred.reject(error);
        })

        return deferred.promise;
    }

    service.register = function (user) {        
        var deferred = $q.defer();
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function (data) {
            var currentUser = firebase.auth().currentUser;
            currentUser.updateProfile({
                // Save value phoneNumber in photoURL properties
                photoURL: user.phone,
                displayName: user.username
            }).then(function(result) {
                deferred.resolve(result);
            }).catch(function (error) {
                UtilService.hideLoading();
                if (error.code == 'auth/network-request-failed') {
                    UtilService.showAlert('Thiết bị đang không kết nối mạng. Vui lòng kiểm tra lại đường truyền.');
                } else {
                    UtilService.showAlert(error.message);
                }
                deferred.reject(error);
            })
        }).catch(function(error) {
            if (error.code == 'auth/email-already-in-use') {
                UtilService.showAlert("Email đã được đăng ký.");    
            } else if (error.code == 'auth/network-request-failed') {
                UtilService.showAlert('Thiết bị đang không kết nối mạng. Vui lòng kiểm tra lại đường truyền.');
            } else {
                UtilService.showAlert(error.message);
            }

            UtilService.hideLoading();
            deferred.reject(error);
        });       
        
        return deferred.promise;
    }

    service.logout = function () {
        var deferred = $q.defer();
        firebase.auth().signOut().then(function(result) {
            deferred.resolve(result);
            console.log('Signed Out');
          }, function(error) {
            deferred.reject(error);
            console.error('Sign Out Error', error);
          });
          return deferred.promise;
    }

    service.loginFacebook = function () {
        var deferred = $q.defer();
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function (user) {
            firebase.auth().getRedirectResult().then(function (result) {
                deferred.resolve(result);
            })
        }).catch(function (error) {
            if (error.code == 'auth/network-request-failed') {
                UtilService.showAlert('Thiết bị đang không kết nối mạng. Vui lòng kiểm tra lại đường truyền.');
            } else {
                UtilService.showAlert(error.message);
            }            
            deferred.reject(error);
        });

        return deferred.promise;
    }

    service.getCurrentUser = function (user) {
        return {
            email: user.email,
            phone: user.photoURL,
            username: user.displayName,
            id: user.uid
        }
    }

    service.forgotPassword = function (email) {
        var deferred = $q.defer();
        firebase.auth().sendPasswordResetEmail(email).then(function (result) {
            deferred.resolve(true);
        }).catch(function (err) {
            if (error.code == 'auth/network-request-failed') {
                UtilService.showAlert('Thiết bị đang không kết nối mạng. Vui lòng kiểm tra lại đường truyền.');
            } else {
                UtilService.showAlert(error.message);
            }

            UtilService.hideLoading();
            deferred.reject(err);
        })

        return deferred.promise;
    }

    return service;
}])