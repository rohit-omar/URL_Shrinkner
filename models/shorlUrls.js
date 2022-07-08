// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');
const shortid = require('shortid');

const shortUrlSchema = mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate
    },
    click: {
        type: Number,
        required: true,
        default: 0
    }
})

const url_data = new mongoose.model('ShortUrl',shortUrlSchema);

module.exports = url_data;