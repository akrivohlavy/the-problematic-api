import config from '../../config/config';
import * as expressionSolvers from './solvers';

/**
 * All solvers must implement this interface
 */
export interface IExpressionSolver {
    solve: (expression: string) => number;
}

/**
 * This is a little type-hacking so we can
 * manually select a solver module via config string
 */
interface ExpressionSolvers {
    [solver: string]: new () => IExpressionSolver;
}

const selectedModule = config.solverModule || 'MathExpressionEvaluator';
if (!(selectedModule in expressionSolvers)) {
    throw new Error(`Unknown expression solver: ${selectedModule}`);
}

const solver = new ((expressionSolvers as any) as ExpressionSolvers)[selectedModule]();

export const solveExpression = (expression: string): number => {
    return solver.solve(expression);
};
