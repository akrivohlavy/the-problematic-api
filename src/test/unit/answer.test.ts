import { filterAnswered, safeCompareAnswers } from '../../app/services/utils/problemServiceUtils';
import problemsMock from './__mocks__/problems';

describe('Problem Service (Unit)', () => {
    describe('safe answer comparison', () => {
        it('casts user answer to number', () => {
            expect(safeCompareAnswers('42', 42)).toBeTrue();
            expect(safeCompareAnswers('42', 1337)).toBeFalse();
        });

        it('handles negative numbers', () => {
            expect(safeCompareAnswers('-9000', -9000)).toBeTrue();
        });

        it('compares exactly matching strings', () => {
            expect(safeCompareAnswers('No problem.', 'No problem.')).toBeTrue();
            expect(safeCompareAnswers('This might be a problem.', 'No problem.')).toBeFalse();
        });

        it('compares strings case insensitively', () => {
            expect(safeCompareAnswers('no problem.', 'NO PROBLEM.')).toBeTrue();
        });

        it('ignores whitespaces and punctuation', () => {
            expect(safeCompareAnswers(' no \tproblem! ', 'No problem.')).toBeTrue();
        });
    });

    describe('filtering list of Problems based on user answers', () => {
        it('filters answered question', () => {
            expect(problemsMock.filter(filterAnswered(true))).toMatchSnapshot();
        });

        it('filters unanswered question', () => {
            expect(problemsMock.filter(filterAnswered(false))).toMatchSnapshot();
        });
    });
});
