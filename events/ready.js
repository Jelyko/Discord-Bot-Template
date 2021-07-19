module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`${client.user.tag} has logged into Discord.`);

		setInterval(() => {
			client.user.setPresence({
				activity: {
					name: `${client.guilds.cache.size} servers || !play`,
					type: "LISTENING"
				},
				status: 'Idle'
			})
			.catch(console.error);
		}, 60000);
	}
}