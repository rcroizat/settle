// Connexion à socket.io
var url = 'https://settle-alaurelut.c9users.io';
var port = 8080;
if (document.location.hostname == "localhost") {
    url = 'localhost';
    var port = 3000;
}

var map = {};
// Maximal distance (in meters) to display chat rooms in the list
map.maxDistance = 1000;

map.socket = io.connect(url + ':' + port + '/');

map.socket.on('chatRoomGet', function(data) {
    map.chatRooms = data;
    map.setChatRoomsList(map.chatRooms, map.userPosition);
});

map.socket.on('newChatRoom', function(data) {
    map.chatRooms = data;
    map.setChatRoomsList(map.chatRooms, map.userPosition);
});

map.socket.on('chatRoomUserNumberUpdate', function(data) {
    for (var i = 0; i < map.chatRooms.length; i++) {
        if(map.chatRooms[i]._id === data.roomId){
            map.chatRooms[i].users = data.users;
        }
    }
    map.updateRoomUsers(data.roomId, data.users);
});

map.init = function() {

    map.instance = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.instance.addListener('dragend', function(e) {
        map.setChatRoomsList(map.chatRooms, map.instance.getCenter());
    });

    map.instance.addListener('bounds_changed', function() {
        searchBox.setBounds(map.instance.getBounds());
    });

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.instance.fitBounds(bounds);
        map.setChatRoomsList(map.chatRooms, map.instance.getCenter());
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            map.userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var marker = new google.maps.Marker({
                position: map.userPosition,
                map: map.instance,
                icon: "img/map/pin.svg",
                size: new google.maps.Size(32, 32)
            });

            map.instance.setCenter(pos);

            map.socket.emit('chatRoomGet');

        }, function() {
            this.handleLocationError(true, infoWindow, map.instance.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, map.instance.getCenter());
    }
}

map.filter = 'users';

map.setChatRoomsList = function(chatRooms, mapCenter, filter) {

    $('#chatRoomList').empty();

    if ( map.filter !== filter) {
        map.filter = filter;
        chatRooms.sort(function(a, b) {
            return a[filter] - b[filter];
        });
    }
    else{
        chatRooms.sort(function(a, b) {
            return a[filter] + b[filter];
        });
    }
    
    for (i = 0; i < chatRooms.length; i++) {

        chatRooms[i].position = new google.maps.LatLng(chatRooms[i].latitude, chatRooms[i].longitude);

        chatRooms[i].distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(mapCenter, chatRooms[i].position));

        if (chatRooms[i].distance < this.maxDistance) {
            $('#chatRoomList').append('<a href="room/' + chatRooms[i]._id + '" class="chatRoom"><div id="' + chatRooms[i]._id + '" ><span class="name">' + chatRooms[i].name + ' - ' + chatRooms[i].distance + 'm</span><span class="users">' + chatRooms[i].users + '</span><div class="clear"></div></div></a>');
        }
    }
}

map.updateRoomUsers = function(roomId, usersNumber) {
    map.chat
    $('#' + roomId + ' .users').html(usersNumber + ' Users');
}

function initMap() {
    map.init();
    var filtersButton = document.querySelectorAll('.filterChatRooms');
    for (var i = 0; i < filtersButton.length; i++) {
        filtersButton[i].addEventListener('click', filterChatRoomList, false);
    }
}

function filterChatRoomList () {
    map.setChatRoomsList(map.chatRooms, map.instance.getCenter(), this.getAttribute('filter'));
}