import * as mexp from 'math-expression-evaluator';
import { IExpressionSolver } from '../expressionSolver.service';

export class MathExpressionEvaluator implements IExpressionSolver {
    solve(expression: string) {
        return mexp.eval(expression);
    }
}
