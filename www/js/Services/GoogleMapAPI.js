mobileShop.factory('GoogleMapAPI',function($rootScope){
    var map;
    var marker;
    var currentPos;
    var infowindow=null;
    var _mapInitialize=function(myLatlng){
        currentPos=myLatlng;
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 12,
            center:myLatlng ,
            disableDefaultUI: true
        });

    };

    var _allPlaces=function(callback){
        var request = {
            location: currentPos,
            radius: '500',
            query: ['restaurant','stores']
        };
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    };

    var _createMarker=function(latLong,storeData,callback,onClickCallback){
        marker = new google.maps.Marker({
            position: latLong,
            map: map,
            animation: google.maps.Animation.BOUNCE,
            title: "<p id='infoWindow'>"+ storeData.storeName+','+storeData.address+"</p>"
        });
        callback(marker);
        createInfoWindow(marker);

        function createInfoWindow(m){

            google.maps.event.addListener(m, 'click', function(){
                onClickCallback(storeData);
               if(infowindow){
                   infowindow.close()
               }
                infowindow = new google.maps.InfoWindow({
                    content: m.title
                });

                infowindow.open(map, m);
                addEventToInfoWindow()
            });
        }
        function addEventToInfoWindow(){
            google.maps.event.addDomListener(infowindow, 'domready', function() {
                document.getElementById('infoWindow').addEventListener("click",function(){
                    if(storeData.unlistedStore==undefined)
                        $rootScope.changeState('storeFrontDisplay');
                    else
                        $rootScope.changeState('manualOrderEntry');
                })
            })
        }

    };


    function toggleBounce() {

        alert('asad')
    }

    var _removeMarker=function(markers){
        for(var i=0;i<markers.length;i++){
            markers[i].setVisible(false);
        }
    };

    var _showMarkers=function(markers){
        for(var i=0;i<markers.length;i++){
            markers[i].setVisible(true);
        }
    };

    return{
        mapInitialize:_mapInitialize,
        createMarker:_createMarker,
        allPlaces:_allPlaces,
        removeMarker:_removeMarker,
        showMarkers:_showMarkers
    }

});