const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    event: { type: String, required: true },
    stake: { type: Number, required: true },
    timeframe: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    opponent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
