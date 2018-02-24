// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var mobileShop=angular.module('mobileShop', ['ionic','countrySelect','google.places','ionic-timepicker','angularFileUpload'])

    .run(function($ionicPlatform,$state,$rootScope) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
        $rootScope.changeState=function(state){
            $state.go(state);
        };
        $rootScope.showIcons=false;
        $rootScope.showTabs=false;
        $rootScope.storeInventory=false;
        $rootScope.backState=function(){
            history.back();
        };
        $rootScope.showToast=function(msg){
          /*  window.plugins.toast.showShortBottom(msg);*/
        }
    });

