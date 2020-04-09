const express = require('express');
const mountRoutes = require('./Router')
let bodyParser = require("body-parser");



const app = express()


app.use(bodyParser.json());
mountRoutes(app)
app.listen(3000,() => console.log('Server started'));
