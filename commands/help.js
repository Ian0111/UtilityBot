module.exports = {
    name: 'help',
    description: "Get... help? I guess?",
    enabled: true,
    execute(message, args, fullargs){
        try {
        message.channel.send("**Commands:**\n``help`` --- Shows this message.\n``ping`` --- Check if the bot is alive I guess.\n``getid <Username>`` --- Get a player's userid by name.\n``getname <UserId>`` --- Get a player's username by id.");
        } catch(err) {
            console.log("An error occurred during command: "+message.toString()+"\n"+err.toString());
            try {
                message.channel.send("There was an error trying to run that command :(");
            } catch (err) {}
        }
    }
}