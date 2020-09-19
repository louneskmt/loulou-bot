module.exports = {
	name: 'ego+',
	description: 'Augmentation de l\'ego!',
	execute(message, args) {
		message.channel.send(`Tu es si beau et intelligent, ${message.author.username} !!`);
		message.delete();
	},
};
