const VendingMachine = require("../src/vending-machine.js");
initialState =require('../imports/initial-vending-machine.json');

describe('VendingMachine', () => {

    beforeEach(() => {
        const test = {};
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



});