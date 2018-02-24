mobileShop.factory('restApiService', function ($http, $rootScope, DataService) {
  var port='http://localhost:3000';
  //var port = 'http://68.7.184.4:3000';
  var _signupUser,
    _loginUser,
    _createStore,
    _getUserStores,
    _getStoreInventory,
    _createStoreInventory,
    _getNearerStores,
    _getCategories,
    _updateCategorySearch,
    _updateStoreReviews,
    _createStoreRating,
    _getUserStoreRating,
    _updateStoreRating,
    _getStoreRatingCount,
    _createProductRating,
    _getUserProductRating,
    _getProductRatingCount,
    _updateProductRating,
    _getProductPerticularRatings,
    _getStorePerticularRatings,
    _placeOrders,
    _getOrders,
    _createShoppingList,
    _getShoppingList,
    _updateShoppingLists,
    _deleteShoppingList,
    _getStoreDetail,
    _updateOrder;

  _signupUser = function (userData) {
    $http.post(port + '/api/Users', userData)
      .success(function (res) {
        $rootScope.showToast('Account Created Successfully');
        console.log(res);
        _loginUser({username: userData.username, password: userData.password}, function (data) {
          console.log(data);
          DataService.setLoginUserData(userData.username);
          DataService.setLoginUserId(data.userId);
          $rootScope.changeState('home');
        }, function (err) {

          console.log(err);
        })
      }).error(function (err) {
        window.plugins.toast.showLongBottom(err.error.message);
        console.log(err);
      })
  };

  _loginUser = function (loginData, successCB, errorCB) {
    $http.post(port + '/api/Users/login', loginData)
      .success(successCB)
      .error(errorCB);
  };


  _createStore = function (storeData, successCB, errorCB) {
    $http.post(port + '/api/storeInventories', storeData).success(successCB).error(errorCB);
  };

  _getUserStores = function (successCB, errorCB) {
    $http.get(port + '/api/storeInventories?filter[where][userId]=' + DataService.getLoginUserId())
      .success(successCB)
      .error(errorCB)
  };

  _getStoreInventory = function (storeId, successCB, errorCB) {
    $http.get(port + '/api/storeInventories/' + storeId + '/products').success(successCB).error(errorCB)
  };

  _createStoreInventory = function (storeId, inventoryData, successCB, errorCB) {
    $http.post(port + '/api/storeInventories/' + storeId + '/products', inventoryData).success(successCB).error(errorCB)
  };

  _getNearerStores = function (lat, lng, successCB, errorCB) {
    var geoPoint = {
      "lat": lat,
      "lng": lng
    };

    $http({
      method: 'GET',
      url: port + '/api/storeInventories/near',
      params: {here: geoPoint}
    }).success(successCB).error(errorCB)
  };
  _getCategories = function (successCB) {
    $http.get(port + '/api/categories').success(successCB).error(function (err) {
      console.log(err);
    })
  };

  $http.get(port + '/api/categories').success(function (data) {
    if (data.length < 1 || data == null) {
      $http.post(port + '/api/categories', {categories: ["Grocery", "Restaurant", "Super Store", "Pharmacy"]}).success(function (data) {
        console.log(data);
      }).error(function (err) {
        console.log(err);
      })
    }
  }).error(function (err) {
    console.log(err);
  });

  _updateCategorySearch = function (keyword) {
    $http.get(port + '/api/categories').success(function (data) {
      var allKeywords = {
        categories: data[0].categories.push(keyword)
      };
      $http.put(port + '/api/categories/' + data[0].id, allKeywords).success(function (data) {
        console.log(data)
      }).error(function (err) {
        console.log(err)
      })
    }).error(function (err) {
      console.log(err);
    })
  };

  _updateStoreReviews = function (storeId, reviews) {
    $http.put(port + '/api/StoreCategories/' + storeId, {reviews: reviews}).success(function (data) {
      console.log(data);
    }).error(function (error) {
      console.log(error);
    })
  };

  _createStoreRating = function (storeId, feedBackData) {
    $http.post(port + '/api/storeInventories/' + storeId + '/ratings', feedBackData).success(function (data) {
      console.log(data);
    }).error(function (err) {
      console.log(err);
    })
  };

  _getUserStoreRating = function (storeId, userId, successCB, errorCB) {
    $http.get(port + '/api/storeInventories/' + storeId + '/ratings?filter[where][ownerId]=' + userId).success(successCB).error(errorCB);
  };
  _updateStoreRating = function (storeId, feedBackData, ratingId) {
    $http.put(port + '/api/storeInventories/' + storeId + '/ratings/' + ratingId, feedBackData).success(function (data) {
      console.log(data);
    }).error(function (err) {
      console.log(err);
    })
  };

  _getStoreRatingCount = function (storeId, successCB) {
    var a = [];

    function getRatingRecursive() {
      $http.get(port + '/api/storeInventories/' + storeId + '/ratings/count?where[starRating]=' + a.length).success(function (data) {
        a.push(data.count);
        if (a.length == 6)
          successCB(a);
        else {
          getRatingRecursive();
        }
      }).error(function (err) {
        console.log(err);
      })
    }

    getRatingRecursive();
  };
  _createProductRating = function (productId, feedBackData) {
    $http.post(port + '/api/products/' + productId + '/ratings', feedBackData).success(function (data) {
      console.log(data);
    }).error(function (err) {
      console.log(err);
    })
  };
  _getUserProductRating = function (productId, userId, successCB, errorCB) {
    $http.get(port + '/api/products/' + productId + '/ratings?filter[where][ownerId]=' + userId).success(successCB).error(errorCB);
  };
  _getProductRatingCount = function (product, successCB) {
    var a = [];

    function getRatingRecursive() {
      $http.get(port + '/api/products/' + product + '/ratings/count?where[starRating]=' + a.length).success(function (data) {
        a.push(data.count);
        if (a.length == 6)
          successCB(a);
        else {
          getRatingRecursive();
        }
      }).error(function (err) {
        console.log(err);
      })
    }

    getRatingRecursive();
  };
  _updateProductRating = function (productId, feedBackData, ratingId) {
    $http.put(port + '/api/products/' + productId + '/ratings/' + ratingId, feedBackData).success(function (data) {
      console.log(data);
    }).error(function (err) {
      console.log(err);
    })
  };
  _getProductPerticularRatings = function (storeId, rating, successCB, errorCB) {
    $http.get(port + '/api/products/' + storeId + '/ratings?filter[where][starRating]=' + rating)
      .success(successCB)
      .error(errorCB)
  };
  _getStorePerticularRatings = function (storeId, rating, successCB, errorCB) {
    $http.get(port + '/api/storeInventories/' + storeId + '/ratings?filter[where][starRating]=' + rating)
      .success(successCB)
      .error(errorCB)
  };
  _placeOrders = function (orders) {
    $http.post(port + '/api/orders/', orders)
      .success(function (data) {
        console.log(data);
       _getShoppingList(DataService.getLoginUserId(), function (data) {
         data[0].carts.splice(DataService.getSelectedShoppingListStoreIndex(),1)
         var shoppingList = data[0];
         _updateShoppingLists(shoppingList)
       })
      })
      .error(function (err) {
        console.log(err)
      })
  };
  _getOrders = function(userId,success,error){
    $http.get(port + '/api/orders/?filter[where][employerId][neq]='+userId)
    //$http.get(port + '/api/orders')
      .success(success)
      .error(error)
  };
  _createShoppingList = function(shoppingList){
    $http.post(port + '/api/shoppingLists/', shoppingList)
      .success(function (data) {
        console.log(data);
        DataService.setShoppingListId(data.id);
        $rootScope.changeState('letsShop');
      })
      .error(function (err) {
        console.log(err);
      })
  };
  _getShoppingList = function(userId,success,error){
    $http.get(port + '/api/shoppingLists?filter[where][userId]='+userId)
      .success(function (data) {
       success(data);
        /*$rootScope.changeState('letsShop');*/
      })
      .error(function (err) {
        error(err);
      })
  };
  _updateShoppingLists = function(shoppingList){
    $http.put(port + '/api/shoppingLists/', shoppingList).success(function (data) {
      console.log(data);
      DataService.setShoppingListId(data.id);
      $rootScope.changeState('viewShoppingList');

    }).error(function (err) {
      console.log(err);
    });
  };
  _deleteShoppingList = function (id){
    if(id==undefined){
      console.log("nothing");
      $rootScope.changeState('letsShop')
    }
    else{
      console.log(id);
      $http.delete(port+'/api/shoppingLists/'+id).success(function(data){
        console.log(data)
        $rootScope.changeState('letsShop')
      }).error(function(err){
        console.log(err)
      })

    }
  };
  _getStoreDetail = function(storeName,successCB,errorCB){
    $http.get(port + '/api/storeInventories?filter[where][storeName]=' + storeName)
      .success(successCB)
      .error(errorCB)
  };
  _updateOrder = function (order) {
    $http.put(port + '/api/orders/', order).success(function (data) {
      console.log(data);
      $rootScope.changeState('orderRequestList')
    }).error(function (err) {
      console.log(err);
    });
  };
  return {
    signupUser: _signupUser,
    loginUser: _loginUser,
    createStore: _createStore,
    getUserStores: _getUserStores,
    getStoreInventory: _getStoreInventory,
    createStoreInventory: _createStoreInventory,
    getNearerStores: _getNearerStores,
    getCategories: _getCategories,
    updateCategorySearch: _updateCategorySearch,
    updateStoreReviews: _updateStoreReviews,
    createStoreRating: _createStoreRating,
    getUserStoreRating: _getUserStoreRating,
    updateStoreRating: _updateStoreRating,
    getStoreRatingCount: _getStoreRatingCount,
    createProductRating: _createProductRating,
    getUserProductRating: _getUserProductRating,
    getProductRatingCount: _getProductRatingCount,
    updateProductRating: _updateProductRating,
    getProductPerticularRatings: _getProductPerticularRatings,
    getStorePerticularRatings: _getStorePerticularRatings,
    placeOrders: _placeOrders,
    getOrders: _getOrders,
    createShoppingList: _createShoppingList,
    getShoppingList : _getShoppingList,
    updateShoppingLists : _updateShoppingLists,
    getStoreDetail : _getStoreDetail,
    deleteShoppingList : _deleteShoppingList,
    updateOrder : _updateOrder
  }
});
