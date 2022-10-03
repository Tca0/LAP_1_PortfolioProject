const express = require("express");
const app = express();
// const data = require("./database/data")
const cors =  require("cors");
app.use(cors());

const router = require('./Controllers/routes.js')

const bodyParser = require('body-parser');
app.use(bodyParser.json());


//  const env = require("dotenv");
require('dotenv').config();

app.get("/", (req, res) => {
    res.send("Hello");
})
app.use('/entries', router)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express is running on port ${port}`));