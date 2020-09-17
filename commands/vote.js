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
          role.members.forEach(member => members.push(member.nickname));
          message.channel.send(`Participants : ${members}`);
        });
    }
	},
};