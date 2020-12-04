const mongoose = require('mongoose');

//Defines a Recipe model
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  totalTime: {
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
  // products: {
  //   type: Array,
  //   trim: true,
  // },
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

  tCuisson:{
    type:String,
    trim:true,
  },
  steps: {
    type: Array,
    trim: true,
  },

  imgLink:{
    type: String,
    trim: true,
  },

  creator:{
    type: String,
    trim: true,
  }
});

//Export the model to use it.
module.exports = mongoose.model('Recipe', recipeSchema);