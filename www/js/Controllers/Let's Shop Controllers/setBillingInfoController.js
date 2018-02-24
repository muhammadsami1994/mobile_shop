mobileShop.controller('setBillingInfoController',function($scope,DataService,$rootScope,restApiService){

    $scope.billingRecords=["Use an existing billing record","New billing record"];
    $scope.DeliveryInstructions = '';
    $scope.scopeValue = '';
    $scope.serviceFeeBolean = true;
    $scope.serviceFee = null;
    $scope.selectMode = false;
    $scope.billingMode = {
      mode:null,
      information : null,
      defaultServiceFee :  18.75,
      deliveryFee:null,
      optionalDeliveryInstructions : null
    };

    $scope.check = function (mode) {
      $scope.billingMode.mode = mode;
      console.log($scope.billingMode);
      $scope.selectMode = false;

    };
    $scope.serviceCharges = function (def,dev) {
      if(def==null){
        $scope.billingMode.defaultServiceFee = null;
        $scope.serviceFeeBolean = false;
      }
      else{
        $scope.billingMode.deliveryFee = null;
        $scope.billingMode.defaultServiceFee = 18.75;
        $scope.serviceFeeBolean = true;
      }
    };
    $scope.submitOrder = function(){
      console.log($scope.billingMode);
      if($scope.billingMode.mode == null){
        $scope.selectMode = true;
      }else{
        DataService.setBillingInformation($scope.billingMode);
        var order = {
          storeName: DataService.getSelectedStore().storeName,
          product : DataService.getPLaceOrder(),
          billingMode: DataService.getBillingInformation(),
          deliveryInformation : DataService.getDeliveryDetails(),
          status : 'Waiting to be accepted',
          employerId : DataService.getLoginUserId()
        };
        if(DataService.getSelectedStore().unlistedStore == true)
          order.unlisted = true;
          order.storeLocation = DataService.getSelectedStore().location;

        DataService.setOrder(order);
        restApiService.placeOrders(order);
        DataService.setOrderArray(order);
        //DataService.setDeliveryDetails(null);
        DataService.setSelectedStore(null);
        DataService.setSelectedProduct(null);
        DataService.emptyPlaceOrder(null);
        DataService.setDeliveryDetails(null);
        DataService.setBillingInformation(null);
        $scope.billingMode = {
          mode:null,
          information : null,
          defaultServiceFee :  18.75,
          optionalDeliveryInstructions : null
        };
        $scope.serviceFeeBolean = true;

      }
    }
});
