const express = require('express');
const authClient = require('../modules/auth-client');
const sessions = require('../modules/sessions');
const { route } = require('./root-routes');

const router = express.Router();

router.get('/invite', (req, res) =>
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.ID}&permissions=4294967287&redirect_uri=${process.env.DASHBOARD}/auth-guild&response_type=code&scope=bot%20applications.commands`))

router.get('/login', (req, res) =>
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.ID}&redirect_uri=${process.env.DASHBOARD}/auth&response_type=code&scope=identify guilds&prompt=none`))

router.get('/auth-guild', async (req, res) => {
    try {
        const key = res.cookies.get('key')
        sessions.update(key);
    } finally {
        res.redirect('/dashboard');
    }
})

router.get('/auth', async (req, res) => {
    try {
        const code = req.query.code;
        const key = await authClient.getAccess(code);       

        res.cookies.set('key', key);
        res.redirect('/dashboard');
    } catch {
        res.redirect('/');
    }
    
})

router.get('/logout',  (req, res) => {
    res.cookies.set('key', '');

    res.redirect('/');
})

module.exports = router;