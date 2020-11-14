const mongoose = require('mongoose');


//Define a Product Model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  calories: {
    type: String,
    trim: true,
  },
  unity: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    trim: true,
  },
  updated: {
    type: Date,
    trim: true,
  },
  validated: {
    type: Boolean,
    trim: true,
  }
});

//Export the model to use it.
module.exports = mongoose.model('Product', productSchema);