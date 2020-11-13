//This script add a product in the MongoDB database.

const MongoClient = require('mongodb').MongoClient
const dbUrl = "mongodb+srv://Thomas:1234@cluster0.m9mex.mongodb.net/cook?retryWrites=true&w=majority";

module.exports = function addProduct(product){
    //Connexion to the database
    
    var product = product;
    
    //Complete product informations
    product["created"] = Date()
    product["updated"] = Date()
    product["validated"] = false
    
    // Il faudra quelque part, une fois les authentifications faites, identifier le user qui a ajouté le produit
    //product["addedBy"] = None
    
    MongoClient.connect(dbUrl, (err, db)=> {
        if (err) throw err;
        
        //Select database
        var dbo = db.db("cook");

        //Insertion of a product in the database
        dbo.collection("products").insertOne(product, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        })
        db.close();
    });
}