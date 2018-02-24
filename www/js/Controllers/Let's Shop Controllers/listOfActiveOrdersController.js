mobileShop.controller('listOfActiveOrdersController',function($scope, restApiService, DataService,$rootScope){

  $scope.order = [];
  function init(){
    restApiService.getOrders(DataService.getLoginUserId(),function(data){
      console.log(data);
      $scope.order = data
    },function(err){
      console.log(err)
    })
  }
  init();
  $scope.setSelectedActiveOrder = function(order,state){
    DataService.setSelectedActiveOrder(order);
    $rootScope.changeState(state);
  }
});
