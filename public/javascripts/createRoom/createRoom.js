// fills hidden fields

navigator.geolocation.getCurrentPosition(function(position) {
    document.getElementById('longitude').value = position.coords.longitude;
    document.getElementById('latitude').value = position.coords.latitude;
});

var user = JSON.parse(localStorage.userData || '{}');

var appendFriend = function(element, index, array) {
    var friend = document.getElementById('friendsList');
    // friend.innerHTML += '<li><input type="checkbox" name="friendId" class="customBox" value="' + element.id + '"><img src="http://graph.facebook.com/' + element.id + '/picture"/>' + element.name + '</label><label for="box"></label></li>';
    friend.innerHTML += '<div class="friendInvit"><input type="checkbox" id="' + element.id + '" name="friendId" class="blaubarry"  value="' + element.id + '"/><label for="' + element.id + '"></label><img src="http://graph.facebook.com/' + element.id + '/picture"/></div>';
};

document.getElementById('userId').value = user.facebookId;
document.getElementById('userName').value = user.name;
user.facebookFriends.forEach(appendFriend);

