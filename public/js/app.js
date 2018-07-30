
//Angular App Module and Controller
var mapApp = angular.module('mapApp', ['ngDialog', 'ui.router']);

mapApp.config(function($stateProvider) {
    var profileState = {
      name: 'profile',
      url: '/profile',
      template: '<h3>hello Profile!</h3>'
    }
  
    var chatState = {
      name: 'chat',
      url: '/chat',
      template: '<h3>chat</h3>'
    }
    var jobsState = {
      name: 'jobs',
      url: '/jobs',
      template: '<h3>Jobs app!</h3>'
    }
    var settingsState = {
      name: 'settings',
      url: '/settings',
      template: '<h3>Setting or anything</h3>'
    }
  
    $stateProvider.state(profileState);
    $stateProvider.state(chatState);
    $stateProvider.state(jobsState);
    $stateProvider.state(settingsState);
});

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

    $scope.addJob = function(){
        console.log("add job");
        swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([
            {
              title: 'Enter your job Title:',
              text: 'Eg: Walk my dog!'
            },{
                title: 'Write discription about job:',
                text: 'Eg: Walk my dog for an hour from 5:00 to 6:00'
            },{
                title: 'Incentive:',
                text: 'Eg: I will pay $20 or I will give free meal'
            }
        ]).then((result) => {
            if (result.value) {
              swal({
                title: 'All done!',
                html:
                  'Your answers: <pre><code>' +
                    JSON.stringify(result.value) +
                  '</code></pre>',
                confirmButtonText: 'Lovely!'
              })
            }
        })
    }

});

