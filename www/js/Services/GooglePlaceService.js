/**
 * Created by koDev on 9/11/2015.
 */
mobileShop.factory('GooglePlaceService',function(){


    var _getCoordinates = function(callback){
        navigator.geolocation.getCurrentPosition(function(position){
            callback(null,position)
        },function(err){
            callback(err,null)
        },{maximumAge: 0, timeout: 2000, enableHighAccuracy:true});
    };
    var _getUserMap = function(position,callback){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': new google.maps.LatLng(position.coords.latitude,position.coords.longitude)}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);
               callback(results,null)
            } else {
                callback(null,status)
            }
        });
    };
    var _getUsertLocation = function(callback){
        _getCoordinates(function(err,data){
            if(err){
                callback(err,null,null)
            }else{
                _getUserMap(data,function(result,status){
                    if(result)
                    callback(null,result,null);
                    else
                    callback(null,null,status)
                })
            }
        });
        //callback('jkhda')
    };

    return{
        getCoordinates : _getCoordinates,
        getUserMap : _getUserMap,
        getUsertLocation : _getUsertLocation
    }

});


