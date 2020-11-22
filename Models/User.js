const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  password: {
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
  type:{
      type:String,
      trim: true,
  },
  name:{
    type:String,
    trim: true,
}
});

module.exports = mongoose.model('User', userSchema);
