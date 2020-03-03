module.exports = {
	name: 'triv',
	description: 'Trivial',
	execute(message, args) {
    message.channel.fetchMessage(args[0])
      .then(msg => reactTriv(msg))
      .then(message.delete())
	},
};

async function reactTriv(msg) {
  await msg.react('🇹');
  await msg.react('🇷');
  await msg.react('ℹ️');
  await msg.react('🇻');
  await msg.react('🇮');
  await msg.react('🇦');
  await msg.react('🇱');
}
