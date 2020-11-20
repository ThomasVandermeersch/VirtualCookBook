
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = function db_addProduct(product) {
    
    const productModel = new Product(product);
    productModel.save()
      .then(() => { console.log('Succesfuly inserted'); })
      .catch((err) => {
        console.log(err);
      });
}