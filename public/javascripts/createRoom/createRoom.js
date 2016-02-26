navigator.geolocation.getCurrentPosition(function(position) {
    document.getElementById('longitude').value = position.coords.longitude;
    document.getElementById('latitude').value = position.coords.latitude;
});

var user = JSON.parse(localStorage.userData || '{}');

var appendFriend = function(element, index, array) {
    var friend = document.getElementById('friendsList');
    friend.innerHTML += '<li><input type="checkbox" name="friendId" value="' + element.id + '"><img src="http://graph.facebook.com/' + element.id + '/picture"/>' + element.name + '</li>';
};

document.getElementById('userId').value = user.facebookId;
document.getElementById('userName').value = user.name;
user.facebookFriends.forEach(appendFriend);