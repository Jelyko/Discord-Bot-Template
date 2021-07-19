const mongoose = require('mongoose');
const Guild = require('../database/models/guildSchema');
const Discord = require('discord.js');
const logs = require('../database/logs');

const cooldowns = new Map();

module.exports = {
	name: 'message',
	async execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;

        await logs.add(message.guild.id, 'messages')

        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
            });
            await guildProfile.save().catch(err => console.log(err));
        }
        client.prefix = guildProfile.prefix;

        if (!message.content.startsWith(client.prefix)) return; 

        const args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Discord.Collection());
        }

        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = (command.cooldown) * 1000;

        if (time_stamps.has(message.author.id)) {
            const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

            if (current_time < expiration_time){
                const time_left = (expiration_time - current_time) / 1000;

                return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
            }
        }

        time_stamps.set(message.author.id, current_time)
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${client.prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        if (!guildProfile.blackListedChannelIds == "") {
            const channelIsBlacklisted = guildProfile.blackListedChannelIds
                .includes(message.channel.id);
            if (channelIsBlacklisted) return false;
        }

        await logs.add(message.guild.id, 'commands')
        
        try {
            command.execute(message, args, client);
        } catch (error) {
            message.reply("There was an error trying to execute this command!");
            console.log(err);
        }
	},
};