mobileShop.controller('orderRequestListController', function ($scope,$rootScope, DataService, $q, $timeout, restApiService) {
  /*$scope.orderData = [    {name: "Wall-Mart Weekly Grocery:(1.5km)", Time: {hrs: 12, min: 42}},{name: "Fresh & Easy:Bread and Vegies(7km)", Time: {hrs: 4, min: 34}},
    {name: "Wall-Mart Weekly Grocery:(1.5km)", Time: {hrs: 2, min: 6}},
    {name: "Wall-Mart Weekly Grocery:(1.5km)", Time: {hrs: 8, min: 46}}];*/
  function init (){
    $scope.userId = DataService.getLoginUserId();
    restApiService.getOrders($scope.userId,function(orders){
      console.log(orders);
      $scope.orderData = orders;
    },function(error){
      console.log(error)
    })
  }
  init()


  $scope.hoursArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  $scope.showSearchData = false;
  $scope.searchData = {};
  //$scope.deliveryTime = {'time': 0};
  //$scope.hour = null;
  $scope.schedule = {
    hrs: null,
    time: 0
  };
  $scope.search = function () {
    if ($scope.schedule.hrs != null) {
      var matches = $scope.searchDataFun($scope.schedule.hrs, 'hours').then(function (data) {
        $scope.searchData = data;
        $scope.showSearchData = true
      });
    } else if ($scope.schedule.time != 0) {
      var matches = $scope.searchDataFun($scope.schedule.time, 'time').then(function (data) {
        $scope.searchData = data;
        $scope.showSearchData = true
      });
    }
    else {
      $scope.showSearchData = false;
    }
  };
  $scope.searchDataFun = function (searchFilter, searchType) {
    var deferred = $q.defer();
    var matches = $scope.orderData.filter(function (data) {
      if (searchType == 'hours') {
        if (data.deliveryInformation.date.time.hrs <= searchFilter) {
          return true;
        }
      }
      else {
        if (data.deliveryInformation.date.time.min <= searchFilter) {
          return true;
        }
      }
    });
    $timeout(function () {
      deferred.resolve(matches)
    }, 100);
    return deferred.promise

  };
  $scope.goToOrderStatusDetail = function(order){
    console.log(order)
    DataService.setOderDetail(order);
    $rootScope.changeState('viewOrderDetail')
  }

});
