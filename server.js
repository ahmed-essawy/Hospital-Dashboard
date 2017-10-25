'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cors = require('cors');

// Application components
const config = require('./app/config');
const routes = require('./app/routes');
const session = require('./app/session');
const passport = require('./app/auth');

app.set('PORT', process.env.PORT || config.APPLICATION.PORT);

// View engine setup
app.set('view engine', 'handlebars')
  .engine('handlebars', exphbs({
    helpers: require('./app/helpers').helpers,
    defaultLayout: 'layout',
    partialsDir: [
      'views/partials/'
    ]
  }));

// Middlewares
app.use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static('public'))
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(flash());

app.use('/', routes)

// Middleware to catch 404 errors
app.use(function (req, res, next) {
  res.status(404).end();//.sendFile(process.cwd() + '/app/views/404.htm');
});

server.listen(app.get('PORT'), function () {
  console.log('Server is listening at port %d', server.address().port);
});