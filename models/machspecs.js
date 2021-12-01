const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const machineSchema = new Schema({
    machineName: {
        type: String,
        required: true
    },
    machineDistro: {
        type: String,
        required: true
    },
    machineRam: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Machine = mongoose.model('test', machineSchema);

module.exports = Machine;