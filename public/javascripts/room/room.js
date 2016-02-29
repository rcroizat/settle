'use strict';
// get room id from URL
var roomId = location.pathname.split('/');
roomId = roomId[roomId.length - 1];

// Connexion à socket.io
// var url = 'https://settle-alaurelut.c9users.io';
// if (document.location.hostname == "localhost") {
//     url = 'localhost';
//     var port = 3000;
//     var socket = io.connect(url + ':' + port + '/');
// }else{
//     var socket = io.connect(url);
// }
var user = JSON.parse(window.localStorage['userData'] || '{}');

socket.emit('userConnected', roomId, user);

// When a user logs in, display the info in the chat
socket.on('userConnected', function(data) {
    var user = data.user;
    $('#zone_chat').append('<p><em>' + user.name + ' a rejoint le Chat !</em></p>');
    $(".roomContainer").animate({ scrollTop: $(".roomContainer").height() }, 1000);
})

// When we receive a message, insert it in the chat and scroll the page if we have to
socket.on('message', function(data) {
    insereMessage(data.date, data.user, data.message);
    $(".roomContainer").animate({ scrollTop: $(".roomContainer").height() }, 1000);
});

$('#formulaire_chat').submit(function() {
    var message = $('#message').val();

    if (message !== '') {
        socket.emit('message', message);
        $('#message').val('').focus(); // Empty chat input and focus it
    }

    return false;
});

// Insert a message in the chat
function insereMessage(date, user, message) {
    $('#zone_chat').append('<div class="chat"><img class="profilPicture" src="' + user.profilPicture + '"><div class="user"><span class="username">' + user.name + '</span><span class="date">' + date + '</span><div class="message"> ' + message + '</div></div></div><div class="clear"></div>');
}
