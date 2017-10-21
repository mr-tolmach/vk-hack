const express = require('express'),
    router = express.Router(),
    https = require('https'),
    config = require('config'),
    vkApi = require('./vk'),
    db = require('./db'),
    ranking = require('./ranking');

const getEvents = function (city) {
    return db.getEventsForCity(city)
};

const resolveMatch = function (currentUserId, targetUserId, eventId) {
    db.fetchMatches().then(matches => matches.forEach(function (item) {
      vkApi.sendNotifications(item.currentUserId, item.targetUserId, item.eventId);
    }));

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
            .catch(err => res.status(500).send({'error' : err}))
    } catch (err) {
        console.log(`[FATAL ERROR] Get events from db: error = ${err}`);
        res.status(500).send({error: ""});
    }
});

router.post('/event', (req, res) => {
    try {
        db.addUserToEvent(req.query.userId, req.query.eventId)
            .then(result => res.send({"result" : 'ok'}))
            .catch(err => res.status(500).send({'error' : err}))
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
        console.log(req.query.apiResult)
        let apiResult = JSON.parse(req.query.apiResult)["result"][0]
        userId = apiResult
        db.getSuggestionsForUser(uid, req.query.eventId).then(suggestions => {
            sgstns = suggestions
            return vkApi.getRecommendationsInfo(suggestions)
        }).then(recommendationsInfo => {
            rcmndts = recommendationsInfo
            mInfo = apiResult
            return Promise.all(rcmndts.map(i => db.countLikes(i, eventId)))
        }).then(likes => {
            for (var i = 0; i < Math.min(rcmndts.count, likes.count); i++) {
                rcmndts[i]["likes_num"] = likes[i]
            }
            return Promise.all(rcmndts.map(i => db.isLikeExists(i, userId, eventId)))
        }).then(hasLikes => {
            for (var i = 0; i < Math.min(rcmndts.count, hasLikes.count); i++) {
                rcmndts[i]["like"] = hasLikes[i]
            }
            let vectors = ranking.caclUsers(rcmndts.map(r => ranking.userDiff(mInfo, r))).sort((a, b) => { return a.rank < b.rank })
            res.status(200).send({"result": vectors})
        }).catch(err => {
            console.log(err)
            res.status(500).send({error: err})
        })
    } catch (err) {
        console.log(`[FATAL ERROR] Get users from db: error = ${err}`)
    }
})

router.post('/addLike', (req, res) => {
    try {
        db.likeUser(req.body.currentUserId, req.body.targetUserId, req.body.eventId)
        res.send({'result' : 'ok'})
        resolveMatch(req.query.currentUserId, req.query.targetUserId, req.query.eventId)
    } catch (err) {
        console.log(`[FATAL ERROR] Add match to db: error = ${err}`);
        res.status(500).send({error: ""});
    }
});

router.post('/addSkip', (req, res) => {
  try {
    db.skipUser(req.body.currentUserId, req.body.targetUserId, req.body.eventId)
    res.send({'result' : 'ok'})
  } catch (err) {
    console.log(`[FATAL ERROR] Add match to db: error = ${err}`);
    res.status(500).send({error: ""});
  }
});
module.exports = router;
