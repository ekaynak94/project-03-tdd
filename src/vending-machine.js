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

    resetCoins() {
        this._coins = { ...initialState.coins };
        return this._coins;
    }

    returnChange() {
        let valueToReturn = this._loaded;
        return Object.keys(this._coins).sort((a, b) => this._coins[b].value - this._coins[a].value).reduce(
            (acc,cur) => {
                const coinsToReturn = Math.min(Math.floor(valueToReturn / this._coins[cur].value),this._coins[cur].number);
                valueToReturn -= coinsToReturn * this._coins[cur].value;
                if (coinsToReturn > 0) { 
                    this._coins[cur].number = this._coins[cur].number - coinsToReturn;
                    return { ...acc, [cur]:coinsToReturn}
                }
                else {
                    return {...acc}
                }
            },{}
        );
    }
}

module.exports = VendingMachine;