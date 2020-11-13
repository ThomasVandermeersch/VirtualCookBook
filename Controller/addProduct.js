//This script add a product in the MongoDB database.


const mongoose = require('mongoose');

//Search for Product model
const Product = mongoose.model('Product');

//This function recieves a product from a POST method.
//The function add speceficities to the product and insert the product to the database.

module.exports = function addProduct(product){    
    
    //Complete product informations
    product["created"] = Date()
    product["updated"] = Date()
    product["validated"] = false

    const productModel = new Product(product);
    productModel.save()
      .then(() => { console.log('Succesfuly inserted'); })
      .catch((err) => {
        console.log(err);
      });
  } 