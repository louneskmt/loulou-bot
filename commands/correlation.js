const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Discord = require('discord.js');

module.exports = {
	name: 'correlation',
	description: 'Send a random correlation chart',
	execute(message, args) {
		fetch(`https://tylervigen.com/view_correlation?id=${getRandomInt(87000)}`)
      .then((res) => res.text())
      .then((html) => {
        const { document } = new JSDOM(html).window;
        var img_source = document.getElementsByTagName("img")[1].getAttribute('src');
        var subjects = document.getElementsByTagName("a");
        const exampleEmbed = new Discord.RichEmbed()
	       .setTitle('Spurious correlations')
         .setDescription(subjects[1].textContent + '\n' + '— VS —' + `\n`+ subjects[2].textContent)
         .setImage(`https://tylervigen.com/${img_source}`)
         .setColor('DARK_RED')

         message.channel.send(exampleEmbed);
      })
      .catch(function(err) {
          console.log('Failed to fetch page: ', err);
      });
	},
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
