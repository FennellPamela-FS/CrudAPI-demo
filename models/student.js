// Student Schema
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // name is required
    },
    class: {
        type: String,
        required: true // class is required
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now  // show the time each name and class was created
    },
});

module.exports = mongoose.model("Student", studentSchema);