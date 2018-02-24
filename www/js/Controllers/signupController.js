mobileShop.controller('signupController',function($scope,$rootScope,restApiService,$ionicPopup,ImageService,GooglePlaceService){
    var errorPopup;
    $scope.inputLabels=['username',"First Name","Last Name","My Location","Phone#","Email"];
    $scope.socialProfiles=["Facebook","Linkedin","Twitter","Flicker","Google+"];
    $scope.profileImage='img/loginLogo.png';
    $scope.userData={
        username:'',
        firstName:'',
        lastName:'',
        location:'',
        phone:"",
        email:'',
        password:'',
        image:ImageService.imageBase64
    };

    $scope.getUserCurrentLocation=function(){
        GooglePlaceService.getUsertLocation(function(err,result,status){
            if(err)
             console.log(err);
             else if(result) {
                console.log(result);
                $scope.userData.location = result[1].formatted_address;
            }
             else
             console.log(status);
            //console.log(ab)
        })
        /*navigator.geolocation.getCurrentPosition(function(position){
            var latLog = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'latLng': latLog}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results);
                    $scope.userData.location=results[1].formatted_address
                } else {
                    console.log(status)
                }
            });
        },function(err){
            $scope.showPopup('TimeOut Expired');
            console.log(err)
        },{maximumAge: 0, timeout: 2000, enableHighAccuracy:true});*/
    };

    $scope.selectPicture=function(val){
        var sourceType;
        if(val=='takePic'){
            navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType:navigator.camera.PictureSourceType.CAMERA
            });
        }
        else{
            navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY
            });
        }
        function onSuccess(imageData) {
            console.log(imageData);
            $scope.profileImage="data:image/jpeg;base64," + imageData;
            $scope.$apply($scope.profileImage);
            $scope.userData.image=imageData;
        }
        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };
    $scope.signup=function(form){
      console.log(form);
        if(form.$valid){
        console.log(form);
        console.log($scope.userData);
            restApiService.signupUser($scope.userData);
        }
        /*if($scope.userData.username=="")
            $rootScope.showToast('username required');
        else if($scope.userData.firstName=="")
            $rootScope.showToast('Name can not be null');
        else if($scope.userData.email=="")
            $rootScope.showToast('Email is required');
        else if($scope.userData.password=="")
            $rootScope.showToast('Password is empty');
        else{
            restApiService.signupUser($scope.userData);
        }*/
    };

    $scope.showPopup = function(title) {
        errorPopup = $ionicPopup.show({
            templateUrl: 'templates/errorModel.html',
            title: title,
            scope: $scope
        })
    };
    $scope.closePopup=function(){
        errorPopup.close();
    };


    $scope.getUserCurrentLocation();
});
