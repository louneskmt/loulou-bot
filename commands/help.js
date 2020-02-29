module.exports = {
	name: 'help',
	description: 'Obtenir l\'aide',
	execute(message, args) {
    message.channel.send('HELP :      \n \
> - ``bv [message_id]`` : ajoute les réactions "BIEN VU"\n \
> - ``meteo [city]`` : température actuelle dans la ville passée en paramètre\n \
> - ``number [number]`` : obtenir un fun fact sur le nombre passé en paramètre\n \
> - ``ego+``: booster son ego\n \
> - ``ego-``: ménager son ego\n \
> - autres easter eggs...')
	},
};
