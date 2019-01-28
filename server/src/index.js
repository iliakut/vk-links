const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`));

let test = '10';
let db = {};

app.get('/', (req, res) => {
  res.send(test);
});

app.post('/', function(req, res) {
  let name = req.body.name;
  console.log(name);
  db['name'] = name;
  console.log(db);
});