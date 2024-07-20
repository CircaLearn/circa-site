import mongoose from "mongoose";

// destructuring assignment
const {Schema} = mongoose;

// Only user_id, name, usage, and normal_embedding are required
// For now, user_id and embeddings are defaulted to garbage values
const conceptSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    default: new mongoose.Types.ObjectId(),
  },
  name: {
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
    min: 0,
    max: 1,
  },
  normal_embedding : {
    type: [Number],
    required: true,
    default: [0]
  }},
  {
    timestamps: true
  }
);

export default mongoose.models.Concept || mongoose.model("Concept", conceptSchema);