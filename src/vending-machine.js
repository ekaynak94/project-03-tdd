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
    }

    getChange(valueToReturn) {
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

    purchaseItem(item) {
        if (!this.inventory[item]) throw new Error('Item not found');
        if (this.inventory[item].number <= 0) throw new Error('Item out of stock');
        if (this._loaded < this.inventory[item].price) throw new Error('Loaded amount insufficent');
        this.inventory[item].number = this.inventory[item].number - 1;
        const change = this.getChange(this._loaded - this.inventory[item].price);
        this._loaded = 0;
        return {
            item,
            change
        }
    }

    printInventory() {
        return Object.keys(this.inventory).filter(item=>this.inventory[item].number>0).sort().map(name=>name.toUpperCase()).join(', ');
    }

    resetInventory() {
        this.inventory = { ...initialState.inventory };
    }
}

module.exports = VendingMachine;