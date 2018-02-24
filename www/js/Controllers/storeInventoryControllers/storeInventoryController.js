mobileShop.controller('storeInventoryController',function($scope,$rootScope){
    $scope.headings=["Add Store","Manage Store","Dashboard"];

    $scope.checkRoute=function(val){
        if(val=="Add Store")
            $rootScope.changeState('addStore');
        if(val=="Manage Store")
            $rootScope.changeState('manageStores');
        if(val=="Dashboard")
            $rootScope.changeState('home');
    };
});