const logs = require('../database/logs')

module.exports = {
	name: 'guildBanAdd',
	async execute(guild, user, client) {
        await logs.add(guild.id, 'punishments');
	},
};