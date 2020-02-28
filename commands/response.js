module.exports = {
  response: function(message) {
    txt = message.content.toLowerCase();

    // if(message.author.id == 213392763453046784) {
    //   message.reply("le silence est requis dans l'hémicycle.");
    // }

    if (txt === 'wesh mon poto, là j\'suis pété') {
    	message.channel.send('J\'SUIS EN BUVETTE, PAS SOUS PÉTOU');
    }

    if(txt === 'miroir, miroir, dis moi qui est le plus beau' || message.content === 'Miroir, miroir, dis moi qui est la plus belle') {
      message.channel.send(`C\'est vous, bien évidemment, ${message.author.username} !`);
    }

    if(txt.includes('skou')) {
      message.channel.send(`POULOULOUUUUUUU`);
    }

    if(txt.includes('moulaga')) {
      message.channel.send(`DONNEZ, DO-DO-DONNEZ, DONNEZ-MOI D'LA MOULAGA`);
      message.channel.send(`EH, D'LA MOULAGA, EH DONNEZ-MOI D'LA MOULAGA`);
    }

    if(txt.includes('aristocrate')) {
      message.channel.send(`fais-moi la bise comme un aristocrate !`.toUpperCase());
      message.channel.send(`J'veux du menders, que du menders, que du menders, que du mendeeeerrss`);
    }

    if(txt.includes('khapta')) {
      message.channel.send(`SALOPE, TE-BOÎ, CHOT-CA, TEL-HÔ, TE-CAR`);
      message.channel.send(`Midi, départ, Paris, Neymar, Nasser, Qatar, voiture très rare\nBenda, j'démarre, esprit, Lemon, Cheezy, DZ, flexy, Djezzy`.toUpperCase());
    }

    if(txt.includes('le chauve')) {
      message.channel.send('METS LUI LA MISERE AU CHAUVE')
    }

    if(txt.includes('manuellement')) {
      message.channel.send('AUTOMATIQUEMENT')
    }

    if(txt.includes('c\'est une bonne situation') && txt.includes('bot')) {
      setTimeout(function() { message.channel.send('Vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation.') }
        , 2000);
      setTimeout(function() { message.channel.send('Moi, si je devais résumer ma vie aujourd’hui avec vous, je dirais que c’est d’abord des rencontres.') }
        , 5000);
      setTimeout(function() { message.channel.send('Des gens qui m’ont tendu la main, peut-être à un moment où je ne pouvais pas, où j’étais seul chez moi.') }
        , 9000);
      setTimeout(function() { message.channel.send('Et c’est assez curieux de se dire que les hasards, les rencontres forgent une destinée…') }
        , 12000);
      setTimeout(function() { message.channel.send('Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l’interlocuteur en face je dirais, le miroir qui vous aide à avancer.') }
        , 16000);
      setTimeout(function() { message.channel.send('Alors ça n’est pas mon cas, comme je disais là, puisque moi au contraire, j’ai pu :') }
        , 24000);
      setTimeout(function() { message.channel.send('et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie… je ne suis qu’amour !') }
        , 27000);
      setTimeout(function() { message.channel.send('Et finalement, quand beaucoup de gens aujourd’hui me disent « Mais comment fais-tu pour avoir cette humanité ? », et bien je leur réponds très simplement, je leur dis que c’est ce goût de l’amour ce goût donc qui m’a poussé aujourd’hui à entreprendre une construction mécanique, mais demain qui sait ?') }
        , 35000);
      setTimeout(function() { message.channel.send('Peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi…') }
        , 43000);
    }
  }
}
