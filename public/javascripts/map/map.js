// Connexion à socket.io
var url = 'http://super-chat-alaurelut.c9users.io';
if (document.location.hostname == "localhost"){
  url = 'localhost';
}

var socket = io.connect(url+':8080/');

// // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
// var pseudo = prompt('Quel est votre pseudo ?');
// socket.emit('nouveau_client', pseudo);
// document.title = pseudo + ' - ' + document.title;

// // Quand on reçoit un message, on l'insère dans la page
// socket.on('message', function(data) {
//     insereMessage(data.date, data.pseudo, data.message)
// });

// socket.on('isTyping', function(pseudo) {
//     console.log(pseudo + ' is typing');
// });

// socket.on('userDeconnection', function(id) {
//     $('#' + id).remove();
// });


// // Quand un nouveau client se connecte, on affiche l'information
// socket.on('nouveau_client', function(data) {
//     var pseudo = data.pseudo;
//     var users = data.users;
//     $('#zone_users').empty();
//     for (var i = 0; i < users.length; i++) {
//         $('#zone_users').append('<li id=' + users[i].id + '>' + users[i].pseudo + ' </li>');
//     };
//     $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
// })

// // Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
// $('#formulaire_chat').submit(function() {

//     var message = $('#message').val();

//     if (message !== '') {
//         socket.emit('message', message); // Transmet le message aux autres
//         $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
//     }

//     return false; // Permet de bloquer l'envoi "classique" du formulaire
// });

// $("#message").keydown(function() {
//     socket.emit('isTyping'); // Istyping
// });

// // Ajoute un message dans la page
// function insereMessage(date, pseudo, message) {
//     console.log('insere Message');
//     $('#zone_chat').prepend('<p><span>' + date + '</span> <strong>' + pseudo + '</strong> ' + message + '</p>');
// }


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

map.getChatRoom = function() {

}

function initMap() {
    map.init();
}
