mobileShop.controller('manageStoreInventoryController',function($scope,$rootScope,DataService){
    $scope.manageStoreInventory=[{name:"Green Apples",price:"1.25"},{name:"Branded Cereal",price:"1.25"},{name:"Swiss Cheese",price:"1.25"},{name:"Freshly Sliced Ham",price:"1.25"}];
    $rootScope.storeInventory=true;
    $scope.storeProducts=DataService.getStoreInventory();
    $scope.storeData=DataService.getStoreData()

});