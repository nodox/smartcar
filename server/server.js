var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Smartcar GM API',
      version: '0.0.1',
      description: 'Deliver smart car information from GM API',
    },
    host: 'localhost:3005',
    basePath: '/',
  },
  apis: ['./routes/**/*.js'],
};
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerSpec = swaggerJSDoc(options);

// Routes
var index = require('./routes/index');
var vehicles = require('./routes/vehicles');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/vehicles', vehicles);

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Always return the main index.html, so react-router render the route in the client
// app.use('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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



module.exports = app;
