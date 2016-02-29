var appendFriend = function(element, index, array) {
    var friend = document.getElementById('friendsList');
    friend.innerHTML += '<div class="friendInvit"><input type="checkbox" id="' + element.id + '" name="friendId" class="blaubarry"  value="' + element.id + '"/><label for="' + element.id + '"></label><img src="http://graph.facebook.com/' + element.id + '/picture"/></div>';
};

// get user data from localstorage
var user = JSON.parse(localStorage.userData || '{}');

// fills hidden fields value
document.getElementById('userId').value = user.facebookId;
document.getElementById('userName').value = user.name;

navigator.geolocation.getCurrentPosition(function(position) {
    document.getElementById('longitude').value = position.coords.longitude;
    document.getElementById('latitude').value = position.coords.latitude;
});

// append each user's facebook friend using the app to the invite list
user.facebookFriends.forEach(appendFriend);