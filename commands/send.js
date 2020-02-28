module.exports = {
	name: 'send',
	description: 'Send a message',
	execute(message, args) {
		if(message.author.id == 388352032790151189) {
      txt = message.content.substring(7,message.content.length)
      message.channel.send(txt)

    }
    setTimeout(function() { message.delete() }, 100);
	},
};
