/**
 * Super simple arithmetic expression solver
 *
 * supports:
 *  - brackets
 *  - addition
 *  - subtraction
 *  - multiplication
 *  - division
 * (in this order of precedence)
 *
 *  does not support unary operators
 */

import { IExpressionSolver } from '../expressionSolver.service';

export const splitByOperator = (expression: string, operator: string): string[] => {
    const result = [];
    let buffer = '';
    let bracketDepth = 0;

    for (const char of expression) {
        switch (char) {
            case ' ':
                break;
            case '(':
                bracketDepth += 1;
                buffer += char;
                break;
            case ')':
                bracketDepth -= 1;
                buffer += char;
                break;
            case operator:
                if (bracketDepth === 0) {
                    result.push(buffer);
                    buffer = '';
                } else {
                    buffer += char;
                }
                break;
            default:
                buffer += char;
        }
    }
    if (buffer !== '') {
        result.push(buffer);
    }

    return result;
};

const parseAtom = (expression: string, parseBracesCallback: { (expression: string): number }): number => {
    if (expression.startsWith('(')) {
        const subExpression = expression.substr(1, expression.length - 2);
        return parseBracesCallback(subExpression);
    }
    const atom = parseFloat(expression);
    if (isNaN(atom)) {
        throw new TypeError('Cannot parse expression. Unsupported characters.');
    }
    return atom;
};

export class CustomSimpleSolver implements IExpressionSolver {
    private parseDivisions = (expression: string): number => {
        const parts = splitByOperator(expression, '/');
        const values = parts.map(part => parseAtom(part, this.parseAdditions));
        return values.slice(1).reduce((acc, val) => acc / val, values[0]);
    }

    private parseMultiplications = (expression: string): number => {
        const parts = splitByOperator(expression, '*');
        const values = parts.map(part => parseAtom(part, this.parseDivisions), this);
        return values.reduce((acc, val) => acc * val, 1);
    }

    private parseSubtractions(expression: string): number {
        const parts = splitByOperator(expression, '-');
        const values = parts.map(this.parseMultiplications, this);
        return values.slice(1).reduce((acc, val) => acc - val, values[0]);
    }

    private parseAdditions(expression: string): number {
        const parts = splitByOperator(expression, '+');
        const values = parts.map(this.parseSubtractions, this);
        return values.reduce((acc, val) => acc + val, 0);
    }

    public solve(expression: string) {
        return this.parseAdditions(expression);
    }
}
