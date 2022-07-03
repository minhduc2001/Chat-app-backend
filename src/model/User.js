const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    username: {
        type: 'string',
        default: ''
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    isAvatarSet:{
        type: 'boolean',
        default: false
    },
    avatar: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserShema);