
var url = 'https://settle-alaurelut.c9users.io';
var port = 8080;
if (document.location.hostname == "localhost") {
    url = 'localhost';
    var port = 3000;
}
var socket = io.connect(url + ':' + port + '/');
socket.on('notifiedUser', function(data) {
   // display a notification for 5 seconds on navbar
    var notif = document.getElementById('notif');
    var user = JSON.parse(window.localStorage['userData'] || '{}');
    console.log(data);
    if(data.friendId == user.facebookId){
        setTimeout(function(){
         notif.innerHTML ='' ; }, 
         5000);
     notif.innerHTML += '<a href="/room/'+data.room+'">'+data.userName +' vous invite à rejoindre sa Room '+data.descriptionRoom+'</a>';
    }
});
