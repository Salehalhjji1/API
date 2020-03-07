const express     = require('express');
const app         = express();
const routes      = require('./routes');
const database    = require('./middlewares/database');
const error       = require('./middlewares/error');
const port        = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add CORS to header
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, User-Agent");

  if (req.method === "OPTIONS") res.status(200).send({ok:'ok'});
  else next();
});

app.use(database);
app.use(routes);
app.use(error);

app.listen(port);
console.log('Diesel Spot Price in US API is working on ' + port);
