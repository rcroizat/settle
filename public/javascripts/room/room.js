// Connexion à socket.io
'use strict';
var roomId = location.pathname.split('/');
roomId = roomId[roomId.length - 1];

var url = 'https://settle-alaurelut.c9users.io:8080/';
if (document.location.hostname == "localhost") {
    url = 'localhost:3000/';
}
var socket = io.connect(url);

var user = JSON.parse(window.localStorage['userData'] || '{}');

socket.emit('userConnected', roomId, user);

// Quand un nouveau client se connecte, on affiche l'information
socket.on('userConnected', function(data) {
    var user = data.user;
    $('#zone_chat').append('<p><em>' + user.name + ' a rejoint le Chat !</em></p>');
    $(".roomContainer").animate({ scrollTop: $(".roomContainer").height() }, 1000);
})

// Quand on reçoit un message, on l'insère dans la page
socket.on('message', function(data) {
    insereMessage(data.date, data.user, data.message);
    $(".roomContainer").animate({ scrollTop: $(".roomContainer").height() }, 1000);
});

socket.on('userDeconnection', function(id) {
    $('#' + id).remove();
});

// Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
$('#formulaire_chat').submit(function() {
    console.log("formulaire_chat");
    var message = $('#message').val();

    if (message !== '') {
        socket.emit('message', message); // Transmet le message aux autres
        $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
    }

    return false; // Permet de bloquer l'envoi "classique" du formulaire
});

// Ajoute un message dans la page
function insereMessage(date, user, message) {
    $('#zone_chat').append('<div class="chat"><img class="profilPicture" src="' + user.profilPicture + '"><div class="user"><span class="username">' + user.name + '</span><span class="date">' + date + '</span><div class="message"> ' + message + '</div></div></div><div class="clear"></div>');
}
