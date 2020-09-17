const Discord = require('discord.js');

const emojiList = [
	'\u0031\u20E3',
	'\u0032\u20E3',
	'\u0033\u20E3',
	'\u0034\u20E3',
	'\u0035\u20E3',
	'\u0036\u20E3',
	'\u0037\u20E3',
	'\u0038\u20E3',
	'\u0039\u20E3',
	'\uD83D\uDD1F'
];

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

      maxtime = args.filter(arg => arg.name === 'maxtime')[0] ? args.filter(arg => arg.name === 'maxtime')[0].params.shift() * 60000 : 86400000; 

      if(choix.length > emojiList.length) return message.channel.send('Please provide less than ' + emojiList.length + ' choices.');
      
      let options = '';
      choix.forEach((chx, index) => {
        options += `${emojiList[index]} - ${chx}\n`;
      });

      let resultats = new Array(choix.length);

      const embed = new Discord.MessageEmbed()
        .setTitle('Un nouveau vote a été créé')
        .setDescription('Pour participer, veuillez vous référer au message privé qui vous a été envoyé.')
        .setThumbnail('https://www.emoji.co.uk/files/emoji-one/objects-emoji-one/1974-ballot-box-with-ballot.png')
        .addField('Question', question)
        .addField('Options', options)
        .setColor('DARK_RED')

      message.channel.send(embed);

      const roleId = cible.match(/\d+/g)[0];
      message.guild.roles.fetch(roleId)
        .then(role => {
          let members = [];
          role.members.forEach(member => {
            const embed = new Discord.MessageEmbed()
              .setTitle('Nouveau vote !')
              .setDescription('Votre participation a un vote est requise ! Afin de voter, cliquez simplement sur la réaction correspondant à l\'option que vous voulez choisir. Attention, le vote n\'est plus modifiable après sélection de l\'option.')
              .setThumbnail('https://www.emoji.co.uk/files/emoji-one/objects-emoji-one/1974-ballot-box-with-ballot.png')
              .addField('Question', question)
              .addField('Options', options)
              .setColor('DARK_RED')
            member
              .send(embed)
              .then(message => {
                choix.forEach((chx, index) => message.react(emojiList[index]));

                const filter = (reaction, user) => user.id != '676858994685640735';
                const collector = message.createReactionCollector(filter, { time: maxtime, max: 1 });
                collector.on('collect', (react, user) => console.log(`Collected ${react.emoji.name} from ${user.id}`));

                collector.on('collect', (react, user) => {
                  const embed = new Discord.MessageEmbed()
                    .setTitle('✅ Vote pris en compte !')
                    .setDescription(`Vous avez voté pour l'option ${react.emoji}. Ce vote n'est plus modifiable.`)
                    .setColor('GREEN')
                  member.send(embed)

                  let index = emojiList.indexOf(react.emoji.name);
                  console.log(index)
                  resultats[index] += 1;
                  console.log(resultats);
                });
              });
          });
        });
    }
	},
};