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
            test.vendingMachine.insertCoin("dimes");
        });

        describe('if inserted unknown currency', () => {
            it('should return an error', () => {
                expect(() => { test.vendingMachine.insertCoin("penny"); }).toThrow(new Error('currency not recognized'));
            });
        });

        describe('if inserted a known currency', () => {
            it('coin count of that currency should increment by one', () => {
                expect(test.vendingMachine._coins.dimes.number).toStrictEqual(1);
            });
        });

        describe('if inserted coin', () => {
            it('userfunds should increase by the value of inserted coin', () => {
                expect(test.vendingMachine.userFunds).toStrictEqual(1);
            });
        })

    });



});