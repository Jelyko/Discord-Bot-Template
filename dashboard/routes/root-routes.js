const express = require('express');
const { commands } = require('../../app');

const router = express.Router();
const guilds = require('../../database/guilds');
const { validateGuild } = require('../modules/middleware');

router.get('/', (req, res) => res.render('index', {
    subtitle: 'Home',
}));
router.get('/commands', (req, res) => res.render('commands', {
    subtitle: 'Commands',
    categories: [
        { name: 'General', icon: 'fas fa-star'},
    ],
    commands: Array.from(commands.values()),
    commandsString: JSON.stringify(Array.from(commands.values()))
}));


module.exports = router;