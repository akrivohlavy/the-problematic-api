import { splitByOperator } from '../../app/services/solvers';

describe('Custom solver (Unit)', () => {
    describe('Splitting by operators while treating braces as one unit', () => {
        it('by addition', () => {
            expect(splitByOperator('1 + 2', '+')).toEqual(['1', '2']);
            expect(splitByOperator('1 + 2 + 3', '+')).toEqual(['1', '2', '3']);
        });

        it('by subtraction', () => {
            expect(splitByOperator('1 - 2', '-')).toEqual(['1', '2']);
            expect(splitByOperator('1 - 2 - 3', '-')).toEqual(['1', '2', '3']);
        });

        it('groups braces', () => {
            expect(splitByOperator('1 + (2 + 3)', '+')).toEqual(['1', '(2+3)']);
            expect(splitByOperator('1 + (2 + 3) + 4', '+')).toEqual(['1', '(2+3)', '4']);
        });

        it('ignores whitespaces', () => {
            expect(splitByOperator('   1  +2', '+')).toEqual(['1', '2']);
            expect(splitByOperator('  1 +  2  +  3', '+')).toEqual(['1', '2', '3']);
            expect(splitByOperator('1+2+3', '+')).toEqual(['1', '2', '3']);
        });

        xit('recognizes unary operators +-', () => {
            expect(splitByOperator('-1 - 2', '-')).toEqual(['-1', '2']);
            expect(splitByOperator('-1 - (-2)', '-')).toEqual(['-1', '(-2)']);
            expect(splitByOperator('-1 - (+2)', '-')).toEqual(['-1', '(+2)']);
            expect(splitByOperator('1 - (-2) - 3', '-')).toEqual(['1', '(-2)', '3']);

            expect(splitByOperator('2*(-3)', '-')).toEqual(['2*(-3)']);
        });

        it('combined step-by-step', () => {
            expect(splitByOperator('1- (10/5)* 2 +7', '+')).toEqual(['1-(10/5)*2', '7']);
            expect(splitByOperator('1-(10/5)*2', '-')).toEqual(['1', '(10/5)*2']);
            expect(splitByOperator('(10/5)*2', '*')).toEqual(['(10/5)', '2']);
            expect(splitByOperator('10/5', '/')).toEqual(['10', '5']);
        });
    });
});
