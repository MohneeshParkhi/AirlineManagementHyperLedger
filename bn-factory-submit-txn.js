'use strict'

// constant values that require in program

const namespace = 'org.acme.airline.flight';
const transactionType = 'CreateFlight';

// 1. connect to BN

const bnUtil = require('./bn-connection-utils');
bnUtil.connect(main);

function main(error){

    // checking for error

    if(error){
        console.log(error);
        process.exit(1);
    }

    // 2. get the business network definition..

    let bnDef = bnUtil.connection.getBusinessNetwork();
    console.log('Received definition from runtime', bnDef.getName() + bnDef.getVersion());

    // 3. get factory
    let factory = bnDef.getFactory();
    
    // creating instance of transaction
    let options = {
        generate: false,
        includeOptionalFields:  false
    };

    let flightId = "AE101-05-06-2019";

    let transaction = factory.newTransaction(namespace,transactionType,flightId,options);

    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('flightNumber','AE101');
    transaction.setPropertyValue('origin', 'EWR');
    transaction.setPropertyValue('destination' , 'ATL');
    transaction.setPropertyValue('schedule' , new Date('2019-10-15T21:44Z'));

    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });




}

