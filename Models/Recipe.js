const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  calories: {
    type: String,
    trim: true,
  },
  scoreNutritionnel: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  ingredients: {
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
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);