mobileShop.controller("directionToOrderController", function ($scope, GooglePlaceService,DataService) {
  $scope.convertLatLngToString = function (position) {
    return position.lat.toString() + " " + position.lng.toString()
  };
  $scope.position = {};
  function init() {
    GooglePlaceService.getCoordinates(function (err, position) {
      if (err)
        console.log(err);
      else
        console.log(position);
      $scope.position.lat = position.coords.latitude;
      $scope.position.lng = position.coords.longitude;
      $scope.orderData = DataService.getOrderDetail();
      $scope.storeData = $scope.orderData;
      $scope.reciepentLocation = $scope.convertLatLngToString($scope.storeData.deliveryInformation.position);
      $scope.myLocation = $scope.convertLatLngToString($scope.position);
      initMap();
    });

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
        origin: $scope.reciepentLocation,
        destination: $scope.myLocation,
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

  init()
});
