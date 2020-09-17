const Discord = require('discord.js');

const emojiList = [
  '\u2B1C',
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

const whiteEmoji = emojiList[0];

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
        maxtime = args.filter(arg => arg.name === 'maxtime')[0] ? args.filter(arg => arg.name === 'maxtime')[0].params.shift() * 60000 : 86400000;
        maxchoices = args.filter(arg => arg.name === 'maxchoices')[0] ? args.filter(arg => arg.name === 'maxchoices')[0].params.shift() : 1;
      } catch (err) {
        message.channel.send('Missing parameter, please retry.')
        return;
      }

      choix = ['Vote blanc', ...choix];

      if(choix.length > emojiList.length) return message.channel.send('Please provide less than ' + emojiList.length + ' choices.');
      
      let options = '';
      choix.forEach((chx, index) => {
        options += `${emojiList[index]} - ${chx}\n`;
      });

      let resultats = new Array(choix.length).fill(0);

      const roleId = cible.match(/\d+/g)[0];
      const announceTimeout = setTimeout(() => announceResults(resultats, { question, choix, roleId, maxchoices }), maxtime);

      message.guild.roles.fetch(roleId)
        .then(role => {
          const embed = new Discord.MessageEmbed()
            .setTitle('Un nouveau vote a été créé')
            .setDescription('Pour participer, veuillez vous référer au message privé qui vous a été envoyé.')
            .setThumbnail('https://www.emoji.co.uk/files/emoji-one/objects-emoji-one/1974-ballot-box-with-ballot.png')
            .addField('Question', question)
            .addField('Options', options)
            .addField('Nombre de participants', role.members.array().length)
            .addField('Nombre de votes par participant', maxchoices)
            .setColor('DARK_RED')
          message.channel.send(embed);

          role.members.forEach(member => {
            const embed = new Discord.MessageEmbed()
              .setTitle('Nouveau vote !')
              .setDescription('Votre participation a un vote est requise ! Afin de voter, cliquez simplement sur la réaction correspondant à l\'option que vous voulez choisir. Attention, le vote n\'est plus modifiable après sélection de l\'option.')
              .setThumbnail('https://www.emoji.co.uk/files/emoji-one/objects-emoji-one/1974-ballot-box-with-ballot.png')
              .addField('Question', question)
              .addField('Options', options)
              .addField('Nombre de votes possibles', maxchoices)
              .setColor('DARK_RED')
            member
              .send(embed)
              .then(message => {
                choix.forEach((chx, index) => message.react(emojiList[index]));

                const filter = (reaction, user) => user.id != '676858994685640735';
                const collector = message.createReactionCollector(filter, { time: maxtime });

                let votes = 0;
                let choosed = [];

                collector.on('collect', (react, user) => console.log(`Collected ${react.emoji.name} from ${user.id}`));
                collector.on('collect', (react, user) => {
                  let index = emojiList.indexOf(react.emoji.name);
                  
                  if(!choosed.includes(index)) {
                    votes++;

                    const embed = new Discord.MessageEmbed()
                      .setTitle('✅ Vote pris en compte !')
                      .setDescription(`Vous avez voté pour l'option ${react.emoji}. Ce vote n'est plus modifiable.`)
                      .setColor('GREEN');
                    member.send(embed);

                    resultats[index] += 1;
                    if(index != 0) choosed.push(index);

                    if (votes < maxchoices && index == 0) member.send(`Il vous reste ${maxchoices-votes} vote(s) ! Si vous désirez voter une seconde fois blanc, vous pouvez désélectionner la réaction, et la remettre. Attention, cela n'est pas possible pour les autres choix.`);
                    else if (votes < maxchoices) member.send(`Il vous reste ${maxchoices-votes} votes ! Attention, vous ne pouvez pas voter plusieurs fois pour le même option.`);  

                    if(votes == maxchoices) collector.stop();
                  } else member.send(`Vous ne pouvez pas voter plusieurs fois pour la même option.`)
                });

                collector.on('end', () => {
                  if(resultats.reduce((a,b)=>a+b) >= role.members.array().length) {
                    clearTimeout(announceTimeout);
                    announceResults(resultats, { question, choix, roleId, maxchoices });
                  }
                });
              });
          });
        });
      }

    function announceResults(resultats, { question, choix, roleId, maxchoices }) {
      let resultsStr = '';
    
      console.log('Résultats : ' + resultats);
      message.guild.roles.fetch(roleId)
        .then(role => {
          const number = role.members.array().length * maxchoices;
          const participants = resultats.reduce((a,b)=>a+b); 

          resultats.forEach((result, index) => {
            resultsStr += `${emojiList[index]} - ${choix[index]} : ${result} voix sur ${number}, soit ${(result*100/number).toFixed(2)}% des voix\n`;
          });

          resultsStr += (participants == number) ? 'Pas d\'abstention' : `${number - participants} abstention(s) soit ${((number - participants)*100/number).toFixed(2)}%\n`

          const embed = new Discord.MessageEmbed()
            .setTitle('Fin du vote !')
            .setDescription('Voici les résultats et statistiques de ce vote.')
            .addField('Question', question)
            .addField('Nombre de votes :', `${participants}/${number}`, true)
            .addField('Résultats', resultsStr)
            .setThumbnail('https://www.emoji.co.uk/files/emoji-one/objects-emoji-one/1974-ballot-box-with-ballot.png')
            .setColor('DARK_RED')
          
          let max = resultats[0];
          let exaequo = false;
          for(i = 1; i < resultats.length; i++) {
            if(resultats[i] > max) max = resultats[i];
            if(resultats[i] == max) { 
              exaequo = true; 
              break; 
            };
          }

          let trueMax = resultats.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

          if(participants == 0) embed.addField('Personne n\'a pas participé, il n\'y a donc pas de gagnant.', '❌❌', true);
          else if (exaequo && max >= trueMax) embed.addField('Ex-aequo ! Il va falloir refaire un vote...', '↩️↩️', true);
          else embed.addField(`L'option "${choix[resultats.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)]}" remporte donc ce vote !`, '🎉🎉', true);

          message.channel.send(embed);
          role.members.forEach(member => member.send(embed));
        });
    }
  },
};
