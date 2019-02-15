'use Strict';


// getting instance of network card store manager from composer common module 
const NetworkCardStoreManager = require('composer-common').NetworkCardStoreManager;

var wallet = {type: 'composer-wallet-filesystem'};

const cardStore = NetworkCardStoreManager.getCardStore(wallet);

return cardStore.getAll().then(function(cardMap){
    //console.log(cardMap);
     console.log(cardMap.keys);

    let firstCard = cardMap.keys().next().value;
    let secondCard = cardMap.keys().next().value;
    // console.log(secondCard);
    return cardStore.get(firstCard);
}).then(function(idCard){
    console.log("pulled first card from file system ", idCard.getUserName(), '@', idCard.getBusinessNetworkName());
    console.log("Connection Profile Name: ",idCard.getConnectionProfile().name);

}).catch((error) => {console.log(error)})