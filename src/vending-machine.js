const initialState =require('../imports/initial-vending-machine.json');

class VendingMachine {
    constructor() {
        this.inventory = { ...initialState.inventory };
        this._coins = { ...initialState.coins };
        this._loaded = initialState.loaded;
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