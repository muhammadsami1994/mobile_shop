mobileShop.controller('storeFrontDisplayController', function ($scope, DataService, restApiService, $rootScope) {
  $scope.rating = [0, 1, 2, 3, 4, 5];
  $scope.userRating = [false, false, false, false, false];
  $scope.voteOn = false;
  $scope.voteOff = false;
  $scope.isRatedBefore = false;
  $scope.averageRating = 0;
  $scope.multiStarRating = 0;
  $scope.totalViewers = 0;
  $scope.commentsFor = [];
  $scope.storeRatingData = {
    starRating: 0,
    comments: '',
    vote: null,
    ownerId: DataService.getLoginUserId()
  };
  function init() {
    DataService.emptyPlaceOrder();
    $scope.selectedStoreData = DataService.getSelectedStore();
    console.log($scope.selectedStoreData);
    restApiService.getStoreRatingCount($scope.selectedStoreData.id, function (val) {
      $scope.ratingNumbers = val;
      console.log($scope.ratingNumbers);
      for (var i = 0; i < $scope.ratingNumbers.length; i++) {
        var multiStarRating = $scope.ratingNumbers[i] * i;
        $scope.multiStarRating += multiStarRating;
        $scope.totalViewers += $scope.ratingNumbers[i];
      }
      $scope.averageRating = $scope.multiStarRating / $scope.totalViewers;
    });
    restApiService.getUserStoreRating($scope.selectedStoreData.id, DataService.getLoginUserId()
      , function (data) {
        console.log(data);
        if (data.length != 0) {
          $scope.userPreviousFeedback = data[data.length - 1];
          for (var i = 0; i < $scope.userPreviousFeedback.starRating; i++) {
            $scope.userRating[i] = true;
          }

          if ($scope.userPreviousFeedback.vote)
            $scope.voteOn = true;
          else if ($scope.userPreviousFeedback.vote == false)
            $scope.voteOff = true;
          else if ($scope.userPreviousFeedback.vote == null) {
            $scope.voteOff = false;
            $scope.voteOn = false;
          }
          $scope.storeRatingData.comments = $scope.userPreviousFeedback.comments;
          $scope.isRatedBefore = true;
        }
      }, function (err) {
        console.log(err.message);
      });
  }

  init();

  $scope.changevoteStatus = function (status) {
    if (status == 'voteUp') {
      if ($scope.voteOn) {
        $scope.voteOn = false;
        $scope.storeRatingData.vote = null;
      }
      else {
        $scope.voteOn = true;
        $scope.voteOff = false;
        $scope.storeRatingData.vote = true;
      }

    }

    else {
      if ($scope.voteOff) {
        $scope.voteOff = false;
        $scope.storeRatingData.vote = null;
      }
      else {
        $scope.voteOn = false;
        $scope.voteOff = true;
        $scope.storeRatingData.vote = false;
      }
    }
  };

  $scope.changeRating = function (index) {
    if ($scope.userRating[index] == false) {
      for (var i = 0; i <= index; i++) {
        $scope.userRating[i] = true;
      }
    }
    else {
      for (var j = $scope.userRating.length - 1; j > index; j--) {
        $scope.userRating[j] = false;
      }
    }
  };
  $scope.setStoreRating = function () {
    var count = 0;
    for (var i = 0; i < $scope.userRating.length; i++) {
      if ($scope.userRating[i] == true) {
        count++
      }
    }
    $scope.storeRatingData.starRating = count;
    if (!$scope.isRatedBefore) {
      $scope.storeRatingData.userName = DataService.getLoginUserData();
      restApiService.createStoreRating($scope.selectedStoreData.id, $scope.storeRatingData);
    } else {
      delete $scope.storeRatingData.userId;
      $scope.storeRatingData.userName = DataService.getLoginUserData();
      restApiService.updateStoreRating($scope.selectedStoreData.id, $scope.storeRatingData, $scope.userPreviousFeedback.id);
    }
  };
  $scope.showReviews = function (star) {
    console.log(star);
    restApiService.getStorePerticularRatings($scope.selectedStoreData.id, star, function (data) {
      console.log(data);
      $scope.commentsFor = data
    }, function (err) {
      console.log(err)
    })
  };
  $scope.changeState = function () {
    $rootScope.changeState('productBrowsing')
  }

});
