mobileShop.controller('addStoreController', function ($scope, FileUploader, restApiService, DataService, $rootScope, AutoCompleteService, $timeout, GooglePlaceService, uploadImageService) {

  $scope.inventoryData = {};
  $scope.storeInfo = ["Store Name", "Description", "#Phone"];
  $scope.storeAddress = ["Address", "State", "Country", "Postal Code"];
  $scope.storeTags = '';
  $scope.categoryOptionFlag = false;
  $scope.errorForCountry = false;
  function init() {
    restApiService.getCategories(function (data) {
      $scope.categoryOptions = data[0].categories;
    })
  }

  init();
  $scope.CategoryData = {
    "categoryMatches": [],
    "search": ''
  };

  $scope.locationData = {
    lat: '',
    long: ''
  };

  $scope.storeData = {
    storeName: '',
    description: '',
    phone: null,
    location: '',
    address: '',
    country: '',
    postalCode: null,
    Category: '',
    tags: [],
    industry: '',
    date: '',
    userId: DataService.getLoginUserId()
  };

  $scope.getCurrentLocation = function () {
    GooglePlaceService.getCoordinates(function (err, position) {
      if (err)
        console.log(err);
      else {
        $scope.locationData.lat = position.coords.latitude;
        $scope.locationData.long = position.coords.longitude;
      }
    })
    /* var coordinates = GooglePlaceService.getCoordinates();
     console.log(coordinates)*/
    /*$scope.locationData.lat = coordinates.coords.latitude;
     $scope.locationData.long = coordinates.coords.longitude;*/
    /* navigator.geolocation.getCurrentPosition(function(position){
     $scope.locationData.lat=position.coords.latitude;
     $scope.locationData.long=position.coords.longitude;

     },function(err){
     alert(err.message)
     });*/
  };

  $scope.createStore = function (form) {
    if ($scope.storeData.country == '') {
      $scope.errorForCountry = true
    } else {
      if (form.$valid) {
        $scope.errorForCountry = false
        console.log(form);
        console.log($scope.storeData);

        for (var i = 0; i < $scope.categoryOptions.length; i++) {
          if ($scope.categoryOptions[i] == $scope.CategoryData.search) {
            $scope.categoryOptionFlag = true;
            break;
          }
        }
        if ($scope.categoryOptionFlag == false) {
          restApiService.updateCategorySearch($scope.CategoryData.search);
        }
        $scope.storeData.location = $scope.locationData.lat + ',' + $scope.locationData.long;
        var date = new Date();
        $scope.storeData.date = date.toDateString();
        $scope.storeData.tags = $scope.storeTags.split(';');
        $scope.storeData.Category = $scope.CategoryData.search;
        restApiService.createStore($scope.storeData, function (res) {
          console.log(res);
          $scope.storeData = {};
          $scope.storeTags = '';
          $rootScope.showToast('Store Created Successfully');
          $rootScope.changeState('storeInventory');
        }, function (err) {
          $rootScope.showToast(err.error.message);
          console.log(err);
        })
      }
    }
  };

  $scope.searchCategory = function () {
    if ($scope.CategoryData.search == "") {
      $scope.CategoryData.categoryMatches = [];
    }
    else {
      AutoCompleteService.search($scope.CategoryData.search, $scope.categoryOptions, "categorySearch").then(
        function (matches) {
          $scope.CategoryData.categoryMatches = matches;
        }
      )
    }
  };

  $scope.selectFromOptions = function (value) {
    $scope.CategoryData.search = value;
    $scope.CategoryData.categoryMatches = [];
  };

  $scope.closeSuggestionWindow = function () {
    $scope.CategoryData.categoryMatches = [];
  };

  $scope.selectImages = function () {

    uploadImageService.selectImage(function (err, image) {
      if (err)
        console.log(err);
      else {
        $scope.inventoryData.images = image.images;
        $scope.productImages = image.productImages;

        $scope.$apply($scope.productImages);
        $scope.populateImage = false;
        $scope.$digest($scope.populateImage);
        $timeout(function () {
          $scope.populateImage = true;
          $scope.$digest($scope.populateImage);
        }, 100)
      }
    });
    /*window.imagePicker.getPictures(
     function(results) {
     console.log(results);
     results.forEach(function(result){
     $scope.inventoryData.images.push(result);
     $scope.productImages.push(result);
     });

     $scope.$apply($scope.productImages);
     $scope.populateImage = false;
     $scope.$digest($scope.populateImage);
     $timeout(function(){
     $scope.populateImage = true;
     $scope.$digest($scope.populateImage);
     },100)
     }, function (error) {
     console.log('Error: ' + error);
     }
     );*/
  };


});
