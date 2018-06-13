let express = require('express');
let app = express();
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";


app.get('/hello', (req, res) => {
    res.send({ express: 'HELLO WORLD' });
});

app.listen(4000, function () {
   console.log('hello world');
});