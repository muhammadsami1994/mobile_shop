mobileShop.controller('shoppingListDetailController', function ($scope,DataService,restApiService,$rootScope) {
  function init() {
    $scope.ListData = DataService.getShopingListSelectedStore();
    restApiService.getStoreDetail($scope.ListData.storeName, function (data) {
      console.log(data);
      $scope.storeData = data[0]
    }, function (error) {
      console.log(error)
    });
  }
  init();
  $scope.addToCart = function(){
    DataService.setSelectedStore($scope.storeData);
    DataService.setShoppingListItemToPlaceOrder($scope.ListData.products);
    $rootScope.changeState('viewShoppingCart')
  };
  //$scope.ListData = ["Wal-Mart: Hygiene Items (5 items)", "Wal-Mart: Baby Supplies (3 items)", "Costco: Bi-Weekly Groceries  (25 items)", "Fresh & Easy: Bread & Vegetables (15 items)"];
});
