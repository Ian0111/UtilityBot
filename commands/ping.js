module.exports = {
    name: 'ping',
    description: "Check if the bot is actually alive...",
    enabled: true,
    execute(message, args, fullargs){
        try {
            var start = Date.now();
            var msg = message.channel.send('Pong!').then((sentMessage) => {
                var end = Date.now();
                var time = end-start
                sentMessage.edit("Pong! ``"+time.toString()+"ms``")
            });
        } catch (err) {
            console.log("An error occurred during command: "+message.toString()+"\n"+err.toString());
            try {
                message.channel.send("There was an error trying to run that command :(");
            } catch (err) {}
        }
    }
}