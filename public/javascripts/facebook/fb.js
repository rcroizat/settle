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
    } else {
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// Called when the Facebook SDK is loaded.
window.fbAsyncInit = function() {
    FB.init({
        appId: '1716661471913173',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5' // use version 2.2
    });

    // Gets the state of the person visiting this page and can return one of three states to
    // the callback you provide.  They can be:

    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
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

user.register = function() {
    var url = 'https://settle-alaurelut.c9users.io';
    var port = 8080;
    if (document.location.hostname == "localhost") {
        url = 'localhost';
        var port = 3000;
    }
    var socket = io.connect(url + ':' + port + '/');
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
