const config = require('config'),
  https = require('https'),
  VK = require('node-vkapi'),
  fs = require('fs'),
  db = require('./db')

const group_token = config.get('group_token')
const token = '3142e21daf7c5de5f7'
const vk = new VK({
  accessToken: group_token
})


const makeuserInfo = function (user) {
  console.log("uuser "+user)
  res = user.first_name + ' ' + user.last_name
  if (user.bdate) {
    res += '\nBirthday: ' + user.bdate
  }
  if (user.city) {
    res += '\nCity: ' + user.city.title
  }

  if (user.activities) {
    res += '\nДеятельность: ' + user.activities
  }
  if (user.about) {
    res += '\nО себе: ' + user.about
  }
  return res.toString('Unicode')
}
const makeEventInfo = function (event) {
  console.log('eevent '+JSON.stringify(event))
  res = event.eventName
  return res.toString('Unicode')
}
module.exports =
    {
        resolveUserId: (accessToken) => {
            return new Promise((fulfill, reject) => {
                return vk.call('users.get', ['access_token': accessToken]).then(info => {
                    fulfill(info["result"][0]["uid"])
                }).catch(err => reject(err))
            })
        },
        getRecommendationsInfo: (uids) => {
            return new Promise((fulfill, reject) => {
                return vk.call('users.get', ['user_ids': uids]).then(infos => {
                    let info = []
                    let result = infos["result"]
                    result.forEach(i => {
                        let ii = {
                            city: i["city"]["id"],
                            city_name: i["city"]["title"],
                            bdate: i["bdate"],
                            occupation: i["occupation"],
                            common_count: i["common_count"],
                            home_town: i["home_town"],
                            education: i["education"]["university_name"],
                            photo: i["photo_max"],
                            first_name: i["first_name"],
                            uid: i["uid"]
                        }
                        info.push(ii)
                    })
                    fulfill(info)
                }).catch(err => reject(err))
            })
        },
        getUserInfo: function (id, fields) {
            return vk.call('users.get', {'user_ids': id, 'fields': fields})
        },
    makeUserMessage: function (id) {
      return this.getUserInfo(id, 'photo_id,city,about,bdate,activities')
        .then(response => {
          let user = response[0]
          console.log(user)
          let card = makeuserInfo(user)
          return {'message': card, 'attachment': 'photo' + user.photo_id}

        }).catch(error => console.error(error))

    },
    sendNotifications: function (id1, id2, eventId) {
      let card1 = this.makeUserMessage(id1)
      console.log('Sent notification for: ' + id2)
      //let card2 = this.makeUserMessage(id2);
      Promise.all([db.getEventByDBId(eventId), card1]).then(data => {
        console.log("Дата "+data[0][0])
        return vk.call('messages.send', {
          'user_id': id2,
          'message': 'Вы нашли пару на событие \"' + makeEventInfo(data[0][0]) + '\"\nПользователь ' + data[1].message,
          'attachment': data[1].attachment
        })
      })/*,
                card2.then(card => vk.call('messages.send', {
                    'user_id': id1,
                    'message': card.message,
                    'attachment': card.attachment
                }))])*/
        .then(res => {
          console.log(res)
          db.onMessageSent(id1, id2, eventId)
        }).catch(err => console.error(err))
    }
  }

