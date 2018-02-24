mobileShop.controller("letsShopController",function($scope,$rootScope,GooglePlaceService,GoogleMapAPI,restApiService,DataService,AutoCompleteService,$ionicPopup,$timeout){

    var errorPopup;
    $rootScope.showTabs=true;
    $scope.allStoreShowing=false;
    $scope.unlistedMarkers=[];
    $scope.listedMarkers=[];
    $scope.selectedStore=[];
    $scope.filterStores=[];
    $scope.unlistedStoreData=[];
    $scope.combineStores = [];
    $scope.allStores = [];
    $scope.searchLocation='';
    $scope.searchStoreMarker=[];
    $scope.storeSearchData={
        storeMatches:[],
        search:''
    };
    $scope.CategoryData = {
        "categoryMatches": [],
        "search": ''
    };
    $scope.errorMessage='';



    //getting Categories to show in auto complete;
    function init(){
        restApiService.getCategories(function(data){
            $scope.categoryOptions=data[0].categories;
        })
    };
    init();

    //Create Google map and marker on it nearer to user current location.
    $scope.userCurrentLocation=function(){
      GooglePlaceService.getCoordinates(function(err,position){
        if(err){
          $scope.errorMessage='Kindly Enable your GPS to find the your current location';
          $scope.showPopup('TimeOut Expired');
        }
        else{
          $scope.initializeMap(position.coords.latitude,position.coords.longitude);
        }
      });
       /* navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            $scope.initializeMap(position.coords.latitude,position.coords.longitude);

        },function(err){
            $scope.errorMessage='Kindly Enable your GPS to find the your current location';
            $scope.showPopup('TimeOut Expired');
        },{maximumAge: 0, timeout: 2000, enableHighAccuracy:true})*/
    };

    $scope.initializeMap=function(lat,lng){
        GoogleMapAPI.mapInitialize(new google.maps.LatLng(lat,lng));
        restApiService.getNearerStores(lat,lng,function(stores){
            console.log(stores);
            $scope.allStores = stores.store;

            for(var i=0;i<stores.store.length;i++){
                GoogleMapAPI.createMarker(new google.maps.LatLng(stores.store[i].location.lat,stores.store[i].location.lng),stores.store[i],
                    function(marker){
                        $scope.listedMarkers.push(marker)
                    },function(store){
                        DataService.setSelectedStore(store);
                    }
                )
            }
            if($scope.allStoreShowing){
                $scope.showAllStores();
            }



        },function(err){
            console.log(err);
        });
    };

    $scope.createMarker=function(){
        GoogleMapAPI.createMarker(new google.maps.LatLng(-25.363882,131.044922));
    };


//show all stores also from google or not.
    $scope.UnlistedStore=function(model){
        $scope.allStoreShowing=model;
        if(model==true)
            $scope.showAllStores();
        if(model==false)
            $scope.hideAllStores();
    };
    $scope.showAllStores=function(){
        $scope.combineStores=[];
        $scope.unlistedMarkers=[];
        $scope.combineStores=$scope.combineStores.concat($scope.allStores);
        GoogleMapAPI.allPlaces(function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var unlistedStoreData={
                        storeName:results[i].name,
                        address:results[i].formatted_address,
                        location:{
                            lat:results[i].geometry.location.J,
                            lng:results[i].geometry.location.M
                        },
                        unlistedStore:true
                    };

                    $scope.combineStores.push(unlistedStoreData);
                    GoogleMapAPI.createMarker(results[i].geometry.location,unlistedStoreData,function(marker){
                        $scope.unlistedMarkers.push(marker);
                        if($scope.storeSearchData.search!="" || $scope.CategoryData.search!=""){
                            $scope.filterStore();
                        }
                    },function(store){
                      var geocoder = new google.maps.Geocoder();
                      var address = store.address;

                      geocoder.geocode( { 'address': address}, function(results, status) {

                        if (status == google.maps.GeocoderStatus.OK) {
                          var latitude = results[0].geometry.location.lat();
                          var longitude = results[0].geometry.location.lng();
                          store.location.lat = latitude;
                          store.location.lng = longitude
                        }
                      });
                        DataService.setSelectedStore(store);
                    });
                }
            }
        })
    };

    $scope.hideAllStores=function(){
        GoogleMapAPI.removeMarker($scope.unlistedMarkers);
    };


//Auto complete function for categories.
    $scope.searchCategory = function() {
        if($scope.CategoryData.search==""){
            $scope.CategoryData.categoryMatches=[];
        }
        else{
            AutoCompleteService.search($scope.CategoryData.search,$scope.categoryOptions,"categorySearch").then(
                function(matches) {
                    $scope.CategoryData.categoryMatches = matches;
                }
            )
        }
    };
    $scope.selectFromOptions=function(value){
        $scope.CategoryData.search=value;
        $scope.CategoryData.categoryMatches=[];
    };
    $scope.selectStoreFromOptions=function(value){
        $scope.storeSearchData.search=value;
        $scope.storeSearchData.storeMatches=[];
    };

    $scope.locationAutoComplete=function(){
        var input=document.getElementById('input');
        var autoComplete=new google.maps.places.Autocomplete(input);
        $timeout(function(){
            var googleMapElementAutoComplete = angular.element(document.getElementsByClassName('pac-container')[0]);
            var googleMapPlaceHolderForDrawer = angular.element(document.getElementById("places-dropDown"));
            angular.element(document.getElementsByClassName('pac-container')[0]).remove();
            googleMapPlaceHolderForDrawer.append(googleMapElementAutoComplete);
        },100);
        //autocomplete.bindTo('bounds', map);
    };

    //auto complete function for stores.
    $scope.searchStores=function(){
        if($scope.storeSearchData.search==""){
            $scope.storeSearchData.storeMatches=[];
        }

        else{
            if($scope.allStoreShowing==true){
                AutoCompleteService.search($scope.storeSearchData.search,$scope.combineStores,"storeSearch").then(
                    function(matches) {
                        for(var j=0;j<matches.length;j++){
                            for(var i=0;i<j;i++){
                                if(matches[i].storeName.toLowerCase()==matches[j].storeName.toLowerCase()){
                                    matches.splice(j,1);
                                    j--;
                                    console.log(matches)
                                }
                            }
                        }
                        $scope.storeSearchData.storeMatches = matches;
                    }
                )
            }

            if($scope.allStoreShowing==false){
                AutoCompleteService.search($scope.storeSearchData.search,$scope.allStores,"storeSearch").then(
                    function(matches) {
                        for(var j=0;j<matches.length;j++){
                            for(var i=0;i<j;i++){
                                if(matches[i].storeName.toLowerCase()==matches[j].storeName.toLowerCase()){
                                    matches.splice(j,1);
                                    j--;
                                    console.log(matches)
                                }
                            }
                        }
                        $scope.storeSearchData.storeMatches = matches;
                    }
                )
            }
        }


    };



    $scope.hideOptionWindow=function(windowType){
        if(windowType=="storeName")
            $scope.storeSearchData.storeMatches=[];
        if(windowType=="category")
            $scope.CategoryData.categoryMatches=[];
    };

    $scope.checkLocation=function(){
        if($scope.searchLocation!=""){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': $scope.searchLocation.formatted_address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $scope.searchLocation="";
                    $scope.initializeMap(results[0].geometry.location.A,results[0].geometry.location.F)
                }
                if(status==google.maps.GeocoderStatus.ZERO_RESULTS) {
                    $scope.errorMessage='Invalid location name';
                    $scope.showPopup('Location Error');
                }
            });
        }
        else{
            $scope.filterStore();
        }
    };

    //filter stores according user search and create marker on google map.
    $scope.filterStore=function(){
        var filterData,createMarker=true;
        if($scope.allStoreShowing)
            filterData=$scope.combineStores;
        else
            filterData=$scope.allStores;
        $scope.filterStores=[];


        if($scope.storeSearchData.search!="" && $scope.CategoryData.search==""){
            for(var i=0;i<filterData.length;i++){
                if(filterData[i].storeName.toLowerCase()==$scope.storeSearchData.search.toLowerCase()){
                    $scope.filterStores.push(filterData[i])
                }
            }
        }

        if($scope.storeSearchData.search=="" && $scope.CategoryData.search!=""){
            for(var i=0;i<filterData.length;i++){
                if(filterData.Category.toLowerCase()==$scope.CategoryData.search.toLowerCase()){
                    $scope.filterStores.push(filterData[i])
                }
            }
        }

        if($scope.storeSearchData.search!="" && $scope.CategoryData.search!=""){
            for(var i=0;i<filterData.length;i++){
                if(filterData.storeName.toLowerCase()==$scope.storeSearchData.search.toLowerCase() && $scope.allStores[i].Category.toLowerCase()==$scope.CategoryData.search.toLowerCase()){
                    $scope.filterStores.push(filterData[i])
                }
            }
        }

        if($scope.storeSearchData.search=="" && $scope.CategoryData.search==""){
            createMarker=false;
            GoogleMapAPI.removeMarker($scope.searchStoreMarker);
            GoogleMapAPI.showMarkers($scope.listedMarkers);
            if($scope.allStoreShowing){
                GoogleMapAPI.showMarkers($scope.unlistedMarkers);
            }
        }

        if(createMarker){
            GoogleMapAPI.removeMarker($scope.unlistedMarkers);
            GoogleMapAPI.removeMarker($scope.listedMarkers);
            GoogleMapAPI.removeMarker($scope.searchStoreMarker);
            for( var j=0;j<$scope.filterStores.length;j++){
                GoogleMapAPI.createMarker(new google.maps.LatLng($scope.filterStores[j].location.lat,$scope.filterStores[j].location.lng),$scope.filterStores[j],
                    function(marker){
                        $scope.searchStoreMarker.push(marker)
                    },function(store){
                        DataService.setSelectedStore(store);
                    }
                )
            }
        }

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

    $scope.userCurrentLocation();
});



