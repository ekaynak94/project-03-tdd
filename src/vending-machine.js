const initialState =require('../imports/initial-vending-machine.json');

class VendingMachine {
    constructor() {
        this.inventory = {};
        this._coins = {
            nickels:{ 
                value:0.05 ,
                 number:0 },
            dimes:{ 
                value:0.10 , 
                number:0 },
            quarters:{
                 value:0.25 ,
                 number:0 },
            loonies:{
                 value:1 , 
                 number:0 },
            toonies:{ 
                value:2 ,
                number:0 }
        };
        this._loaded = 0;
    }

    insertCoin(coin){
        if (!this._coins[coin]) throw new Error('currency not recognized');
        this._coins[coin].number = this._coins[coin].number + 1;
        this._loaded += this._coins[coin].value;
        return `Total amount loaded: ${this._loaded}`;
    }

    get loaded() {
        return this._loaded;
    }

    resupplyCoins() {
        this._coins = { ...initialState.coins };
        return this._coins;
    }
}

module.exports = VendingMachine;