// Connexion à socket.io

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
    var users = data.users;
    $('#zone_users').empty();
    for (var i = 0; i < users.length; i++) {
        $('#zone_users').append('<li id=' + users[i].facebookId + '>' + users[i].name + ' </li>');
    };
    $('#zone_chat').prepend('<p><em>' + user.name + ' a rejoint le Chat !</em></p>');
})


// Quand on reçoit un message, on l'insère dans la page
socket.on('message', function(data) {
    insereMessage(data.date, data.user.name, data.message)
});

socket.on('isTyping', function(pseudo) {
});

socket.on('userDeconnection', function(id) {
    $('#' + id).remove();
});



// Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
$('#formulaire_chat').submit(function() {

    var message = $('#message').val();

    if (message !== '') {
        socket.emit('message', message); // Transmet le message aux autres
        $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
    }

    return false; // Permet de bloquer l'envoi "classique" du formulaire
});

$("#message").keydown(function() {
    socket.emit('isTyping'); // Istyping
});

// Ajoute un message dans la page
function insereMessage(date, pseudo, message) {
    $('#zone_chat').prepend('<p><span>' + date + '</span> <strong>' + pseudo + '</strong> ' + message + '</p>');
}
