console.log("Launching Portfolio");
const db = require('./database');
const merge = require('merge');
const moment = require('moment');
const dateFormat = require('dateformat');

var con = db.con;

var loadPage = (req, res) => {
  if(req.user){
    res.redirect('/portfolio');
  } else {
    res.render('login', {user: {}});
  }
};

var fetchPortfolio = (req, res) => {
  
  var userid = req.user;
  con.query('select * from Portfolio where userid = ? order by logDate DESC limit 5', 
      [userid],
      function(err, result, fields){
    if (err) throw err;
    console.log("result is " + result);
    if(result && result.length)
      var oldvals = result[0];
    else
      var oldvals = {
        "equity": 10000,
        "mf": 10000,
        "cash": 5000,
        "addcash": 0,
      }

    res.render('portfolio', {"logs": result, "moment": moment, "oldvals": oldvals });
  });
};

var addReading = (req, res) => {

  var obj = req.body;
  if(!obj.nav){
    obj.nav = 100;
    obj.totalunits = obj.totalvalue / obj.nav;
    delete obj.units;
    delete obj.unitsadded;
  }

  var data = merge({
    "userid": req.user
  }, obj);
  
  var logDate = data.logDate;
  var userid = req.user;

  con.query('select * from Portfolio where userid = ? and logDate=? order by logDate DESC limit 1', 
  [userid, logDate],
  function(err, result, fields){
    if(err) throw err;
    if(result.length){
      var id = result[0].id;
      // update query
      con.query('UPDATE Portfolio SET ? where id = ?', 
      [data, id],
      function(err, result, fields){
        if(err) throw err;
        res.redirect('/portfolio');
      });

    } else {
      //insert query
      con.query('INSERT INTO Portfolio SET ?', 
      [data],
      function(err, result, fields){
        if(err) throw err;
        res.redirect('/portfolio');
      });
    }
  })
};

module.exports = {
  loadPage,
  fetchPortfolio,
  addReading
}