const VendingMachine = require("../src/vending-machine.js");
const initialState =require('../imports/initial-vending-machine.json');

describe('VendingMachine', () => {

    let test;

    beforeEach(() => {
        test = {};
        test.initialMachine = initialState;  
    });

    describe('user attempts to insert a coin', () => {
        
        beforeEach(() => {
            test.vendingMachine = new VendingMachine();
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
        })

    });

    describe('resupplyCoins()', () => {
        beforeEach(() => {
            test.vendingMachine = new VendingMachine();
            test.expectedCoins = test.initialMachine.coins;
        });

        it('should reset coin numbers in the machine to be equal to the initial states', () => {
            expect(test.vendingMachine.resupplyCoins()).toEqual(test.expectedCoins);
        })
        
    });

    describe('returnChange()', () => {
        beforeEach(() => {
            test.vendingMachine = new VendingMachine();
            test.vendingMachine._loaded = 18.75;
            test.expectedChange = {
                toonies: 9,
                quarters:3
            }
            test.expectedTooniesLeft = 1;
        });

        it('should return change with least amount of coins possible', () => {
            expect(test.vendingMachine.returnChange()).toEqual(test.expectedChange)
        });

        it('should decrement coin numbers in inventory accordingly', () => {
            expect(test.vendingMachine._coins.toonies.number).toEqual(1);
        })
        
    });

});