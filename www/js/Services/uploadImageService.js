/**
 * Created by koDev on 9/11/2015.
 */
mobileShop.factory('uploadImageService',function(){

    var _selectImage = function(callback){

        window.imagePicker.getPictures(
            function(results) {
                var image = {
                    images:[],
                    productImages:[]
                };
                console.log(results);
                results.forEach(function(result){
                    image.images.push(result);
                    image.productImages.push(result);
                });
                callback(null,image);

            }, function (error) {
                console.log('Error: ' + error);
                callback(error,null)
            }
        );
        /*window.imagePicker.getPictures(
          function(results) {
            console.log(results);
            results.forEach(function(result){
              $scope.inventoryData.images.push(result);
              $scope.productImages.push(result);
            });

            $scope.$apply($scope.productImages);
            $scope.populateImage = false;
            $scope.$digest($scope.populateImage);
            $timeout(function(){
              $scope.populateImage = true;
              $scope.$digest($scope.populateImage);
            },100)
          }, function (error) {
            console.log('Error: ' + error);
          }
        );*/
    };
    var _takePicture = function(onSuccess,onFail){
        navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
            destinationType: Camera.DestinationType.FILE_URI
        })
    };
    return{
        selectImage : _selectImage,
        takePicture : _takePicture
    }

});


