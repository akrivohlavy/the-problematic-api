/**
 * Super simple arithmetic expression solver
 *
 * supports:
 *  - braces
 *  - addition
 *  - subtraction
 *  - multiplication
 *  - division
 *
 *  does not support unary operators
 */

import { IExpressionSolver } from '../expressionSolver.service';

export const splitByOperator = (expression: string, operator: string): string[] => {
    expression = expression.replace(/\s/g, '');
    const braces = [expression.indexOf('('), expression.lastIndexOf(')')];

    if (braces[0] > -1) {
        const before = expression.substring(0, braces[0]);
        const bracedPart = expression.substring(braces[0], braces[1] + 1);
        const after = expression.substring(braces[1] + 1, expression.length);

        const result = [...before.split(operator)];
        if (before.endsWith(operator)) {
            result.push(bracedPart);
        } else {
            result[result.length - 1] += bracedPart;
        }
        if (after.startsWith(operator)) {
            result.push(...after.split(operator));
        } else {
            const [a, ...rest] = after.split(operator);
            result[result.length - 1] += a;
            result.push(...rest);
        }
        return result.filter(s => s);
    }

    return expression.split(operator);
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
