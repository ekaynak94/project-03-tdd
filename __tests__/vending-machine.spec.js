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
            test.vendingMachine = new VendingMachine(initialState);
        });

        describe('if inserted unknown currency', () => {
            it('should return an error', () => {
                expect(() => { test.vendingMachine.insertCoin("penny"); }).toThrow(new Error('currency not recognized'));
            });
        });

        describe('if inserted coin', () => {

            beforeEach(() => {
                test.expectedNumberOfDimes = test.vendingMachine._coins.dimes.quantity + 1;
                test.message = test.vendingMachine.insertCoin("dimes");
            });

            it('should return a message', () => {
                expect(test.message).toStrictEqual('coin inserted');
            });

            it('loaded should get the total amout inserted', () => {
                expect(test.vendingMachine.loaded).toStrictEqual(0.10);
            });

            it('coin count of that currency should increment by one', () => {
                expect(test.vendingMachine._coins.dimes.quantity).toStrictEqual(test.expectedNumberOfDimes);
            });

        });

        describe('resupply coins', () => {
            describe('if an unknown coin type is provided as an argument', () => {

                it('should return an error', () => {
                    expect(() => test.vendingMachine.resupplyCoins({ dimes: 2, pennies: 5 })).toThrow(new Error('Attempted to resupply unrecognized coin type'))
                });

            });
            describe('if an non positive integer quantity is provided as an argument', () => {

                it('should return an error', () => {
                    expect(() => test.vendingMachine.resupplyCoins({ dimes: -4 })).toThrow(new Error('Quantity provided has to be a positive integer'))
                });
                
            });

            describe('if quantity provided as an argument is not a number', () => {

                it('should return an error', () => {
                    expect(() => test.vendingMachine.resupplyCoins({ dimes: 'not a number' })).toThrow(new Error('Quantity provided has to be a positive integer'))
                });
                
            });
        });

    });

    describe('inventory', () => {
        beforeEach(() => {
            test.vendingMachine = new VendingMachine(initialState);
            test.inventory = test.initialMachine.inventory;
            test.coins = test.initialMachine.coins;
        });
        
        describe('printInventory', () => { 
            it('should return all items in inventory', () => {
                expect(test.vendingMachine.printInventory()).toEqual(test.inventory)
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

        describe('refill inventory', () => {
            describe('if an unknown item name is provided as an argument', () => {

                it('should return an error', () => {
                    expect(() => test.vendingMachine.refillInventory({fanta:5,sprite:1})).toThrow(new Error('Attempted to refill unrecognized items'))
                });

            });
            describe('if an non positive integer quantity is provided as an argument', () => {

                it('should return an error', () => {
                    expect(() => test.vendingMachine.refillInventory({fanta:-2})).toThrow(new Error('Quantity provided has to be a positive integer'))
                });
                
            });

            describe('if quantity provided as an argument is not a number', () => {

                it('should return an error', () => {
                    expect(() => test.vendingMachine.refillInventory({coke:'not a number'})).toThrow(new Error('Quantity provided has to be a positive integer'))
                });
                
            });
        });

    })

});