mobileShop.controller('orderStatusDetailController', function ($scope, DataService, restApiService) {

  $scope.convertLatLngToString = function(position){
    return position.lat.toString()+" "+position.lng.toString()
  }

  function init() {
    $scope.orderStatusDetail = DataService.getSelectedActiveOrder();
    $scope.deliveryPoint = $scope.convertLatLngToString($scope.orderStatusDetail.deliveryInformation.position);
    if($scope.orderStatusDetail.unlisted == true){
      $scope.storeLocation= $scope.convertLatLngToString($scope.orderStatusDetail.storeLocation);
      initMap();
    }else{
      restApiService.getStoreDetail($scope.orderStatusDetail.storeName,function(data){
        $scope.storeData = data[0];
        $scope.storeLocation= $scope.convertLatLngToString($scope.storeData.location);
        //$scope.deliveryPoint = $scope.convertLatLngToString($scope.orderStatusDetail.deliveryInformation.position);
        initMap();
      },function(err){
        console.log(err);
      });
    }

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
        origin: '24.8625382 67.05435050000006',
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

});
