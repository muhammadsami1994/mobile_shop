mobileShop.controller('productBrowsingController',function($scope,restApiService,DataService,$rootScope){
    $scope.boxes=[1,2];
    function init(){
        $scope.selectedStore = DataService.getSelectedStore();
        restApiService.getStoreInventory($scope.selectedStore.id,function(data){
            $scope.products=data;
          //$scope.$apply();
            console.log(data);
        },function(err){
            console.log(err);
        })
    }
    init();
    $scope.productDetails=function(product){
        DataService.setSelectedProduct(product);
        $rootScope.changeState('productDetail');
    }
});
