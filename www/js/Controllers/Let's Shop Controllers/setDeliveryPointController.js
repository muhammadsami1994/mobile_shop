mobileShop.controller('setDeliveryPointController',function($scope,GooglePlaceService,$rootScope,DataService){
  console.log("loaded");
  $scope.locations=["My Home","My Current Location","Existing Location","New Location"];
  $scope.monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  $scope.Dates = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  $scope.Years = [];
  $scope.scopeValue = '';
  $scope.currentYear = new Date();
  $scope.count = $scope.currentYear.getFullYear();
  $scope.deliveryName = false;
  $scope.deliverySchedule = false;
  $scope.schedule = {
    month:null,
    date:null,
    year:null,
    time:null
  };
  $scope.deliveryDetails= {
    destinationName:null,
    date:$scope.schedule,
    locationData:{},
    position : {
      lat : null,
      lng : null
    }
  };
  /*$scope.locationData = {
    lat:'',
    long: ''
  };*/


  for(var i = 1 ;i<=20;i++){

    $scope.Years.push($scope.count++)
  }

  $scope.scopeFunc = function(val){
    console.log(val);
    if(val == "My Current Location"){
      GooglePlaceService.getCoordinates(function(err,position){
        if(err)
          console.log(err);
        else
          console.log(position);
          $scope.deliveryDetails.destinationName = val;
          $scope.deliveryDetails.position.lat= position.coords.latitude;
          $scope.deliveryDetails.position.lng= position.coords.longitude;

      });
      $scope.deliveryName = false;
    }else{
      $scope.deliveryDetails.destinationName = val;
      $scope.deliveryName = false;

    }


  };

  $scope.timePickerCallback = function (val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      var selectedTime = new Date(val * 1000);
      var pmOrAm = '';
      if(selectedTime.getUTCHours() == 0 || selectedTime.getUTCHours() < 12)
        pmOrAm = 'AM';
      else
        pmOrAm = 'PM';
      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(),':',pmOrAm, 'in UTC');
      if(selectedTime.getUTCMinutes()<10)
        $scope.schedule.time = {hrs:selectedTime.getUTCHours(),min:selectedTime.getUTCMinutes()};
      else
        $scope.schedule.time = {hrs:selectedTime.getUTCHours(),min:selectedTime.getUTCMinutes()}
    }
  };

  $scope.timePickerObject = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
    step: 15,  //Optional
    format: 12,  //Optional
    titleLabel: '12-hour Format',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Close',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      $scope.timePickerCallback(val);
    }
  };

  $scope.addToCart = function(){
    if($scope.deliveryDetails.destinationName == null){
      $scope.deliveryName = true
    }else{$scope.deliveryName = false}

    if($scope.schedule.date == null || $scope.schedule.month == null || $scope.schedule.year == null){
      $scope.deliverySchedule = true
    }else{
      $scope.deliverySchedule = false;
      console.log($scope.deliveryDetails);
      DataService.setDeliveryDetails($scope.deliveryDetails);
      $scope.deliveryDetails = {
        destinationName:null,
        date:null,
        locationData: null
      };
      $scope.schedule = {
        month:null,
        date:null,
        year:null,
        time:null
      };
      $rootScope.changeState('setBillingInfo')
    }



  }
});
