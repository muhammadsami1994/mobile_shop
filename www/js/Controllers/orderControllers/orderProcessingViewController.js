mobileShop.controller('orderProcessingViewController',function($scope,$rootScope){
    $scope.headings=["Direction to Store","Shopping Check-list","Receipts","Direction to Delivery Point","Updates & Messages"];

    $scope.checkState=function(val){
        if(val=="Direction to Store")
            $rootScope.changeState('directionToStore');
        if(val=="Shopping Check-list")
            $rootScope.changeState('shoppingCheckList');
        if(val=="Receipts")
            $rootScope.changeState('attachReciept')
        if(val=="Direction to Delivery Point")
            $rootScope.changeState('directionToOrder')
        if(val=="Updates & Messages")
            $rootScope.changeState('messagingView')
    }
});