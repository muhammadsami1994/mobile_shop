mobileShop.controller('addItemDetailController',function($scope,DataService,$rootScope){

    $scope.disableAddButton = false;
    $scope.disableUpdateButton = true;
    $scope.updateItemArray = [];
    $scope.itemObj = {};
    $scope.saveItemDetails = function(){
        if($scope.itemObj.name && $scope.itemObj.quantity && $scope.itemObj.approxPrice){
            DataService.saveItemDetails($scope.itemObj);
            $scope.itemObj = {};
            $rootScope.changeState('manualOrderEntry');
        }
        else{
            console.log("All fields are required");
        }
    };
    $scope.updateItem = function(){
        var itemIndex = DataService.getUpdateItemIndex();
        if(itemIndex == 0 || itemIndex){
            $scope.disableAddButton = true;
            $scope.disableUpdateButton = false;
            $scope.updateItemArray = DataService.getItemDetails();
            $scope.itemObj = $scope.updateItemArray[itemIndex];
            $scope.updateItemIndex = itemIndex;
        }else{
            console.log("No item to update");
        }
        console.log("loaded");
    };
    $scope.updateSelectedItem = function(){
        $scope.updateItemArray[$scope.updateItemIndex] = $scope.itemObj;
        DataService.saveItemIndex(null);
        $rootScope.changeState('manualOrderEntry');
    };
    $scope.updateItem();

});