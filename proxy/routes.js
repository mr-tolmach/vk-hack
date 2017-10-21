const express = require('express'),
    router = express.Router(),
    https = require('https'),
    config = require('config'),
    vkApi = require('./vk');

router.get('/card', (req, res) => {
    try {
        vkApi.makeUserCard(req.query.id);
        res.send(323)
    } catch (err) {
        console.log(`[FATAL ERROR] Get rating from db: error = ${err}`);
        res.status(500).send({error: ""});
    }
});

module.exports = router;
