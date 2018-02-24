mobileShop.controller('manageStoresController',function($scope,$rootScope,restApiService,DataService){
    $scope.manageStoreData=[];

    $scope.getUserStores=function(){
        restApiService.getUserStores(function(res){
            console.log(res);
            $scope.manageStoreData=res
        },function(err){
            console.log(err);
        })
    };

    $scope.getUserStores();
    $scope.getStoreInventory=function(storeData){
        DataService.setStoreData(storeData);
        restApiService.getStoreInventory(storeData.id,function(res){
           DataService.setStoreInventory(res);
            console.log(res);
            $rootScope.changeState('manageStoreInventory')
        },function(err){
            console.log(err);
        });
    }
});