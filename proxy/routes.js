const express = require('express'),
    router = express.Router(),
    https = require('https'),
    config = require('config'),
    vkApi = require('./vk'),
    db = require('./db');

const getEvents = function (city) {
    return db.getEventsForCity(city)
};

const resolveMatch = function (currentUserId, targetUserId, eventId) {
    let matches = db.fetchMatches();
    matches.forEach(function (item) {
        vkApi.sendNotifications(item.currentUserId, item.targetUserId, item.eventId);
    })
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
            .catch(err => res.send({'error' : err}))
    } catch (err) {
        console.log(`[FATAL ERROR] Get events from db: error = ${err}`);
        res.status(500).send({error: ""});
    }
});

router.post('/event', (req, res) => {
    try {
        db.addUserToEvent(req.query.userId, req.query.eventId)
            .then(result => res.send({"result" : result}))
            .catch(err => res.send({'error' : err}))
    } catch (err) {
        console.log(`[FATAL ERROR] Add event to db: error = ${err}`);
        res.status(500).send({error: ""});
    }
});

router.get('/users', (req, res) => {
    try {
        let sgstns = undefined
        let rcmndts = undefined
        let userId = 0
        let mInfo = undefined
        vkApi.resolveUserId(req.query.accessToken).then(uid => {
            userId = uid
            return db.getSuggestionsForUser(uid, req.query.eventId);
        }).then(suggestions => {
            sgstns = suggestions
            return vkApi.getRecommendationsInfo(suggestions)
        }).then(recommendationsInfo => {
            rcmndts = recommendationsInfo
            return vkApi.getRecommendationsInfo([userId])
        }).then(myInfo => {
            mInfo = myInfo[0]
            return Promise.all(rcmndts.map(i => db.likes(userId, i)))
        }).then(likes => {
            for (var i = 0; i < Math.min(rcmndts.count, likes.count); i++) {
                rcmndts[i]["likes_num"] = likes[i]
            }
            return Promise.all(rcmndts.map(i => db.like(userId, i)))
        }).then(hasLikes => {
            for (var i = 0; i < Math.min(rcmndts.count, hasLikes.count); i++) {
                rcmndts[i]["like"] = hasLikes[i]
            }
        })
    } catch (err) {
        console.log(`[FATAL ERROR] Get users from db: error = ${err}`)
    }
})

router.post('/addLike', (req, res) => {
    try {
        db.likeUser(req.query.currentUserId, req.query.targetUserId, req.query.eventId)
    } catch (err) {
        console.log(`[FATAL ERROR] Add match to db: error = ${err}`);
        res.status(500).send({error: ""});
    }
});
module.exports = router;
