const mongoose = require('mongoose');

const webSchema = new mongoose.Schema({
  cityName: {
    type: String,
    unique: true,
    required: true
  },
  description:{
    type: String,
    require: false
  },
  coords:{
    type: String,
    require: false
  },
  filePath:
  {
    type: String,
    require: false
  }
})

module.exports = mongoose.model('websiteContent', webSchema)