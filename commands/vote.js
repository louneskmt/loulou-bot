const Discord = require('discord.js');

module.exports = {
	name: 'vote',
	description: 'Vote à bulletin secret',
	execute(message, args) {
    let command = args[0];
    let question, choix, cible;
    console.log(" args :", args)
    if (command === 'start') {
      try {
        question = args.filter(arg => arg.name === 'question')[0].params.shift();
        choix = args.filter(arg => arg.name === 'choix')[0].params;
        cible = args.filter(arg => arg.name === 'cible')[0].params.shift();
      } catch (err) {
        message.channel.send('Missing parameter, please retry.')
        return;
      }
      
      message.channel.send(`Question : ${question}\nChoix : ${choix}\nCible : ${cible}`);
      const roleId = cible.match(/\d+/g)[0];

      message.guild.roles.fetch(roleId)
        .then(role => {
          let members = [];
          role.members.forEach(member => {

            const embed = new Discord.MessageEmbed()
              .setTitle('Nouveau vote !')
              .setDescription('Votre participation a un vote est requise !')
              .setThumbnail('https://www.emoji.co.uk/files/emoji-one/objects-emoji-one/1974-ballot-box-with-ballot.png')
              .addField('Question', question)
              .setColor('DARK_RED')
            member.send(embed);
          });
        });
    }
	},
};