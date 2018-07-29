
//Angular App Module and Controller
var mapApp = angular.module('mapApp', ['ngDialog']);
mapApp.controller('MapController', function ($scope, $http, ngDialog) {

    $scope.initMap = function(){
        var h = window.innerHeight;
        var w = window.innerWidth;

        $("#search").width(w/3- 35);
        $("#map").height(h);
        $(".pre-scrollable").css('max-height', h - 350 );

        var locations = {
            "FirebaseHQ": [37.785326, -122.405696],
            "Caltrain": [37.7789, -122.3917]
        };
        var center = locations["FirebaseHQ"];

        
        // Query radius
        var radiusInKm = 0.5;
        
        // Get the location as a Google Maps latitude-longitude object
        var loc = new google.maps.LatLng(center[0], center[1]);

        // Create the Google Map
        $scope.map = new google.maps.Map(document.getElementById("map"), {
            center: loc,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        // Create a draggable circle centered on the map
        var circle = new google.maps.Circle({
            strokeColor: "#6D3099",
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: "#B650FF",
            fillOpacity: 0.35,
            map: $scope.map,
            center: loc,
            radius: ((radiusInKm) * 1000),
            draggable: true
        });

        //Update the query's criteria every time the circle is dragged
        var updateCriteria = _.debounce(function() {
            var latLng = circle.getCenter();
            geoQuery.updateCriteria({
            center: [latLng.lat(), latLng.lng()],
            radius: radiusInKm
            });
        }, 10);
        google.maps.event.addListener(circle, "drag", updateCriteria);

    }


});
