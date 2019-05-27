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
        })

    });



});