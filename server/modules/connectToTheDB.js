const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

module.exports = function connectToTheDB(callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db('social_network');
        callback(dbo, db);
    });
};