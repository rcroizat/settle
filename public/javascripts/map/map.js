// Connexion à socket.io
var url = 'http://super-chat-alaurelut.c9users.io';
if (document.location.hostname == "localhost") {
    url = 'localhost';
}

var socket = io.connect(url + ':8080/');

socket.on('chatRoomGet', function(data) {
    console.log('chatRoomGet');
    console.log(data);
    map.setChatRoomsList(data);
});

// On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
socket.emit('chatRoomGet');

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
                icon: "img/map/pin.svg",
                size: new google.maps.Size(32, 32)
            });

            map.instance.setCenter(pos);

        }, function() {
            this.handleLocationError(true, infoWindow, map.instance.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, map.instance.getCenter());
    }
}

map.setChatRoomsList = function(chatRooms) {
    for (i = 0; i < chatRooms.length; i++) {
      $('#chatRoomList').append('<div id="chatRoom'+i+'" class="chatRoom"><span class="name">'+chatRooms[i].name+'</span><span class="users">'+chatRooms[i].users+'</span><div class="clear"></div></div>');
    }
}

function initMap() {
    map.init();
}
