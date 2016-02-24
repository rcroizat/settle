var app = {};
app.mode = 'dev';

// SERVER

app.server = require('./server')(app);
app.server.create();

app.rooms = require('./server/rooms')(app);
app.rooms.create();

app.users = require('./server/users')(app);
app.users.create();


// SOCKET
app.chat = require('./socket/chat')(app);
app.socketRooms = require('./socket/rooms')(app);
app.socketUsers = require('./socket/users')(app);
app.socket = require('./socket/socket')(app);
app.socket.create();

module.exports = app;