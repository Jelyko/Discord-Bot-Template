const Ticket = require('./models/ticketSchema');

module.exports = new class {
  async get(id) {
    let ticketProfile = await Ticket.findOne({ guildID: id });
    if (!ticketProfile) {
        ticketProfile = await new Ticket({
            _id: mongoose.Types.ObjectId(),
            guildID: id,
        });
        await ticketProfile.save().catch(err => console.log(err));
    }
    return ticketProfile
  }
}