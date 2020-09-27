module.exports = {
    name: 'test',
    description: "Test command",
    enabled: false,
    execute(message, args, fullargs){
        try {
            console.log("Hello World!");
        } catch(err) {
            console.log("An error occurred during command: "+message.toString()+"\n"+err.toString());
            try {
                message.channel.send("There was an error trying to run that command :(");
            } catch (err) {}
        }
    }
}