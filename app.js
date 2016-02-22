var app = {};
app.mode = 'dev';
app.server = require('./server')(app);
app.server.create();

app.socket = require('./socket')(app);
app.socket.create();

app.db = require('./db')(app);
app.db.create();

module.exports = app;