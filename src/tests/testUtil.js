const chalk = require('chalk');

const indentString = '  ';

let numDescribes = 0;
let numPasses = 0;
let numFails = 0;

function clearCounts() {
    numDescribes = 0;
    numPasses = 0;
    numFails = 0;
}

function report(description) {
    console.log(`${description} summary: ` + chalk.green(`${numPasses} passed`) + ',' + chalk.red(` ${numFails} failed`));
}

function endTest(description) {
    report(description);
    clearCounts();
}

function describe(description, test) {
    numDescribes++;
    console.log(indentString.repeat(numDescribes) + description);
    test();
    if (numDescribes > 1) {
        numDescribes--;
    } else {
        endTest(description);
    }
}

function pass(numIndentations) {
    console.log(indentString.repeat(numIndentations + 1) + chalk.green('Pass'));
    numPasses++;
}

function fail(numIndentations) {
    console.log(indentString.repeat(numIndentations + 1) + chalk.red('Fail'));
    numFails++;
}

function it(description, test) {
    const numIndentations = numDescribes + 1;
    console.log(indentString.repeat(numIndentations) + description);
    try {
        test();
        pass(numIndentations);
    } catch(error) {
        fail(numIndentations);
    }
}

function assert(expression, error) {
    if (!expression) {
        throw(new Error(error));
    }
}

function assertEqual(expression1, expression2) {
    assert(expression1 === expression2, `Expected ${expression1} to equal ${expression2}`);
}

function assertNotEqual(expression1, expression2) {
    assert(expression1 !== expression2, `Expected ${expression1} to not equal ${expression2}`);
}

module.exports = { 
    describe, 
    it, 
    assert, 
    assertEqual
}
