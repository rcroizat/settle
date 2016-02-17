var map = {};

map.init = function() {

  map.instance = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map.instance,
                icon: "public/img/map/pin.svg",
                size: new google.maps.Size(32, 32)
            });


            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            map.instance.setCenter(pos);
        }, function() {
            this.handleLocationError(true, infoWindow, map.instance.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, map.instance.getCenter());
    }
}

function initMap() {
    map.init();
}
