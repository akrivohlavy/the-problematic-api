import { MathExpressionEvaluator, Mathjs } from 'app/services/solvers';
import { IExpressionSolver } from '../../app/services/expressionSolver.service';

const testCases = [
    { q: '1+1', a: 2 },
    { q: '3 - 1', a: 2 },
    { q: '2 * 5', a: 10 },
    { q: '3 - 1 + 5', a: 7 },
    { q: '1- (10/5)* 2 +7', a: 4 },
];

const runTestCases = (solver: IExpressionSolver) => {
    for (const { q, a } of testCases) {
        expect(solver.solve(q)).toEqual(a);
    }
};

describe('Arithmetic expression solvers (Unit)', () => {
    describe('solver modules can solver prepared test cases', () => {
        it('math-expression-evaluator', () => {
            runTestCases(new MathExpressionEvaluator());
        });
        it('mathjs', () => {
            runTestCases(new Mathjs());
        });
    });
});
