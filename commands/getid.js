module.exports = {
    name: 'getid',
    description: "Get the id of a player (via username).",
    enabled: true,
    execute(message, args, fullargs){
        try {
            if (args[0]){
                const http = require('http');
    
                var urlUsername = '';
                
                args.forEach(element => {
                    if (urlUsername!==''){
                        urlUsername+=' ';
                    }
                    urlUsername+=element;
                });
    
                var options = {
                    host: 'api.roblox.com',
                    path: encodeURI('/users/get-by-username?username='+urlUsername),
                }
                callback = function(response){
                    var str = '';
    
                    response.on('data',function(chunk){
                        str += chunk;
                    });
    
                    response.on('end',function(){
                        var jsonObject = JSON.parse(str);
                        if (jsonObject["errorMessage"]){
                            message.channel.send("Invalid username.");
                            console.log("["+message.author.username+"#"+message.author.discriminator+"] "+"Failed to get data for name "+urlUsername);
                        } if (jsonObject["Username"] && jsonObject["Id"]){
                            message.channel.send("Username: ``"+jsonObject["Username"]+"``\nUserId: ``"+jsonObject["Id"]+"``\nProfile: <https://roblox.com/users/"+jsonObject["Id"]+">");
                            console.log("["+message.author.username+"#"+message.author.discriminator+"] "+"Got data (via name) for player "+jsonObject["Username"]+" ("+jsonObject["Id"]+")");
                        }
                    });
                }
                http.request(options,callback).end();
            }
        } catch (err) {
            console.log("An error occurred during command: "+message.toString()+"\n"+err.toString());
            try {
                message.channel.send("There was an error trying to run that command :(");
            } catch (err) {}
        }
    }
}