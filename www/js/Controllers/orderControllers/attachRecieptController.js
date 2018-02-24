mobileShop.controller('attachRecieptController',function($scope,uploadImageService){
  $scope.selectImages = function () {

    $scope.takePicture = function () {
      uploadImageService.takePicture(onSuccess, onFail);
      function onSuccess(imageData) {
        console.log(imageData);
      }
      function onFail(message) {
        alert('Failed because: ' + message);
      }
    }
  }
});
