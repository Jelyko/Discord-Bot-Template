const Guild = require('../database/models/guildSchema');
const Discord = require('discord.js');
const logs = require('../database/logs');

module.exports = {
	name: 'guildMemberRemove',
	async execute(member, client) {
        await logs.add(member.guild.id, 'leaves');
	},
};