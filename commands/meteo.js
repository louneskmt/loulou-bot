const fetch = require('node-fetch');

module.exports = {
	name: 'meteo',
	description: 'Obtenir la météo!',
	execute(message, args) {
    var city = "Orsay";
		var state = "fr";
    if (args.length) {
      city = args[0]
			if(args.length > 1) {
				state = args[1]
			}
    }
		//&units=metric
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&APPID=8547e05195c2cf97032ff7518b7633a0`)
      .then(res => res.json())
      .then(body => {
        message.reply(`il fait actuellement ${body.main.temp.toFixed(1)} Kelvins (soit ${(body.main.temp - 273.15).toFixed(1)}°C) à ${(body.name.includes("Arrondissement") ? (body.name.includes("de ") ? body.name.substring(18, body.name.length) : body.name.substring(17, body.name.length)) : body.name)} !`)
					.then(sent => setTimeout(function() { sent.delete() }, 30000));
			})
		setTimeout(function() { message.delete() }, 3000);
	},
};

function deleteMessage(message) {
	message.delete();
}
