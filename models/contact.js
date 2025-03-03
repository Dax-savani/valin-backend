const mongoose = require("mongoose");

const conatctSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        surname: {type: String, required: true},
        contact: {type: String, required: true},
        company: {type: String, required: false},
        email: {type: String, required: true, unique: true},
        request: {type: String, required: true},
        your_message: {type: String, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Contact", conatctSchema);

