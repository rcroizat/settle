
var url = 'https://settle-alaurelut.c9users.io';
var port = 8080;
if (document.location.hostname == "localhost") {
    url = 'localhost';
    var port = 3000;
}
var socket = io.connect(url + ':' + port + '/');
socket.on('notifiedUser', function(data) {
   
    var notif = document.getElementById('notif');
    var user = JSON.parse(window.localStorage['userData'] || '{}');
    console.log(data);
    if(data.friendId == user.facebookId){
    	 console.info('you good');
     console.info(data);
        notif.innerHTML += data.userName +' vous invite à rejoindre sa Room <a href="/room/'+data.room+'">'+data.descriptionRoom+'</a><br>';
    }
});
