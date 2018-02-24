mobileShop.controller('productReviewController', function ($scope, DataService, restApiService) {
  $scope.productDetail = DataService.getSelectedProduct();
  console.log($scope.productDetail);
  $scope.rating = [0, 1, 2, 3, 4, 5];
  $scope.userRating = [false, false, false, false, false];
  $scope.ratingNumbers = [];
  $scope.voteOn = false;
  $scope.voteOff = false;
  $scope.populateImage = true;
  $scope.multiStarRating = 0;
  $scope.totalViewers = 0;
  $scope.averageRating = 0;
  $scope.productImages = $scope.productDetail.images
  $scope.productRatingData = {
    starRating: 0,
    comments: '',
    vote: null,
    ownerId: DataService.getLoginUserId()
  };
  $scope.commentsFor = [];
  $scope.userPreviousFeedback = {};

  function init() {
    restApiService.getProductRatingCount($scope.productDetail.id, function (val) {
      $scope.ratingNumbers = val;
      console.log(val);
      for (var i = 0; i < $scope.ratingNumbers.length; i++) {
        var multiStarRating = $scope.ratingNumbers[i] * i;
        $scope.multiStarRating += multiStarRating;
        console.log($scope.multiStarRating);
        $scope.totalViewers += $scope.ratingNumbers[i];
        console.log($scope.totalViewers);
      }
      $scope.averageRating = $scope.multiStarRating / $scope.totalViewers;
      console.log($scope.averageRating)

    });
    restApiService.getUserProductRating($scope.productDetail.id, DataService.getLoginUserId()
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
          $scope.productRatingData.comments = $scope.userPreviousFeedback.comments;
          $scope.isRatedBefore = true;
        }
      }, function (err) {
        console.log(err.message);
      });

  }

  init();
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
  }
  $scope.changevoteStatus = function (status) {
    if (status == 'voteUp') {
      if ($scope.voteOn) {
        $scope.voteOn = false;
        $scope.productRatingData.vote = null;
      }
      else {
        $scope.voteOn = true;
        $scope.voteOff = false;
        $scope.productRatingData.vote = true;
      }

    }

    else {
      if ($scope.voteOff) {
        $scope.voteOff = false;
        $scope.productRatingData.vote = null;
      }
      else {
        $scope.voteOn = false;
        $scope.voteOff = true;
        $scope.productRatingData.vote = false;
      }
    }
  };

  $scope.showReviews = function (star) {
    console.log(star);
    restApiService.getProductPerticularRatings($scope.productDetail.id, star, function (data) {
      console.log(data);
      $scope.commentsFor = data;
    }, function (err) {
      console.log(err)
    })
  };

  $scope.setProductRating = function () {
    console.log($scope.productRatingData);
    var count = 0;
    for (var i = 0; i < $scope.userRating.length; i++) {
      if ($scope.userRating[i] == true) {
        count++
      }
    }
    $scope.productRatingData.starRating = count;
    if (!$scope.isRatedBefore)
      restApiService.createProductRating($scope.productDetail.id, $scope.productRatingData);
    else {
      delete $scope.productRatingData.userId;
      $scope.productRatingData.userName = DataService.getLoginUserData();
      restApiService.updateProductRating($scope.productDetail.id, $scope.productRatingData, $scope.userPreviousFeedback.id);
    }
    //$rootScope.changeState('productBrowsing')
  }
});
