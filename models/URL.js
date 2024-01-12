const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const URLSchema = mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },

  redirectURL: {
    type: String,
    required: true,
  },
  visitedHistory: [
    {
      timestamp: { type: String },
    },
  ],
},{timestamp:true});


const url=mongoose.model('url',URLSchema);


module.exports=url;


