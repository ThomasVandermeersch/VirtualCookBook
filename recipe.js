var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://Thomas:1234@cluster0.m9mex.mongodb.net/cook?retryWrites=true&w=majority";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");

    var dbo = db.db("cook");
    var myobj = { name: "Pancake", time: 10 };
    dbo.collection("recipe_1").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    })
    db.close();
});