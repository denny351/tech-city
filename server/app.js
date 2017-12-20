const ENV = process.env.ENV || "development";

const express      = require('express');
const app          = express();
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const knexConfig   = require('../knexfile');
const knex         = require('knex')(knexConfig[ENV]);
const passport     = require('passport');
const session      = require('express-session');
const bodyParser   = require('body-parser');

app.use(express.static('../client/public'));

// SETTING UP SOCKET.IO SERVER

const server = require('http').createServer(app);
server.listen(8080, () => console.log('Chat server running on port 4000...'))
const io = require('socket.io').listen(server);
let chatUsers = [];
let connections = [];

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', (msg) => {
     io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

const index  = require('./routes/api/index');
const users  = require('./routes/api/users');
const auth   = require('./routes/auth/routes');
const events = require('./routes/api/events');
const jobs   = require('./routes/api/jobs');
const cities = require('./routes/api/cities');

app.set('port', (process.env.PORT || 5000));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// mount routes

app.use('/session', auth(knex, passport));
app.use('/', index);
app.use('/api/v1/users', users(knex));
app.use('/api/v1', events(knex));
app.use('/api/v1', jobs(knex));
app.use('/api/v1', cities(knex));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

