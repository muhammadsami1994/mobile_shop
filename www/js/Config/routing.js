mobileShop.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
    $ionicConfigProvider.views.forwardCache(true);
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "templates/login.html",
            controller:"loginController"


        }).state('signUp', {
            url: "/signUp",
            templateUrl: "templates/signUp.html",
            controller:"signupController"

        }).state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller:"homeController",
            cache:false

        }).state('orderDeliveries', {
            url: "/orderDeliveries",
            templateUrl: "templates/ordersTemplate/OrderDeliveries.html",
            controller:"orderDeliveriesController"

        }).state('orderRequestList', {
            url: "/orderRequestList",
            templateUrl: "templates/ordersTemplate/orderRequestList.html",
            controller:"orderRequestListController",
            cache:false

        }).state('deliveryHistory', {
            url: "/deliveryHistory",
            templateUrl: "templates/ordersTemplate/deliveryHistory.html",
            controller:"deliveryHistoryController"

        }).state('acceptedOrders', {
            url: "/acceptedOrders",
            templateUrl: "templates/ordersTemplate/acceptedOrders.html",
            controller:"acceptedOrdersController"

        }).state('viewOrderDetail', {
            url: "/viewOrderDetail",
            templateUrl: "templates/ordersTemplate/viewOrderDetail.html",
            controller:"viewOrderDetailController",
            cache : false

        }).state('orderProcessingView', {
            url: "/orderProcessingView",
            templateUrl: "templates/ordersTemplate/orderProcessingView.html",
            controller:"orderProcessingViewController"

        }).state('directionToStore', {
            url: "/directionToStore",
            templateUrl: "templates/ordersTemplate/directionToStore.html",
            controller:"directionToStoreController",
            cache:false

        }).state('shoppingCheckList', {
            url: "/shoppingCheckList",
            templateUrl: "templates/ordersTemplate/shoppingCheckList.html",
            controller:"shoppingCheckListController",
            cache : false

        }).state('attachReciept', {
            url: "/attachReciept",
            templateUrl: "templates/ordersTemplate/attachReciept.html",
            controller:"attachRecieptController"

        }).state('directionToOrder', {
            url: "/directionToOrder",
            templateUrl: "templates/ordersTemplate/directionToOrder.html",
            controller:"directionToOrderController"

        }).state('nextPay', {
            url: "/nextPay",
            templateUrl: "templates/ordersTemplate/nextPay.html",
            controller:"nextPayController"

        }).state('letsShop', {
            url: "/letsShop",
            templateUrl: "templates/Let's Shop/letsShop.html",
            controller:"letsShopController",
            cache:false

        }).state('storeFrontDisplay', {
            url: "/storeFrontDisplay",
            templateUrl: "templates/Let's Shop/storeFrontDisplay.html",
            controller:"storeFrontDisplayController",
            cache:false

        }).state('productBrowsing', {
            url: "/productBrowsing",
            templateUrl: "templates/Let's Shop/productBrowsing.html",
            controller:"productBrowsingController",
            cache:false

        }).state('productDetail', {
            url: "/productDetail",
            templateUrl: "templates/Let's Shop/productDetail.html",
            controller:"productDetailController",
            cache:false
        }).state('productReview', {
            url: "/productReview",
            templateUrl: "templates/Let's Shop/productReview.html",
            controller:"productReviewController",
            cache:false
        }).state('manualOrderEntry', {
            url: "/manualOrderEntry",
            templateUrl: "templates/Let's Shop/manualOrderEntry.html",
            controller:"manualOrderEntryController",
            cache:false
        }).state('addItemDetail', {
            url: "/addItemDetail",
            templateUrl: "templates/Let's Shop/addItemDetail.html",
            controller:"addItemDetailController",
            cache:false
        }).state('viewShoppingList', {
            url: "/viewShoppingList",
            templateUrl: "templates/Let's Shop/viewShoppingList.html",
            controller:"viewShoppingListController",
            cache : false
        }).state('shoppingListDetail', {
            url: "/shoppingListDetail",
            templateUrl: "templates/Let's Shop/shoppingListDetail.html",
            controller:"shoppingListDetailController",
            cache : false
        }).state('viewShoppingCart', {
            url: "/viewShoppingCart",
            templateUrl: "templates/Let's Shop/viewShoppingCart.html",
            controller:"viewShoppingCartController",
            cache:false
        }).state('setDeliveryPoint', {
            url: "/setDeliveryPoint",
            templateUrl: "templates/Let's Shop/setDeliveryPoint.html",
            controller:"setDeliveryPointController",
            cache:false
        }).state('setBillingInfo', {
            url: "/setBillingInfo",
            templateUrl: "templates/Let's Shop/setBillingInfo.html",
            controller:"setBillingInfoController"
        }).state('listOfActiveOrders', {
            url: "/listOfActiveOrders",
            templateUrl: "templates/Let's Shop/listOfActiveOrders.html",
            controller:"listOfActiveOrdersController",
            cache : false
        }).state('changeServiceFee', {
            url: "/changeServiceFee",
            templateUrl: "templates/Let's Shop/changeServiceFee.html",
            controller:"changeServiceFeeController",
            cache : false
        }).state('orderStatusDetail', {
            url: "/orderStatusDetail",
            templateUrl: "templates/Let's Shop/orderStatusDetail.html",
            controller:"orderStatusDetailController",
            cache : false
        }).state('acceptCounterOffer', {
            url: "/acceptCounterOffer",
            templateUrl: "templates/Let's Shop/acceptCounterOffer.html",
            controller:"acceptCounterOfferController"
        }).state('orderHistory', {
            url: "/orderHistory",
            templateUrl: "templates/Let's Shop/orderHistory.html",
            controller:"orderHistoryController"
        }).state('orderDeliveryDetail', {
            url: "/orderDeliveryDetail",
            templateUrl: "templates/Let's Shop/orderDeliveryDetail.html",
            controller:"orderDeliveryDetailController"
        }).state('Messages', {
            url: "/Messages",
            templateUrl: "templates/Messages/Messages.html",
            controller:"MessagesController"
        }).state('messagingView', {
            url: "/messagingView",
            templateUrl: "templates/Messages/messagingView.html",
            controller:"messagingViewController"
        }).state('storeInventory', {
            url: "/storeInventory",
            templateUrl: "templates/storeInventoryTemplate/storeInventory.html",
            controller:"storeInventoryController",
            cache:false
        }).state('addStore', {
            url: "/addStore",
            templateUrl: "templates/storeInventoryTemplate/addStore.html",
            controller:"addStoreController",
            cache:false
        }).state('manageStores', {
            url: "/manageStores",
            templateUrl: "templates/storeInventoryTemplate/manageStores.html",
            controller:"manageStoresController",
            cache:false
        }).state('manageStoreInventory', {
            url: "/manageStoreInventory",
            templateUrl: "templates/storeInventoryTemplate/manageStoreInventory.html",
            controller:"manageStoreInventoryController",
            cache:false
        }).state('addEditInventory', {
            url: "/addEditInventory",
            templateUrl: "templates/storeInventoryTemplate/addEditInventory.html",
            controller:"addEditInventoryController",
            cache:false
        }).state('settings', {
            url: "/settings",
            templateUrl: "templates/settingTemplate/settings.html",
            controller:"settingsController"
        }).state('myProfile', {
            url: "/myProfile",
            templateUrl: "templates/settingTemplate/myProfile.html",
            controller:"myProfileController"
        }).state('shoppingSettings', {
            url: "/shoppingSettings",
            templateUrl: "templates/settingTemplate/shoppingSettings.html",
            controller:"shoppingSettingsController"
        }).state('deliveryConditionsNotMet', {
            url: "/deliveryConditionsNotMet",
            templateUrl: "templates/settingTemplate/deliveryConditionsNotMet.html",
            controller:"deliveryConditionsNotMetController"
        }).state('deliveryConditionsMet', {
            url: "/deliveryConditionsMet",
            templateUrl: "templates/settingTemplate/deliveryConditionsMet.html",
            controller:"deliveryConditionsMetController"
        }).state('addDeliveryFeeTemplate', {
            url: "/addDeliveryFeeTemplate",
            templateUrl: "templates/settingTemplate/addDeliveryFeeTemplate.html",
            controller:"addDeliveryFeeTemplateController"
        }).state('addStoresFeeTemplate', {
            url: "/addStoresFeeTemplate",
            templateUrl: "templates/settingTemplate/addStoresFeeTemplate.html",
            controller:"addStoresFeeTemplateController"
        }).state('financialRecords', {
            url: "/financialRecords",
            templateUrl: "templates/settingTemplate/financialRecords.html",
            controller:"financialRecordsController"
        }).state('editFinancialRecord', {
            url: "/editFinancialRecord",
            templateUrl: "templates/settingTemplate/editFinancialRecord.html",
            controller:"editFinancialRecordController"
        }).state('verifyFinancialRecord', {
            url: "/verifyFinancialRecord",
            templateUrl: "templates/settingTemplate/verifyFinancialRecord.html",
            controller:"verifyFinancialRecordController"
        }).state('storeManagementFee', {
            url: "/storeManagementFee",
            templateUrl: "templates/settingTemplate/storeManagementFee.html",
            controller:"storeManagementFeeController"
        });

    $urlRouterProvider.otherwise('letsShop');
});
