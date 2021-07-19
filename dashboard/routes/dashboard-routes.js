const express = require('express');
const client = require('../../app');
const { validateGuild } = require('../modules/middleware');
const router = express.Router();

//General:
const guilds = require('../../database/guilds');
const Guild = require('../../database/models/guildSchema');
const logs = require('../../database/logs');
const log = require('../modules/audit-logger');

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', validateGuild,
    async (req, res) => res.render('dashboard/show', {
        savedGuild: await guilds.get(req.params.id),
        savedLog: await logs.get(req.params.id),
    }
));

router.put('/servers/:id/:module', validateGuild, async (req, res) => {
    try {
        const { id, module } = req.params;

        const savedGuild = await guilds.get(id);

        await log.change(id, {
            at: new Date(),
            by: res.locals.user.id,
            module,
            new: {...savedGuild[module]},
            old: {...req.body}
        });

        savedGuild[module] = req.body;
        await Guild.findOneAndUpdate({ guildID: id }, savedGuild[module])

        res.redirect(`/servers/${id}`)
    } catch {
        res.render('errors/400');
    }
})

module.exports = router;

