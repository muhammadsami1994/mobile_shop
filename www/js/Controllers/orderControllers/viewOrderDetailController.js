mobileShop.controller('viewOrderDetailController', function ($scope, DataService, restApiService, $rootScope) {
  $scope.shoppingCost = 0;
  $scope.convertLatLngToString = function (position) {
    return position.lat.toString() + " " + position.lng.toString()
  };
  function init() {
    $scope.orderData = DataService.getOrderDetail();
    console.log($scope.orderData);
    for (var i = 0; i < $scope.orderData.product.length; i++) {
      $scope.shoppingCost += $scope.orderData.product[i].price
    }
    $scope.storeData = $scope.orderData
    $scope.storeLocation = $scope.convertLatLngToString($scope.storeData.storeLocation);
    $scope.deliveryPoint = $scope.convertLatLngToString($scope.orderData.deliveryInformation.position);
    initMap();
    function initMap() {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}
      });
      directionsDisplay.setMap(map);
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      directionsService.route({
        origin: $scope.storeLocation,
        destination: $scope.deliveryPoint,
        travelMode: google.maps.TravelMode.DRIVING
      }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }

  init();
  $scope.orderDetailData = [
    {key: "Shopping Cost", value: "$108.12"}
    , {key: "Total Distance", value: "2.3(km)"}
    , {key: "Number of Items", value: "4"}
    , {key: "Service Fee", value: "$23.44(meets recommendation)"}];

  $scope.orderItems = ["Sweet Naval Oranges(2 lbs)(1 qty)", "Bananas (3.5 lbs) (2 qty)", "Gallon Milk, 2% Fat Free (1 qty)"]
  $scope.acceptOrder = function () {
    console.log('order accepted')
    $rootScope.changeState('orderProcessingView')
  }
});
