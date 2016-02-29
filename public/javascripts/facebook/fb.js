var user = {
    data: {}
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        user.getFacebookUser();

    } else if (response.status === 'not_authorized') {
        alert('Not authorized to log in with facebook');
    }
}

// This function is called when someone finishes with the Login Button
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// Called when the Facebook SDK is loaded.
window.fbAsyncInit = function() {
    FB.init({
        appId: '1716661471913173',
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5' // use version 2.5
    });
};

// Get user data from facebook
user.getFacebookUser = function() {
    FB.api('/me', function(response) {
        user.data.name = response.name;
        user.data.facebookId = response.id;
        user.getFacebookUserProfilPicture();
    });
};

user.getFacebookUserProfilPicture = function() {
    FB.api("/" + user.data.facebookId + "/picture", function(pictureResponse) {
        if (pictureResponse && !pictureResponse.error) {
            user.data.profilPicture = pictureResponse.data.url;
            user.getFacebookFriends();
        }
    });
};

user.getFacebookFriends = function() {
    FB.api(
        "/me/friends",
        function(friends) {
            if (friends && !friends.error) {
                user.data.facebookFriends = friends.data;
                user.register();
            }
        }
    );
};

// When user is logged in, register him in DB and localstorage then redirect him to the map view.
user.register = function() {
    socket.on('facebookLogin', function(data) {
        window.localStorage['userData'] = JSON.stringify(user.data);
        window.location = "/map";
    });
    socket.emit('facebookLogin', user.data);
};


// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
