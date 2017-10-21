const
    db = require('mysql-promise')(),
    config = require('config');

db.configure({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: 'latin1'
});

const schedules = config.get('table_schedules');
const events = config.get('table_events');
const users = config.get('table_users');
const matches = config.get('table_matches');

const getFirstArg = (r) => {
    return r[0];
};

function changeUser(currentUserId, targetUserId, eventId, matchState) {
    console.log('UserId '+targetUserId)
    return db.query(`
            REPLACE INTO ${matches.name} VALUES (?, ?, ?, ?)
        `, [currentUserId, targetUserId, eventId, matchState]);
}

module.exports = {
    getEventsForCity: function (city) {
        console.log(schedules.fields);
        return db.query(`
            SELECT * FROM
             ${schedules.name} sch
             JOIN ${events.name} ev ON
             sch.${schedules.fields.eventId} = ev.${events.fields.eventId} 
            WHERE ${schedules.fields.city} = ? AND ${events.fields.creationId} REGEXP '^Exhibition(\d)+'
             AND ${events.fields.mainPhoto} != '' LIMIT 100
        `,[city]).then(getFirstArg);
    },

    getEventByDBId: function (eventId) {
      return   db.query(`
            SELECT * FROM ${events.name}
            WHERE ${events.fields.eventId} = ?
        `,[eventId]).then(getFirstArg);
    },

    countLikes: function (userId, eventId) {
        return db.query(`
            SELECT COUNT(*) FROM ${matches.name}
            WHERE ${matches.fields.currentUserId} = ? 
            AND ${matches.fields.eventId} = ?
        `, [userId, eventId]).then(getFirstArg);
    },

    isLikeExists: function (currentUserId, targetUserId, eventId) {
        return db.query(`
            SELECT COUNT(*) FROM ${matches.name}
            WHERE ${matches.fields.currentUserId} = ? AND ${matches.fields.targetUserId} = ? AND ${matches.fields.eventId} = ?
        `, [currentUserId, targetUserId, eventId]).then(getFirstArg);
    },


    /**
     * Add user to event
     * @param userId
     * @param eventId
     * @return {Promise}
     */
    addUserToEvent: function (userId, eventId) {
        return db.query(`
            INSERT INTO ${users.name} VALUES (?, ?)
        `, [userId, eventId]);
    },

    likeUser: function (currentUserId, targetUserId, eventId) {
        return changeUser(currentUserId, targetUserId, eventId, matches.match_states["like"]);
    },

    skipUser: function (currentUserId, targetUserId, eventId) {
        return changeUser(currentUserId, targetUserId, eventId, matches.match_states["skip"]);
    },

    onMessageSent: function (currentUserId, targetUserId, eventId) {
        console.log('On message sent')

        return changeUser(currentUserId, targetUserId, eventId, matches.match_states["sent"]);
    },

    getSuggestionsForUser: function (eventId, userId) {
        return db.query(`
            SELECT ${users.fields.userId} FROM ${users.name} 
            WHERE
                ${users.fields.eventId} = ? AND
                ${users.fields.userId} NOT IN (
                    SELECT ${matches.fields.targetUserId} AS ${users.fields.userId} FROM ${matches.name}
                    WHERE ${matches.fields.currentUserId} = ? AND ${matches.fields.eventId} = ?
                ) AND
                ${users.fields.userId} <> ?
        `, [eventId, userId, eventId, userId]).then(getFirstArg);
    },

    fetchMatches: function () {
        return db.query(`
            SELECT m1.${matches.fields.currentUserId}, m1.${matches.fields.targetUserId}, m1.${matches.fields.eventId} 
            FROM
                ${matches.name} m1
                JOIN ${matches.name} m2 ON 
                    m1.${matches.fields.currentUserId} = m2.${matches.fields.targetUserId} AND 
                    m1.${matches.fields.eventId} = m2.${matches.fields.eventId} AND 
                    m2.${matches.fields.currentUserId} = m1.${matches.fields.targetUserId}
            WHERE 
                m1.${matches.fields.state} = '${matches.match_states["like"]}' AND 
                (m2.${matches.fields.state} = '${matches.match_states["like"]}' OR m2.state = '${matches.match_states["sent"]}')
        `).then(getFirstArg);
    }
};
