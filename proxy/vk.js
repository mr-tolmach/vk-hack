const config = require('config'),
    https = require('https'),
    VK = require('node-vkapi');


const group_token = config.get('group_token');
const token = '3142e21daf7c5de5f7';
const vk = new VK({
    accessToken: group_token
});

module.exports =
    {
        makeUserCard: function (id) {
            //vk.call('messages.send', {'user_id':35200048, 'message':'Дарова пидор'}

            vk.call('users.get', {'user_ids': id, 'fields' : 'photo_50,city,about,bdate,activities'})
                .then(response => {
                    let user = response[0];
                    console.log(user);
                })
                .catch(error => console.error(error));

        }
    };

