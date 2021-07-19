const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    lastEdited: Date,
    blackListedChannelIds: { type: Array, required: false},
    prefix: { type: String, default: "!"},
});

module.exports = new mongoose.model('Guild', guildSchema, 'guilds');