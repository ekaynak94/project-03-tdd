class VendingMachine {
    constructor() {
        this.inventory = {};
        this._coins = {
            "nickels":{ 
                "value":0.05 ,
                 "number":0 },
            "dimes":{ 
                "value":0.10 , 
                "number":0 },
            "quarters":{
                 "value":0.25 ,
                 "number":0 },
            "loonies":{
                 "value":1 , 
                 "number":0 },
            "toonies":{ 
                "value":2 ,
                "number":0 }
        };
        this._userFunds = 0;
    }

    insertCoin(coin){
        if (!this._coins[coin]) throw new Error('currency not recognized');
        this._coins[coin].value = this._coins[coin].value + 1;
    }
}

module.exports = VendingMachine;