const { Client, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', () => console.log('Ready!'));
client.on('messageCreate', (message) => {
    if(message.content.startsWith('!')) {
        const args = message.content.slice(1).split(" ");
        const command = args.shift().toLowerCase();
        if(command){
            fs.readFile(`./commands/${command}.js`, 'utf8', (err, data) => {
                if(err) {
                    message.channel.send('Command not found!');
                } else {
                    eval('(function() {' + data + '}())');
                }
            });
        }
    }
})
client.login("TOKEN");