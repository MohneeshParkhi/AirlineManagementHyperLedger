'use strict'

const bnUtil = require('./bn-connection-utils');


bnUtil.connect(main);
// Error has value if there was an error in connect()
function main(error){
    // 1. Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }

    console.log("1. Successfully Connected !!!");

    // 2. Lets ping
    bnUtil.ping((response, error)=>{
        if(error){
            console.log(error);
        } else {
            console.log("2. Received Ping Response:");
            console.log(response);
        }

        // 3. Disconnect
        bnUtil.disconnect();

        console.log("3. Disconnected");
    });
}