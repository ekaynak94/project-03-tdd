const VendingMachine = require("../src/vending-machine.js");
const initialState =require('../imports/initial-vending-machine.json');

describe('VendingMachine', () => {

    let test;

    beforeEach(() => {
        test = {};
        test.sampleMachine = initialState;       
    });

    describe('insertCoin()', () => {
        
        beforeEach(() => {
            test.vendingMachine = new VendingMachine();
        });

        describe('if inserted unknown currency', () => {
            it('should return an error', () => {
                expect(() => { test.vendingMachine.insertCoin("penny"); }).toThrow(new Error('currency not recognized'));
            });
        });

        describe('if inserted a known currency', () => {
            it('coin count of that currency should increment by one', () => {
                test.vendingMachine.insertCoin("dimes");
                expect(test.vendingMachine._coins.dimes.number).toStrictEqual(1);
            });
        });

        describe('if inserted coin', () => {
            it('should return total loaded amount', () => {
                expect(test.vendingMachine.insertCoin("dimes")).toStrictEqual(`Total amount loaded: 0.1`);
            });
        })

    });

    describe('resupplyCoins()', () => {
        beforeEach(() => {
            test.vendingMachine = new VendingMachine();
        });

        it('should reset coin numbers in the machine to be equal to the initial states', () => {
            expect(test.vendingMachine.resupplyCoins()).toEqual(test.sampleMachine.coins);
        })
        
    });

});