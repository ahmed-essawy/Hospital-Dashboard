'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');
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
  .use(passport.session())
  .use(flash());

// API location
app.use('/authenticate', routes.login);
app.use('/api/user', routes.user);
app.use('/api/doctor', routes.doctor);
app.use('/api/hospital', routes.hospital);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen(app.get('PORT'), function () {
  console.log('Server is listening at port %d', server.address().port);
});