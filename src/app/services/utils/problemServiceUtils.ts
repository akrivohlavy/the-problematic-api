import Problem, { Answer } from '../../models/Problem';

export const problemToSchema = ({ id, type, query, createdBy, answered = false }: Problem) => ({
    id,
    type,
    query,
    createdBy,
    answered,
});

export const safeCompareAnswers = (userAnswer: Answer, correctAnswer: Answer): boolean => {
    if (typeof correctAnswer === 'number') {
        return correctAnswer === +userAnswer;
    }
    if (typeof correctAnswer === 'string') {
        const compareOptions = {
            sensitivity: 'base',
            ignorePunctuation: true,
        };

        return (correctAnswer as string).localeCompare(userAnswer as string, undefined, compareOptions) === 0;
    }
    throw new TypeError(`Cannot safely compare unexpected type: ${typeof correctAnswer}`);
};
