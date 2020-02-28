const fetch = require('node-fetch');

module.exports = {
	name: 'number',
	description: 'Fun fact!',
	execute(message, args) {
    if (args.length) {
      fetch(`http://numbersapi.com/${args[0]}`)
        .then(res => res.text())
        .then(data => {
          message.channel.send(`Fun fact, with Romain : ${data}`)
        })
    }
	},
};
