const OAuthClient = require('disco-oauth');

const client = new OAuthClient(process.env.ID, process.env.SECRET);
client.setRedirect(`${process.env.DASHBOARD}/auth`);
client.setScopes('identify', 'guilds');

module.exports = client;