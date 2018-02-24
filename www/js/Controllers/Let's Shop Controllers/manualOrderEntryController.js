/**
 * Created by MuhammadAsad on 6/9/2015.
 */
mobileShop.controller('manualOrderEntryController',function($scope,DataService,$rootScope){
    $scope.cartItems=[];
    $scope.estimatedTotal = Number();


    $scope.getSelectedStore=function(){
        $scope.storeData=DataService.getSelectedStore();
    };
    $scope.getItemsDetails = function(){
        $scope.cartItems = DataService.getItemDetails();
        for(var i=0;i<$scope.cartItems.length;i++){
            $scope.estimatedTotal+=$scope.cartItems[i].approxPrice;
        }
    };
    $scope.updateItem = function (index) {
        DataService.saveItemIndex(index);
        $rootScope.changeState('addItemDetail');
    };
    $scope.addItem = function(){
        $rootScope.changeState('addItemDetail');
    };

    $scope.getSelectedStore();
    $scope.getItemsDetails();
    $scope.checkOut = function () {
      if($scope.cartItems[0] != undefined){
        DataService.changePlaceOrder($scope.cartItems);
        $rootScope.changeState('setDeliveryPoint')
      }
      else{console.log('not product added')}
    }

});
