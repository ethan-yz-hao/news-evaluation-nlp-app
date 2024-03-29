var path = require('path');
const express = require('express');
const postMeaningCloud = require('./postMeaningCloud.js');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

app.post('/eval', (req, res) => {
    postMeaningCloud(process.env.API_KEY, req.body.urlText)
        .then(response => res.send(response))
        .catch(error => {
            console.error(error);
        });
});
