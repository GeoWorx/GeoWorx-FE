
// Set the center as Firebase HQ
var locations = {
    "FirebaseHQ": [37.785326, -122.405696],
    "Caltrain": [37.7789, -122.3917]
  };

var center = locations["FirebaseHQ"];

// Query radius
var radiusInKm = 0.5;

// Get a reference to the Firebase public transit open data set
var transitFirebaseRef = new Firebase("link to firebase data")

// Create a new GeoFire instance, pulling data from the public transit data
var geoFire = new GeoFire(transitFirebaseRef.child("_geofire"));

/*************/
/*  GEOQUERY */
/*************/
// Keep track of all of the job currently within the query
var jobsInQuery = {};

// Create a new GeoQuery instance
var geoQuery = geoFire.query({
  center: center,
  radius: radiusInKm
});


