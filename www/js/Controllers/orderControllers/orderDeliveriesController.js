mobileShop.controller('orderDeliveriesController',function($scope,$rootScope){
    $scope.headings=["Orders","Delivery History","My Next Pay","Dashboard"];
    $scope.showTabs=true;
    $scope.checkFunction=function(val){
        if(val=='Orders')
            $rootScope.changeState('orderRequestList');
        if(val=="Delivery History")
            $rootScope.changeState('deliveryHistory');
        if(val=="My Next Pay")
            $rootScope.changeState("nextPay")
    }
});