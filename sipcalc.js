const hostname = '127.0.0.1';
const port = process.env.PORT || 3001
var path = require('path');
const isNumber = require('is-number');
const express = require('express');
const bodyParser = require('body-parser');
const encodedParser = bodyParser.urlencoded({
  extended: false
});
const lib = require('./lib');
//const portfolio = require('./portfolio');
const passport = require('passport');
const passportSetup = require('./config/passport-setup.js');

var app = express();
app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));
app.use(bodyParser.json());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session2',
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['abfeefeafsfads']
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res) {
  var values = {
    "lumpsum": 1,
    "sip": 20,
    "increase": 0,
    "rate": 15,
    "period": 10
  }

  var summary = lib.summary(values.lumpsum, values.sip, values.increase, values.rate, values.period);

  var data = {
    values,
    summary
  }
  res.render('home', data);
});

app.post('/', encodedParser, function(req, res) {
  var lumpsum = req.body.lumpsum;
  var sip = req.body.sip;
  var increase = req.body.increase;
  var rate = req.body.rate;
  var period = req.body.period;
  if(isNumber(lumpsum) & isNumber(sip) & isNumber(increase) & isNumber(rate) & isNumber(period)){
    var values = req.body;
    var summary = lib.summary(lumpsum, sip, increase, rate, period);
    var data = {
      values,
      summary
    }
    res.render('home', data);
  } else {
    res.redirect('/');
  }
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/sitemap.xml', function(req, res) {
  res.sendFile(path.join(__dirname + '/sitemap.xml'));
  //res.sendFile('sitemap.xml');
});
/*
app.get('/portfolio', function(req, res) {

  if(req && req.hasOwnProperty("user")){
    portfolio.fetchPortfolio(req, res);
  }
  else
    res.redirect('/auth/google');

});

app.post('/portfolio', encodedParser, function(req, res) {
  portfolio.addReading(req, res);
});

//auth with google
app.get('/auth/google',passport.authenticate('google',{
  scope: ['profile']
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/portfolio');
});

//auth logout
app.get('/logout',(req,res)=>{
  //handle with passport
  req.logout();
  res.redirect('/');

});
*/

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
