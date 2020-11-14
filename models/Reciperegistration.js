const mongoose = require('mongoose');

const reciperegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Reciperegistration', reciperegistrationSchema);
