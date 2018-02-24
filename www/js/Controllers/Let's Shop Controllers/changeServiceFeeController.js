mobileShop.controller('changeServiceFeeController',function($scope, DataService){


  function init (){
    $scope.storeData = DataService.getSelectedActiveOrder();
    console.log($scope.storeData)
  }
  init();

  $scope.serviceFee = {
    fee : 0
  };
  $scope.updateFee = function(){
    console.log($scope.serviceFee);
    $scope.storeData.billingMode.deliveryFee = $scope.serviceFee.fee;
    $scope.storeData.billingMode.defaultServiceFee= null;
    console.log($scope.storeData);
  };
  $scope.items=["Sweet Naval Oranges (2 lbs) (1 qty)","Bananas (3.5 lbs) (2 qty)","Tasty Wheat Bread (1 qty)","Gallon Milk, 2% Fat Free (1 qty)",]
});
