module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 3,
	category: 'General',
	execute(message, args, client) {
		const Data = []
		const Latency = message.createdTimestamp - Date.now()
		const API = Math.round(client.ws.ping)
		Data.push(`🏓 Pong`);
		Data.push(`Latency: \`${Latency}ms\``);
		Data.push(`API: \`${API}ms\``)
		message.channel.send(Data);
	},
};