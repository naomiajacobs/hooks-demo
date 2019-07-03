const {run, describe, it, assert, assertEqual, assertNotEqual} = require('./testUtil');

run('a test suite', () => {
    describe('a function', () => {
        it('should pass', () => {
            assert(true);
        });

        it('should fail', () => {
            assert(false);
        });

        describe('nested describes', () => {
            it('can assert equality', () => {
                assertEqual(5, 5);
            });

            it('can assert non-equality', () => {
                assertNotEqual(5, 4);
            });
        });

        it('goes back to the right indentation afterward', () => {
            assert(true);
        });
    });
});
