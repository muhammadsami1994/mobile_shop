mobileShop.controller('shoppingCheckListController', function ($scope, DataService,$ionicPopup,$timeout,restApiService) {
  /*$scope.shoppingListData=[{name:"Sweet Naval Oranges (2 lbs) (1 qty)",purchaseNote:"if not available, do not purchase",status:false},
   {name:"Bananas (3.5 lbs) (2 qty)",purchaseNote:"",status:true},
   {name:"Gallon Milk, 2% Fat Free (1 qty)",purchaseNote:"",status:true},
   {name:"Tasty Wheat Bread (1 qty)",purchaseNote:"If not available, replace product with Tasty White Bread.",status:true}]*/
  $scope.shoppingListData = DataService.getOrderDetail();
  console.log($scope.shoppingListData);
  $scope.deliveryMan = {
    status:''
  };
  $scope.scopeValue = "";
  $scope.productIndex = null;
  $scope.showPopup = function(val,index) {
    $scope.scopeValue = val;
    $scope.productIndex = index;
    $scope.data = {};
    $scope.locations=["Got it!","Not Available","Followed Purchase Note","Still looking"];
    $scope.scopeFunc = function(val){
      $scope.scopeValue = val;
    };
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<div class="row" ng-repeat="location in locations"><input class="col col-10" type="radio" ng-checked="location == shoppingListData.product[productIndex].deliveryManStatus" ng-model="scopeValue" ng-click="scopeFunc(location)" name="location" style="margin-top: 3px;"/><p>{{location}}</p></div>',
      title: 'Product Status',
      scope: $scope,
      buttons: [
        {
          text: '<b>Update</b>',
          type: 'button=-stable',
          onTap: function(e) {
            if (!$scope.scopeValue) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              $scope.shoppingListData.product[$scope.productIndex].deliveryManStatus = $scope.scopeValue;
              console.log($scope.shoppingListData);
              return $scope.shoppingListData.product[$scope.productIndex].deliveryManStatus;

            }

          }
        }
      ]
    });
  };
  $scope.setDeliveryStatus = function(status){
    $scope.shoppingListData.deliveryStatus = status;
    console.log($scope.shoppingListData);
    restApiService.updateOrder($scope.shoppingListData)
  }
});
