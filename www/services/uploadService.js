app.service('UploadService', ['$q', function ($q) {
    var service = {};

    service.upload = function (fileUrl) {
        var deferred = $q.defer();
		service.urlToBlob(fileUrl, function (file) {
			var imageName = "upload/" + new Date().getTime().toString() + ".jpg";
			storageRef.child(imageName).put(file).then(function (snapshot) {							
                deferred.resolve(snapshot['a']['downloadURLs'][0]);
			}).catch(function (error) {
                deferred.resolve(null);
            })
		})

        return deferred.promise;
    }

    service.urlToBlob = function (fileUrl, callback) {
        window.resolveLocalFileSystemURL(fileUrl, function (fileEntry) {
            fileEntry.file((resFile) => {
                var reader = new FileReader();
                reader.onloadend = function (evt) {
                    var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                    imgBlob.name = 'sample.jpg';
                    callback(imgBlob);
                };

                reader.onerror = function (e) {						
                    callback(null);
                };

                reader.readAsArrayBuffer(resFile);
            });
        });
    }

    return service;
}])