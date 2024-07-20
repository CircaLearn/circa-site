import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    last_seen: {
        type: Date,
        default: Date.now,
    },
    day_streak: {
        type: Number,
        default: 0,
    }}, 
    {
        timestamps: true
    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
