
var url = 'https://settle-alaurelut.c9users.io';
var port = 8080;
if (document.location.hostname == "localhost") {
    url = 'localhost';
    var port = 3000;
}
var socket = io.connect(url + ':' + port + '/');
socket.on('notifiedUser', function(data) {
    console.info('you good');
    var notif = document.getElementById('notif');
    var user = JSON.parse(window.localStorage['userData'] || '{}');
    if(data == user.facebookId){
        notif.innerHTML = '1';
    }
});
