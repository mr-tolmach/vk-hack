const express = require('express'),
    router = express.Router(),
    https = require('https'),
    config = require('config'),
    vkApi = require('./vk'),
    db = require('./db');

const getEvents = function (city) {
    let data = db.getEventsForCity(city);
    return data
};


router.get('/notification.send', (req, res) => {
    try {
        vkApi.sendNotifications(req.query.id1, req.query.id2);
        res.send({'result' : 'ok'})
    } catch (err) {
        console.log(`[FATAL ERROR] Get rating from db: error = ${err}`);
        res.status(500).send({error: ""});
    }
});


router.get('/events', (req, res) => {
    try {
        getEvents('spb')
            .then(result => res.send({'result' : result}))
            .catch(err => console.error(err))
    } catch (err) {
        console.log(`[FATAL ERROR] Get rating from db: error = ${err}`);
        res.status(500).send({error: ""});
    }
});

module.exports = router;
