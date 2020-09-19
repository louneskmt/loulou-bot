const fs = require('fs');
const schedule = require('node-schedule');
const fetch = require('node-fetch');

const cours = require("./cours.json");

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
const { response } = require('./commands/response');

const env = require('dotenv').config()
if (env.error) {
  throw env.error
}

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.TOKEN);

client.on('message', message => {
	if (message.author.bot) return;
	response(message);

	if (!message.content.startsWith(prefix)) return;
	const tempArgs = message.content.slice(prefix.length).split(' ');
	const commandName = tempArgs.shift().toLowerCase();
	const args = [ tempArgs[0], ...parseArgs(message.content) ];

  if(commandName === "change-avatar") {
    if(message.author.id !== "388352032790151189") return;
    try {
      url = message.attachments.first().url;
      console.log("Changing avatar to ", url);
      client.user.setAvatar(url);
    } catch(err) {
      console.log("Error ", err)
    }

  }

  if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
  	console.error(error);
  	message.reply('there was an error trying to execute that command!');
  }

});

// var sendRoom = schedule.scheduleJob({hour: 6, minute: 30}, () => {
// 	generateEmbedAndSend(new Date(), cours)
// });

function parseArgs(str) {
	const regex1 = /--[^-]+/g;
	const regex2 = /[^\s"]+|"([^"]*)"/gi;
	const regex3 = /--[^ ]+/gi;

	var myArray = [];
	var myArray2 = [];

	var args = [];

	do {
		//Each call to exec returns the next regex match as an array
		var match = regex1.exec(str);
		if (match != null)
		{
				//Index 1 in the array is the captured group if it exists
				//Index 0 is the matched text, which we use if no captured group exists
				myArray.push(match[1] ? match[1] : match[0]);
		}
	} while (match != null);

	var args = [];

	myArray.forEach((str) => {
		arg = {
			name: str.match(regex3)[0].slice(2),
			params: []
		};

		do {
			//Each call to exec returns the next regex match as an array
			var match = regex2.exec(str);
			if (match != null)
			{
					//Index 1 in the array is the captured group if it exists
					//Index 0 is the matched text, which we use if no captured group exists
					arg.params.push(match[1] ? match[1] : match[0]);
			}
		} while (match != null);

		arg.params = arg.params.slice(1);
		args.push(arg);
	});

	return args;
}

async function generateEmbedAndSend(date, cours, idChannel="619974049560526867") {
	await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Orsay,fr&APPID=8547e05195c2cf97032ff7518b7633a0`)
		.then(res => res.json())
		.then(body => {
			var temp = 0;
			var displayElectro = false;

			switch(body.weather[0].icon.substring(0,2)) {
				case "01":
					temps = "ensoleillé/clair";
					break;
				case "02":
					temps = "légérement nuageux";
					break;
				case "03":
					temps = "nuageux";
					break;
				case "04":
					temps = "très nuageux";
					break;
				case "09":
					temps = "pluvieux";
					break;
				case "10":
					temps = "pluvieux";
					break;
				case "11":
					temps = "orageux";
					break;
				case "13":
					temps = "neigeux";
					break;
				case "50":
					temps = "brumeux";
					break;
			}

			switch(date.getDay()) {
				case 1:
					data = cours.lundi;
					break;
				case 2:
					data = cours.mardi;
					break;
				case 3:
					data = cours.mercredi;
					break;
				case 4:
					data = cours.jeudi;
					break;
				case 5:
					data = cours.vendredi;
					displayElectro = true;
					break;
				default:
					const chill = {
						title: "Aujourd'hui, c'est chillax, bonne grasse mat\'",
						author: {
							name: 'Le grand et magnifique Lounès',
							icon_url: 'https://ipfs.io/ipfs/QmcJHHrtNZBgG7YpmTFRh4QYynZnrifsFL8TLUXcGeSzUN?filename=IMG_3424.jpeg'
						},
            fields: [
      				{
      					name: 'Météo à Orsay',
      					value: `Il fait actuellement ${(body.main.temp - 273.15).toFixed(1)}°C et le temps est ${temps} !`
      				},
            ]
					}
					client.channels.fetch(idChannel).send({embed: chill});
					return;
			}

			const embed = {
				title: `Informations du jour - ${(date.getDate() >= 10) ? date.getDate() : "0" + date.getDate()}/${(date.getMonth() + 1 >= 10) ? date.getMonth() + 1 : "0" + (date.getMonth() + 1).toString()}/${date.getFullYear()}`,
				author: {
					name: 'Le grand et magnifique Lounès',
					icon_url: 'https://ipfs.io/ipfs/QmcJHHrtNZBgG7YpmTFRh4QYynZnrifsFL8TLUXcGeSzUN?filename=IMG_3424.jpeg'
				},
				fields: [
				{
					name: 'Météo à Orsay',
					value: `Il fait actuellement ${(body.main.temp - 273.15).toFixed(1)}°C et le temps est ${temps} !`
				},
				{
					name: 'Groupe B1',
					value: `${data.b1.cours}\n${data.b1.amphi ? "Amphi" : "Salle"} ${data.b1.numero}`,
					inline: true,
				},
				{
					name: 'Groupe B2',
					value: `${data.b2.cours}\n${data.b2.amphi ? "Amphi" : "Salle"} ${data.b2.numero}`,
					inline: true,
				},
			],
			thumbnail: {
				url: `http://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png`,
			}
		}

		client.channels.fetch(idChannel).send({embed: embed});

		if(displayElectro) {
			console.log(displayElectro)
			strDate = date.getDate().toString() + (date.getMonth() + 1).toString();
			const electroEmbed = {
				title: "Salles - Électrocinétique",
				fields: [
					{
						name: 'Groupe A',
						value: `${data.salles.groupeA[strDate]}`,
						inline: true,
					},
					{
						name: 'Groupe B',
						value: `${data.salles.groupeB[strDate]}`,
						inline: true,
					},
					{
						name: 'Groupe C',
						value: `${data.salles.groupeC[strDate]}`,
						inline: true,
					}
				]
			}
			client.channels.fetch(idChannel).send({embed: electroEmbed});
		}
	});
}
