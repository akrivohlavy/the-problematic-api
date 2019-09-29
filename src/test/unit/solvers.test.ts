import { CustomSimpleSolver, MathExpressionEvaluator, Mathjs } from 'app/services/solvers';
import { IExpressionSolver } from '../../app/services/expressionSolver.service';

type TestCase = [string, number];

const testCases: TestCase[] = [
    ['1 + 1', 2],
    ['3 - 2', 1],
    ['10 - 10', 0],
    ['3 - 1', 2],
    ['2 * 5', 10],
    ['3 - 1 + 5', 7],
    ['2 * 3 + 4', 10],
    ['1- (10/5)* 2 +7', 4],
];

const runTestCases = (solver: IExpressionSolver): void => {
    it.each(testCases)('%s', (problemQuery, solution) => {
        expect(solver.solve(problemQuery)).toEqual(solution);
    });
};

describe('Arithmetic expression solvers (Unit)', () => {
    describe('solver modules can solver prepared test cases', () => {
        describe('math-expression-evaluator', () => {
            runTestCases(new MathExpressionEvaluator());
        });

        describe('mathjs', () => {
            runTestCases(new Mathjs());
        });

        describe('custom simple solver', () => {
            runTestCases(new CustomSimpleSolver());
        });
    });
});
