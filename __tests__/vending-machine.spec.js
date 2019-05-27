const VendingMachine = require("../src/vending-machine.js");
const initialState =require('../imports/initial-vending-machine.json');

describe('VendingMachine', () => {

    let test;

    beforeEach(() => {
        test = {};
        test.initialMachine = initialState;  
    });

    describe('coins', () => {
        
        beforeEach(() => {
            test.vendingMachine = new VendingMachine();
            test.coins = test.initialMachine.coins;
        });

        describe('if inserted unknown currency', () => {
            it('should return an error', () => {
                expect(() => { test.vendingMachine.insertCoin("penny"); }).toThrow(new Error('currency not recognized'));
            });
        });

        describe('if inserted coin', () => {

            beforeEach(() => {
                test.expectedNumberOfDimes = test.vendingMachine._coins.dimes.number+1;
                test.message=test.vendingMachine.insertCoin("dimes");    
            });

            it('should return total loaded amount as a message', () => {
                expect(test.message).toStrictEqual(`Total amount loaded: 0.1`);
            });

            it('coin count of that currency should increment by one', () => {
                expect(test.vendingMachine._coins.dimes.number).toStrictEqual(test.expectedNumberOfDimes);
            });

            describe('if reset coins', () => {
                beforeEach(() => {
                    test.vendingMachine.resetCoins()
                });

                it('should reset coin numbers in the machine to be equal to the initial states', () => {
                    expect(test.vendingMachine._coins).toEqual(test.coins);
                })
            });

        })

    });

    describe('inventory', () => {
        beforeEach(() => {
            test.vendingMachine = new VendingMachine();
            test.inventory = test.initialMachine.inventory;
            test.coins = test.initialMachine.coins;
        });
        
        describe('printInventory', () => { 
            it('should return all items in inventory alphabetically ordered and uppercased', () => {
                expect(test.vendingMachine.printInventory()).toStrictEqual('COKE, DORITOS, FANTA, SNICKERS, TWIX, WATER')
            });
        })
        
        describe('try purchasing an item that is not in the inventory', () => {
            it('should return an error message', () => {
                expect(() => { test.vendingMachine.purchaseItem('nutella') }).toThrow(new Error('Item not found'))
            });
        });

        describe('try purchasing an item with insufficent money provided', () => {
            it('should return an error message', () => {
                expect(() => { test.vendingMachine.purchaseItem('fanta') }).toThrow(new Error('Loaded amount insufficent'))
            });
        });

        describe('try purchasing an item that is out of stock', () => {
            it('should return an error message', () => {
                expect(() => { test.vendingMachine.purchaseItem('coke') }).toThrow(new Error('Item out of stock'))
            });
        });

        describe('purchase item', () => {
            
            beforeEach(() => {
                test.vendingMachine._loaded = 3.85;//assume the user has already inserted 3.85
                test.purchasedItem = test.vendingMachine.purchaseItem('doritos');
                test.expectedChange = {
                    'toonies': 1,
                    'quarters': 2,
                    'dimes':1
                }
            });

            describe('purchase doritos', () => {
                it('should return an object with purchased item inside', () => {
                    expect(test.purchasedItem.item).toStrictEqual('doritos');
                });

                it('should return an object with purchased expected change inside', () => {
                    expect(test.purchasedItem.change).toEqual(test.expectedChange);
                })

            });

        });

    })

});