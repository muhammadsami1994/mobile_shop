mobileShop.controller('loginController',function($scope,$rootScope,restApiService,DataService){
    $scope.socialLogins=["Facebook","Linkedin","Twitter","Flicker","Google+","Yelp","New Account"];

    $scope.checkState=function(value){
        if(value=="New Account")
            $rootScope.changeState('signUp')
    };
    $scope.loginData={
        username:'',
        password:''
    }

    $scope.login=function(){
        console.log('clicked');
        restApiService.loginUser($scope.loginData,function(data){
            console.log(data);
            DataService.setLoginUserData($scope.loginData.username);
            DataService.setLoginUserId(data.userId);
            $rootScope.showToast('Login Successful');
            $rootScope.changeState('home');
        },function(err){
            $rootScope.showToast(err.error.message);
            console.log(err);
        });
    }

});
