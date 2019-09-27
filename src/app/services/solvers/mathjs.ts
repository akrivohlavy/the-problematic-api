import { evaluate } from 'mathjs';
import { IExpressionSolver } from '../expressionSolver.service';

export class Mathjs implements IExpressionSolver {
    solve(expression: string) {
        return evaluate(expression);
    }
}
