mobileShop.controller('viewShoppingCartController', function ($scope, DataService, $rootScope, restApiService) {

  /*$scope.cartItems=[
   {des:'Oranges (1kg)',qty:'1',price:'$2.85',toggle:false},
   {des:'Green Apples (3kg)',qty:'2',price:'$23.5',toggle:false},
   {des:'brand careal',qty:'3',price:'$2.32',toggle:false}]*/

  $scope.shoppingList = {};
  function init() {
    $scope.storeData = DataService.getSelectedStore();
    $scope.userId = DataService.getLoginUserId();
    $scope.cartItems = DataService.getPLaceOrder();
    $scope.storeMatched = false;
    $scope.productMatched = [];
    restApiService.getShoppingList($scope.userId,
      function (data) {
        if(typeof data[0] == "object"){
          $scope.shoppingList = data[0];
          $scope.status = "old";
          for(var i =0;i<$scope.shoppingList.carts.length;i++){
            if($scope.storeData.storeName == $scope.shoppingList.carts[i].storeName){
              $scope.storeIndex = i;
              $scope.store = $scope.shoppingList.carts[i];
              $scope.storeMatched = true;
              $scope.checkProducts();
              console.log('matched');
              break
            }
          }
        }
        else{
          $scope.shoppingList = {
            userId : $scope.userId,
            carts:[]
          };
          $scope.status = "new";
        }
      }, function (error) {
        console.log(error)
      })
  }
  init();
  $scope.checkValue = '';

  $scope.options = ["Notify me", "Replace with a similar product", "Cancel this item", "Special Instruction"];
  $scope.showToggle = function (index) {
    $scope.cartItems[index].toggle = !$scope.cartItems[index].toggle;
  };
  $scope.addQuantity = true;
  $scope.estimatedTotal = 0;
  $scope.specialInstruction = false;
  $scope.specialInstructionText = {
    instructions: ''
  };

  for (var i = 0; i < $scope.cartItems.length; i++) {
    $scope.estimatedTotal += $scope.cartItems[i].price
  }

  $scope.addQuantityFunc = function () {
    $scope.addQuantity != $scope.addQuantity;
  };

  $scope.costCheck = function (option) {
    $scope.checkValue = option;
    console.log($scope.checkValue);

    if ($scope.checkValue == "Special Instruction")
      $scope.specialInstruction = true;

  };

  $scope.changeValues = function (index) {
    if ($scope.checkValue == "Special Instruction") {
      $scope.cartItems[index].notification = $scope.checkValue;
      console.log($scope.cartItems[index].notification);
      if ($scope.specialInstructionText.instructions == undefined) {
        $rootScope.showToast("Instructions Required");
      }
      else {
        $scope.cartItems[index].instructions = $scope.specialInstructionText.instructions;
        console.log($scope.cartItems[index]);
        $rootScope.showToast('Changed');
        $scope.showToggle(index)
      }
    }
    else {
      $scope.cartItems[index].notification = $scope.checkValue;
      console.log($scope.cartItems[index]);
      $rootScope.showToast('Changed');
      $scope.showToggle(index)
    }
  };
  $scope.checkProducts = function(){
    for(var i =0;i<$scope.store.products.length;i++){
      for(var j=0;j<$scope.cartItems.length;j++){
        if($scope.cartItems[j].productName == $scope.store.products[i].productName){
          $scope.productMatched.push({
            matched : true,
            old : j,
            new : i
          });
          $scope.product = $scope.store.products[i];
          console.log('matched')
        }
      }
    }
  };
  $scope.addToShoppingList = function () {
    if($scope.storeMatched){
      if($scope.productMatched != []){
        for(var i =0;i<$scope.productMatched.length;i++){
          $scope.shoppingList.carts[$scope.storeIndex].products[$scope.productMatched[i].new] = $scope.cartItems[$scope.productMatched[i].old];
          $scope.cartItems[$scope.productMatched[i].old] = undefined;
          console.log($scope.shoppingList)
        }
      }
        for(var j =0 ; j<$scope.cartItems.length ; j++){
          if($scope.cartItems[j] != undefined){
            $scope.shoppingList.carts[$scope.storeIndex].products.push($scope.cartItems[j]);
            console.log($scope.shoppingList)
          }
        }
      restApiService.updateShoppingLists($scope.shoppingList)
    }
    if($scope.storeMatched == false && $scope.status == "old"){
      $scope.shoppingList.carts.push({
        storeId : $scope.storeData.id,
        storeName : $scope.storeData.storeName,
        products : $scope.cartItems
      });
      console.log($scope.shoppingList);
      restApiService.updateShoppingLists($scope.shoppingList)
    }else if($scope.status == "new"){
      $scope.shoppingList.carts.push({
        storeId : $scope.storeData.id,
        storeName : $scope.storeData.storeName,
        products : $scope.cartItems
      });
      console.log($scope.shoppingList);
      restApiService.createShoppingList($scope.shoppingList)
    }
  }

});
