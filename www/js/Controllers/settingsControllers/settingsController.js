mobileShop.controller('settingsController',function($scope,$rootScope){
$scope.headings=["My Profile","Shopping Settings","Delivery Fees","Inventory Fees","Financial Record"];

    $scope.checkSetting=function(val){
        if(val=="My Profile")
        $rootScope.changeState('myProfile');
        if(val=="Shopping Settings")
            $rootScope.changeState('shoppingSettings');
        if(val=="Delivery Fees")
        $rootScope.changeState('deliveryConditionsMet')
        if(val=="Financial Record")
        $rootScope.changeState('financialRecords')
        if(val=="Inventory Fees")
        $rootScope.changeState('storeManagementFee')

    }
});