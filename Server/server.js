'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');

// Application components
const config = require('./app/config');
const routes = require('./app/routes');
const session = require('./app/session');
const passport = require('./app/auth');

app.set('PORT', process.env.PORT || config.APPLICATION.PORT);

// Middlewares
app.use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static('dist'))
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

// API location
app.use('/authenticate', routes.login);
app.use(routes.isAuthenticated);
app.use('/api/account', routes.account);
app.use('/api/user', routes.user);
app.use('/api/doctor', routes.doctor);
app.use('/api/hospital', routes.hospital);
app.use('/api/department', routes.department);
app.use('/api/appointment', routes.appointment);

server.listen(app.get('PORT'), function () {
  console.log('Server is listening at port %d', server.address().port);
});