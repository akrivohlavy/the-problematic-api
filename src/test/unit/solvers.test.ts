import { CustomSimpleSolver, MathExpressionEvaluator, Mathjs } from 'app/services/solvers';

const testCases = [
    ['1 + 1', 2],
    ['3 - 2', 1],
    ['10 - 10', 0],
    ['3 - 1', 2],
    ['2 * 5', 10],
    ['3 - 1 + 5', 7],
    ['2 * 3 + 4', 10],
    ['1- (10/5)* 2 +7', 4],
];

describe('Arithmetic expression solvers (Unit)', () => {
    describe('solver modules can solver prepared test cases', () => {
        describe('math-expression-evaluator', () => {
            const solver = new MathExpressionEvaluator();
            it.each(testCases)('%s', (q, a) => {
                expect(solver.solve(`${q}`)).toEqual(a);
            });
        });

        describe('mathjs', () => {
            const solver = new Mathjs();
            it.each(testCases)('%s', (q, a) => {
                expect(solver.solve(`${q}`)).toEqual(a);
            });
        });

        describe('custom simple solver', () => {
            const solver = new CustomSimpleSolver();
            it.each(testCases)('%s', (q, a) => {
                expect(solver.solve(`${q}`)).toEqual(a);
            });
        });
    });
});
