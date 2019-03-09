console.log("Starting DB connection");
const mysql = require('mysql');
const mode = require("./config/mode");

if(mode.env == mode.PROD){
  var con = mysql.createConnection({
    host: "mysql-instance.cgzlvpwmrz7n.ap-south-1.rds.amazonaws.com",
    user: "root",
    password: "123Testing",
    database: "SIPCalc",
    port: "3306"
  })
} else {
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "SIPCalc"
})
};

con.connect(function(err){
  if(err) throw err;
  console.log("Connected");
  
})

module.exports={
  con,
  mysql
}
