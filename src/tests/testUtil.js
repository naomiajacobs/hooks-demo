const indentation = '  ';

let numDescribes = 0;
let numPasses = 0;
let numFails = 0;

function clearCounts() {
    numDescribes = 0;
    numPasses = 0;
    numFails = 0;
}

function report(description) {
    console.log(`${description} summary: ${numPasses} passed, ${numFails} failed`);
}

function run(description, test) {
    console.log(description);
    test();
    report(description);
    clearCounts();
}

function describe(description, test) {
    numDescribes++;
    console.log(indentation.repeat(numDescribes) + description);
    test();
    numDescribes--;
}

function pass(numIndentations) {
    console.log(indentation.repeat(numIndentations + 1) + 'Pass');
    numPasses++;
}

function fail(numIndentations) {
    console.log(indentation.repeat(numIndentations + 1) + 'Fail');
    numFails++;
}

function it(description, test) {
    const numIndentations = numDescribes + 1;
    console.log(indentation.repeat(numIndentations) + description);
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
    run,
    describe, 
    it, 
    assert, 
    assertEqual
}
