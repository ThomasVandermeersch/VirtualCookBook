//This script add a reciepe in the MongoDB database.

const MongoClient = require('mongodb').MongoClient
const dbUrl = "mongodb+srv://Thomas:1234@cluster0.m9mex.mongodb.net/cook?retryWrites=true&w=majority";

module.exports = function addReciepe(reciepe){
    //Connexion to the database
    
    var product = product;
    
    //Complete product informations
    reciepe["created"] = Date()
    reciepe["updated"] = Date()
    reciepe["validated"] = false
    
    // Il faudra quelque part, une fois les authentifications faites, identifier le user qui a ajouté le produit
    //reciepe["addedBy"] = None
    
    MongoClient.connect(dbUrl, (err, db)=> {
        if (err) throw err;
        
        //Select database
        var dbo = db.db("cook");

        //Insertion of a product in the database
        dbo.collection("reciep").insertOne(reciepe, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        })
        db.close();
    });
}