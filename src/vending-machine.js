class VendingMachine {
    constructor(initialState) {
        this._inventory = { ...initialState.inventory };
        this._coins = { ...initialState.coins };
        this._loaded = initialState.loaded;
    }

    insertCoin(coin){
        if (!this._coins[coin]) throw new Error('currency not recognized');
        this._coins[coin].quantity = this._coins[coin].quantity + 1;
        this._loaded += this._coins[coin].value;
        return 'coin inserted';
    }

    get loaded() {
        return this._loaded;
    }

    getChange(valueToReturn) {
       return Object.keys(this._coins).sort((a, b) => this._coins[b].value - this._coins[a].value).reduce(
            (acc,cur) => {
                const coinsToReturn = Math.min(Math.floor(valueToReturn / this._coins[cur].value),this._coins[cur].quantity);
                valueToReturn -= coinsToReturn * this._coins[cur].value;
                if (coinsToReturn > 0) { 
                    this._coins[cur].quantity = this._coins[cur].quantity - coinsToReturn;
                    return { ...acc, [cur]:coinsToReturn}
                }
                else {
                    return {...acc}
                }
            },{}
        );
    }

    purchaseItem(item) {
        if (!this._inventory[item]) throw new Error('Item not found');
        if (this._inventory[item].quantity <= 0) throw new Error('Item out of stock');
        if (this._loaded < this._inventory[item].price) throw new Error('Loaded amount insufficent');
        this._inventory[item].quantity = this._inventory[item].quantity - 1;
        const change = this.getChange(this._loaded - this._inventory[item].price);
        this._loaded = 0;
        return {
            item,
            change
        }
    }

    printInventory() {
        return this._inventory;
    }

    refillInventory(updates) {
        const items = Object.keys(updates);
        if (items.find(item => !this._inventory[item])) throw new Error('Attempted to refill unrecognized items');
        if (items.find(item => ( typeof updates[item] !== 'number' || updates[item] < 0 )))throw new Error('Quantity provided has to be a positive integer');
        items.map((item) => {
            if (this._inventory[item])this._inventory[item].quantity = this._inventory[item].quantity+updates[item]
        });
        
        return 'items refilled';
    
    }

    resupplyCoins(updates) {
 
        Object.keys(updates).map((coin) => {
            if (!this._coins[coin]) throw new Error('Attempted to resupply unrecognized coin type');
            if (typeof updates[coin] !== 'number'||updates[coin]<0)throw new Error('Quantity provided has to be a positive integer');
            if (this._coins[coin])this._coins[coin].quantity = this._coins[coin].quantity +updates[coin];
        });
        
        return 'coins resupplied';
    }

}

module.exports = VendingMachine;