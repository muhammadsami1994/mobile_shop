mobileShop.controller('viewShoppingListController', function ($scope, restApiService, DataService, $rootScope) {

  function init() {
    restApiService.getShoppingList(DataService.getLoginUserId(), function (data) {
      $scope.shoppingList = data[0];
      console.log($scope.shoppingList)
    }, function (err) {
      console.log(err)
    })
  }
  init();

  $scope.goToShoppingListDetail = function (store,index) {
    DataService.setShopingListSelectedStore(store);
    DataService.setSelectedShoppingListStoreIndex(index);
    $rootScope.changeState('shoppingListDetail')
  };
  /*$scope.shoppingListData = [
   "Wal-Mart: Hygiene Items (5 items)"
   , "Wal-Mart: Baby Supplies (3 items)"
   , "Costco: Bi-Weekly Groceries  (25 items)"
   , "Fresh & Easy: Bread & Vegetables (15 items)"
   ];*/
});
