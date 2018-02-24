mobileShop.controller('addEditInventoryController', function ($scope, $rootScope, restApiService, DataService, $timeout, uploadImageService, $http) {
    $scope.productImages = [];
    $scope.productTypeOptions = ['Retail'];
    $scope.inventoryData = {
      productName: '',
      productType: '',
      weight: '',
      description: '',
      price: '',
      storeLocation: '',
      images: []
    };
    $scope.code = {};
    $scope.populateImage = false;
    $scope.addInventory = function (form) {
      if (form.$valid) {
        restApiService.createStoreInventory(DataService.getStoreData().id, $scope.inventoryData, function (res) {
          console.log(res);
          $rootScope.changeState('manageStoreInventory');
          var storeInventory = DataService.getStoreInventory();
          storeInventory.push(res);
          DataService.setStoreInventory(storeInventory);
          $rootScope.showToast('Product is added to your store');
          $scope.inventoryData = {};
        }, function (err) {
          $rootScope.showToast(err.error.message);
          console.log(err);
        })
      }
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
    $scope.searchForProduct = function () {
      console.log($scope.code);
      if ($scope.code.productCode != undefined) {
        $http.get('http://eandata.com/feed/?v=3&keycode=2529A48E55F715A9&mode=json&find=' + $scope.code.productCode)
          .success(function (data) {
            console.log(data);
            $scope.inventoryData.productName = data.product.attributes.product;
            $scope.inventoryData.productType = '';
            $scope.inventoryData.weight = parseInt(data.product.attributes.description);
            $scope.inventoryData.description = data.product.attributes.long_desc;
            $scope.inventoryData.price = Number(data.product.attributes.price_new);
            $scope.inventoryData.storeLocation = '';
            $scope.inventoryData.images = [];
          }).error(function (err) {
            console.log(err)
          })
      } else if ($scope.code.stockKu != undefined) {
        $http.get('http://eandata.com/feed/?v=3&keycode=2529A48E55F715A9&mode=json&find=' + $scope.code.stockKu)
          .success(function (data) {
            console.log(data);
            $scope.inventoryData.productName = data.product.attributes.product;
            $scope.inventoryData.productType = '';
            $scope.inventoryData.weight = data.product.attributes.description;
            $scope.inventoryData.description = data.product.attributes.long_desc;
            $scope.inventoryData.price = data.product.attributes.price_new;
            $scope.inventoryData.storeLocation = '';
            $scope.inventoryData.images = [];

          }).error(function (err) {
            console.log(err)
          })
      }
      $scope.takePicture = function () {
        uploadImageService.takePicture(onSuccess, onFail);
        function onSuccess(imageData) {
          console.log(imageData);
          $scope.productImages.push(imageData);
          $scope.$apply($scope.productImages);
          $scope.populateImage = false;
          $scope.$digest($scope.populateImage);
          $timeout(function () {
            $scope.populateImage = true;
            $scope.$digest($scope.populateImage);
          }, 100)

        }

        function onFail(message) {
          alert('Failed because: ' + message);
        }
      }
    }
  }
);

//0049000006582
/*
 asin_com: "B004JXDCC2"
 binding: "Grocery"
 brand: "Coca-Cola"
 category: "19"
 category_text: "Beverages"
 category_text_long: "Food: Beverages"
 description: "12oz Can"
 features: "<ul><li>Diet Coke is the most popular sugar-free soft drink in America</li><li>It's the original sparkling beverage for those who want great flavor without the calories</li></ul>"
 ingredients: "Carbonated Water, Caramel Color, Aspartame, Phosphoric Acid, Potassium Benzoate (To Protect Taste), Natural Flavors, Citric Acid, Caffeine, Phenylketonurics: Contains Phenylalanine"
 language: "553"
 language_text: "en"
 language_text_long: "English"
 long_desc: "Diet Coke is the most popular sugar-free soft drink in America. It's the original sparkling beverage for those who want great flavor without the calories—a drink for those with great taste."
 price_new: "8.0000"
 price_new_extra: "USD"
 price_new_extra_id: "537"
 price_new_extra_long: "US Dollars"
 product: "Diet Coke, 12-Ounce Cans (Pack Of 24)"
 serving_size: "12 fl oz"
 servings_per: "6.0000"
 similar: "0049000001327, 5449000131836, 0049000006346, 0049000042528, 0049000001310, 0049000012507"
 sodium: "40.0000"
 sodium_extra: "mg"
 sodium_extra_id: "517"
 sodium_extra_long: "milligrams"
 */
