const logsFile = './logs.txt';
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
var commandList = {};
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    commandList[command.name] = command.enabled;
};

client.once('ready', () => {
    console.log('UtilityBot is online!');
});

client.on('message', message =>{
    try {
        if(!message.content.startsWith(prefix) || message.author.bot) return;
        
        var ts = Date.now();
        var date_ob = new Date(ts);
        var date = date_ob.getFullYear()+"-"+date_ob.getMonth()+"-"+date_ob.getDate()
        var time = date_ob.getHours()+":"+date_ob.getMinutes()+":"+date_ob.getSeconds()

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        const fullargs = message.content.slice(prefix.length+command.length+1)

        for(var key in commandList){
            var value = commandList[key];
            if (key==command && value==true){
                fs.readFile('./logs.txt', (err, data) => {
                    var newText = data+"\n["+date+" "+time+"] "+message.author.username+"#"+message.author.discriminator+": "+message.content
                    fs.writeFile('./logs.txt', newText, (err) => {});
                });
                client.commands.get(command).execute(message,args,fullargs);
                break;
            } if (key==command && value==false){
                fs.readFile('./logs.txt', (err, data) => {
                    var newText = data+"\n["+date+" "+time+"] "+message.author.username+"#"+message.author.discriminator+": [DISABLED]"+message.content
                    fs.writeFile('./logs.txt', newText, (err) => {});
                });
                message.reply('this command is disabled.');
                break;
            };
        };
    } catch(err) {
        console.log(err);
    }
});

fs.readFile('./secret.txt', (err, data) => {
    client.login(data.toString());
});