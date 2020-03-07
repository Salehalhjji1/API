require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const dbUrl       = process.env.DB;
const dbName      = 'heroku_dnzhkpq8';
const collName    = 'usa-diesel-spot-price';
const dbOptions   = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = function(req, res, next) {
  MongoClient.connect(dbUrl, dbOptions, (err, client) =>{
    if(err) return next(err);
    req.dbConnection = client.db(dbName).collection(collName);
    next();
  });
}
