const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
    question: { type: String, required: true },
    image: { type: String },
    answers: { type: String },
    date: { type: Date, default: Date.now },
});

const Insight = mongoose.model('Insight', insightSchema);

module.exports = Insight;
