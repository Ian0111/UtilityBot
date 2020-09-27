module.exports = {
    name: 'getname',
    description: "Get the name of a player (via id).",
    enabled: true,
    execute(message, args, fullargs){
        try {
            if (Number(args[0])){
                const http = require('http');

                var urlId = Number(args[0]);
                
                var options = {
                    host: 'api.roblox.com',
                    path: encodeURI('/users/'+urlId),
                }
                callback = function(response){
                    var str = '';

                    response.on('data',function(chunk){
                        str += chunk;
                    });

                    response.on('end',function(){
                        var jsonObject = JSON.parse(str);
                        if (jsonObject["errors"]){
                            message.channel.send("Invalid userid.");
                            console.log("["+message.author.username+"#"+message.author.discriminator+"] "+"Failed to get data for id "+urlId);
                        } if (jsonObject["Username"] && jsonObject["Id"]){
                            message.channel.send("Username: ``"+jsonObject["Username"]+"``\nUserId: ``"+jsonObject["Id"]+"``\nProfile: <https://roblox.com/users/"+jsonObject["Id"]+">");
                            console.log("["+message.author.username+"#"+message.author.discriminator+"] "+"Got data (via id) for player "+jsonObject["Username"]+" ("+jsonObject["Id"]+")");
                        }
                    });
                }
                http.request(options,callback).end();
            }
        } catch(err) {
            console.log("An error occurred during command: "+message.toString()+"\n"+err.toString());
            try {
                message.channel.send("There was an error trying to run that command :(");
            } catch (err) {}
        }
    }
}