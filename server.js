require("dotenv").config();
require("dotenv").config();
require("./config/database").connect();

const express = require ('express');
const routes = require('./routes/routes'); 
const cors = require('cors');
const compression = require("compression");

const app = express();

app.use(compression()); //Compresses all routes

app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.use('/', routes); 

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log('App is listening on port ' + listener.address().port)
})


