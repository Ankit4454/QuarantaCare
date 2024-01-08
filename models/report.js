const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;