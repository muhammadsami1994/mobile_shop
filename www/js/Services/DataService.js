mobileShop.factory('DataService', function ($rootScope) {
  var _loginUserId = '', _storeInventory, _storeData, _selectedStore, _selectedProduct,_shoppingListId,
    _updateItemIndex, _itemDetails = [], _loginUserData = {}, _placeOrder = [],_deliveryDetails,
    _billingInformation = {}, _order = {}, _orderArray = [],_shoppingList = {userId:'',carts:[]},
    _shopingListSelectedStore = {},_selectedActiveOrder,_orderDetail = {},_selectedShoppingListStoreIndex;

  var _setLoginUserId = function (id) {
    _loginUserId = id;
    _shoppingList.userId = id
  };

  var _setLoginUserData = function (data) {
    _loginUserData = data;
    console.log(data)
  };
  var _getLoginUserId = function () {
    return _loginUserId;
  };
  var _getLoginUserData = function () {
    return _loginUserData;
  };

  var _setStoreInventory = function (inventories) {
    _storeInventory = inventories;
  };

  var _getStoreInventory = function () {
    return _storeInventory
  };

  var _setStoreData = function (data) {
    _storeData = data
  };
  var _getStoreData = function () {
    return _storeData
  };

  var _setSelectedStore = function (data) {
    _selectedStore = data;
  };

  var _getSelectedStore = function () {
    return _selectedStore
  };

  var _setSelectedProduct = function (data) {
    _selectedProduct = data
  };
  var _getSelectedProduct = function () {
    return _selectedProduct
  };
  var _saveItemDetails = function (data) {
    _itemDetails.push(data)
  };
  var _getItemDetails = function () {
    return _itemDetails
  };
  var _saveItemIndex = function (name) {
    _updateItemIndex = name
  };
  var _getUpdateItemIndex = function () {
    return _updateItemIndex
  };
  var _setPlaceOrder = function (data) {
    _placeOrder.push(data);
    console.log(_placeOrder)
  };
  var _getPLaceOrder = function () {
    return _placeOrder;
  };
  var _emptyPlaceOrder = function () {
    _placeOrder = []
  };
  var _changePlaceOrder = function(data){
    _placeOrder = data
  }
  var _setDeliveryDetails = function (data) {
    _deliveryDetails = data;
    console.log(_deliveryDetails)
  };
  var _getDeliveryDetails = function () {
    return _deliveryDetails;
  };
  var _setBillingInformation = function (data) {
    _billingInformation = data
  };
  var _getBillingInformation = function () {
    return _billingInformation
  };
  var _setOrder = function (data) {
    _order = data;
    console.log(_order);
  };
  var _getOder = function () {
    return _order
  };
  var _setOrderArray = function (data) {
    _orderArray.push(data)
  };
  var _getOrderArray = function () {
    return _orderArray
  };
  var _setShoppingList = function (data) {
    _shoppingList.carts.push(data)
    console.log(_shoppingList)
  };
  var _getShoppingList = function(){

  };
  var _findOne = function(storeid,callback){
    var count = true;
    for(var i = 0;i<_shoppingList.carts.length;i++){
      if(_shoppingList.carts[i].storeId == storeid){
        callback(true,i);
        count = false
      }
    }
    if(count){
      callback(false)
    }
  };
  var _setShoppingListItem = function(product,index){
    for(var i=0;i<product.length;i++){
      _shoppingList.carts[i].products.push(product[i])
    }
    console.log(_shoppingList)
  };
  var _setShopingListSelectedStore = function (data) {
    _shopingListSelectedStore = data
  };
  var _getShopingListSelectedStore = function () {
    return _shopingListSelectedStore
  };
  var _setShoppingListItemToPlaceOrder=function(data){
    _placeOrder = data
  };
  var _setShoppingListId = function(id){
    _shoppingListId = id
  };
  var _getShoppingListId = function(){
    return _shoppingListId
  };
  var _setSelectedActiveOrder = function(data){
    _selectedActiveOrder = data
  };
  var _getSelectedActiveOrder = function(){
    return _selectedActiveOrder
  };
  var _setOderDetail = function(data){
    _orderDetail = data
  };
  var _getOrderDetail = function(){
    return _orderDetail
  };
  var _setSelectedShoppingListStoreIndex = function(data){
    _selectedShoppingListStoreIndex = data
  };
  var _getSelectedShoppingListStoreIndex = function(){
    return _selectedShoppingListStoreIndex
  };
  return {
    setLoginUserId: _setLoginUserId,
    getLoginUserId: _getLoginUserId,
    setLoginUserData: _setLoginUserData,
    getLoginUserData: _getLoginUserData,
    setStoreInventory: _setStoreInventory,
    getStoreInventory: _getStoreInventory,
    setStoreData: _setStoreData,
    getStoreData: _getStoreData,
    setSelectedStore: _setSelectedStore,
    getSelectedStore: _getSelectedStore,
    setSelectedProduct: _setSelectedProduct,
    getSelectedProduct: _getSelectedProduct,
    saveItemDetails: _saveItemDetails,
    getItemDetails: _getItemDetails,
    saveItemIndex: _saveItemIndex,
    getUpdateItemIndex: _getUpdateItemIndex,
    setPlaceOrder: _setPlaceOrder,
    getPLaceOrder: _getPLaceOrder,
    emptyPlaceOrder: _emptyPlaceOrder,
    changePlaceOrder :_changePlaceOrder,
    setDeliveryDetails: _setDeliveryDetails,
    getDeliveryDetails: _getDeliveryDetails,
    setBillingInformation: _setBillingInformation,
    getBillingInformation: _getBillingInformation,
    setOrder: _setOrder,
    getOder: _getOder,
    setOrderArray: _setOrderArray,
    getOrderArray: _getOrderArray,
    setShoppingList : _setShoppingList,
    getShoppingList : _getShoppingList,
    findOne : _findOne,
    setShoppingListItem : _setShoppingListItem,
    setShopingListSelectedStore : _setShopingListSelectedStore,
    getShopingListSelectedStore : _getShopingListSelectedStore,
    setShoppingListItemToPlaceOrder : _setShoppingListItemToPlaceOrder,
    setShoppingListId : _setShoppingListId,
    getShoppingListId : _getShoppingListId,
    setSelectedActiveOrder : _setSelectedActiveOrder,
    getSelectedActiveOrder : _getSelectedActiveOrder,
    setOderDetail : _setOderDetail,
    getOrderDetail : _getOrderDetail,
    setSelectedShoppingListStoreIndex : _setSelectedShoppingListStoreIndex,
    getSelectedShoppingListStoreIndex : _getSelectedShoppingListStoreIndex
  }
});
