const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    bankKey: { type: String, required: true },
    bankAccNo: { type: String, required: true },
    glDesc: { type: String },
    glCode: { type: String }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
