const Guild = require('./models/guildSchema');
const mongoose = require('mongoose')

module.exports = new class {
  async get(id) {
    return await Guild.findOne({ guildID: id })
      || await new Guild({ _id: mongoose.Types.ObjectId(), guildID: id }).save();
  }
}