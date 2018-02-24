mobileShop.controller('homeController',function($scope,$rootScope){
$rootScope.showIcons=true;
$scope.headings=["Let's Shop!","Order Deliveries","Store Inventories"]

    $scope.checkState=function(val){
        if(val=="Order Deliveries")
        $rootScope.changeState('orderDeliveries');
        if(val=="Let's Shop!")
        $rootScope.changeState('letsShop');
        if(val=="Store Inventories")
        $rootScope.changeState('storeInventory')
    };
    $rootScope.storeInventory=false;
});
