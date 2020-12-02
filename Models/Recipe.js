const mongoose = require('mongoose');

//Define a Recipe model
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  time: {
    type: String,
    trim: true,
  },
  calories: {
    type: String,
    trim: true,
  },
  nutritiveScore: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  products: {
    type: Array,
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
  },
  steps: {
    type: Array,
    trim: true,
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);