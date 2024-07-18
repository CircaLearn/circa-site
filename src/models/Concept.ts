import mongoose from "mongoose";

// destructuring assignment
const {Schema} = mongoose;

const conceptScheme = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phrase: {
    type: String,
    required: true,
  },
  usage: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    // import to pass as a function reference so mongoose calls this function
    // everytime we need a default value
    default: Date.now,
  },
  last_seen: {
    type: Date,
  },
  progress: {
    type: Number,
    default: 0,
    min: 1,
    max: 1,
  },
  normal_embedding : {
    type: [Number],
    required: true
  }
});

module.exports = mongoose.model('Concept', conceptScheme)