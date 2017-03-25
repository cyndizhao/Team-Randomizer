const PORT = 5001;
const Express = require('express');
const colors = require('colors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = Express();

const home = require('./routes/home');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(Express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', home);

app.listen(PORT, function () {
  console.log(`Server listening on http://localhost:${PORT}...`)
});
