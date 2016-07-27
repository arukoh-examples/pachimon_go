var initLatLng = [];
var watchPositionID = null;
var watchCompassID = null;

var googleMap = null;
var greenLeaf = null;
var cameraView = null;

ons.ready(function() {
    var navi = document.querySelector('#navi');
    
    navi.addEventListener('init', function(event) {
        var page = event.target;
        
        if (page.id === 'page-home') {
            console.log("init page-home!");
            var mapCanvas = document.getElementById('map-canvas');
            
            var mapOptions = googleMapOptions(initLatLng[0], initLatLng[1]);
            googleMap = new google.maps.Map(mapCanvas, mapOptions);
            googleMap.mapTypes.set('pachimon', googleMapStyledMapType('pachimon'));
            googleMap.setMapTypeId('pachimon');
            
            newGreenLeaf(googleMap);
            
            var avatarH = 100;
            var avatarW = avatarH * page.offsetWidth / page.offsetHeight;
            var avatar = document.getElementById('avatar-canvas');
            avatar.style.top = (page.offsetHeight - avatarH*2).toString() + "px";
            avatar.style.left = ((page.offsetWidth - avatarW)/2).toString() + "px";
            setupAvatar(avatar, avatarH, avatarW);
        }
        if (page.id === 'page-camera') {
            console.log("init page-camera!");
            var video = document.getElementById("video");
            var cameraview = document.getElementById("cameraview-canvas");
            cameraview.width = page.offsetWidth;
            cameraview.height = page.offsetHeight;
            cameraView = new CameraView(video, cameraview, ar);
        }
    });
        
    navi.addEventListener('destroy', function(event) {
        var page = event.target;
        
        if (page.id === 'page-camera') {
            console.log("destroy page-camera!");
            if (cameraView !== null) {
                cameraView.stop();
                cameraView = null;
            }
            newGreenLeaf(googleMap);
        }
    });
    
    watchPositionID = navigator.geolocation.watchPosition(
        function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            if (initLatLng.length === 0) {
                initLatLng.push(lat, lng);
                navi.pushPage('home.html', { animation: 'fade' });
            }
            if (googleMap !== null) {
                googleMap.setCenter({lat: lat + centerOffset()[0], lng: lng + centerOffset()[1]});
            }
        },
        function(error) {
            console.log('code: ' + error.code + ', message: ' + error.message);
        },
        { maximumAge: 3000, timeout: 5000, enableHighAccuracy: false }
    );
    
    watchCompassID = navigator.compass.watchHeading(
        function(heading) {
            if (avatar !== null) {
                avatar.model.rotation(0, Math.PI * (180 - heading.magneticHeading) / 180, 0);
            }
        },
        function(e) {
            console.log('code: ' + error.code + ', message: ' + error.message);
        },
        { frequency: 1000 });
});

function newGreenLeaf(map) {
    var latlng = map.getCenter();
    var lat = latlng.lat() + getRandomArbitary(-0.00035, 0.0004);
    var lng = latlng.lng() + getRandomArbitary(-0.00035, 0.00035);
    greenLeaf = new google.maps.Marker(googleMapMarkerOptions(map, lat, lng));
    greenLeaf.addListener('click', function() {
        greenLeaf.setMap(null);
        greenLeaf = null;
        navi.pushPage('camera.html', { animation: 'fade' });
    });
    return greenLeaf;
};

function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
};