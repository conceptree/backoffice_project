require('dotenv').config();
const mysql = require("mysql");
const mysqlhost = process.env.HOST;
const mysqlpass = process.env.MYSQLPASS;
const mysqluser = process.env.MYSQLUSER;
const mysqldbname = process.env.DBNAME;

const db = mysql.createConnection({
    host: mysqlhost,
    user: mysqluser,
    password: mysqlpass,
    database: mysqldbname
  });

db.connect(function(err){
    if (err) throw err;
        console.log('Connected!');
});

module.exports = db;