mobileShop.controller('productDetailController', function ($scope, DataService, $rootScope, restApiService) {

  $scope.productDetail = DataService.getSelectedProduct();
  console.log($scope.productDetail);
  $scope.rating = [10, 10, 10, 10, 10];
  $scope.avgRating = 0;
  $scope.orderObject = {};
  $scope.quantity = false;
  //$scope.productImages = ['img/nature-mobile-wallpapers-2.jpg', 'img/nature-mobile-wallpapers-2.jpg', 'img/d666d5114d671a03627e76ee1edb0329_550.jpg'];
  $scope.productImages = $scope.productDetail.images;
  $scope.populateImage = true;
  $scope.multiStarRating = 0;
  $scope.totalViewers = 0;
  $scope.averageRating = 0;

  function init() {
    restApiService.getProductRatingCount($scope.productDetail.id, function (val) {
      $scope.ratingNumbers = val;
      console.log(val);
      for (var i = 0; i < $scope.ratingNumbers.length; i++) {
        var multiStarRating = $scope.ratingNumbers[i] * i;
        $scope.multiStarRating += multiStarRating;
        //console.log($scope.multiStarRating );
        $scope.totalViewers += $scope.ratingNumbers[i];
        //console.log($scope.totalViewers);
      }
      $scope.averageRating = $scope.multiStarRating / $scope.totalViewers;
      //console.log($scope.averageRating)
    });
  }
init();


$scope.orderObjectFunc = function () {
  if ($scope.orderObject.quantity != undefined) {
    $scope.orderObject.productName = $scope.productDetail.productName;
    $scope.orderObject.productId = $scope.productDetail.id;
    $scope.orderObject.storeId = $scope.productDetail.storeId;
    $scope.orderObject.price = $scope.productDetail.price;
    $scope.orderObject.toggle = false;
    //console.log($scope.orderObject);
    DataService.setPlaceOrder($scope.orderObject);
    $scope.orderObject = {};
    $rootScope.changeState('viewShoppingCart')
  }
  else {
    console.log('nothing');
    $scope.quantity = true;
  }

};
$scope.placeOrder = function () {
  var orderList = DataService.getPLaceOrder();
  console.log(orderList);
  var _testing = false;
  if (orderList.length >= 1) {
    for (var i = 0; i < orderList.length; i++) {
      if ($scope.productDetail.productName == orderList[i].productName) {
        _testing = true;
        console.log('Duplicate');
        break
      }
    }
  }

  if (!_testing) {
    $scope.orderObjectFunc()
  }
};
});
