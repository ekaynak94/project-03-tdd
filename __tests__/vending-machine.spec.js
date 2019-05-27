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
        
        describe('try purchasing an item that is not in the inventory', () => {
            it('should return an error message', () => {
                expect(() => { purchaseItem('nutella') }).toThrow(new Error('Item not found'))
            });
        });

        describe('try purchasing an item with insufficent money provided', () => {
            it('should return an error message', () => {
                expect(() => { purchaseItem('fanta') }).toThrow(new Error('Loaded amount insufficent'))
            });
        });

        describe('try purchasing an item that is out of stock', () => {
            it('should return an error message', () => {
                expect(() => { purchaseItem('coke') }).toThrow(new Error('Item out of stock'))
            });
        });

    })

});