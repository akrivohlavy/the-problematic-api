import Problem, { Solution } from '../../models/Problem';

export const problemToSchema = ({ id, type, query, createdBy }: Problem) => ({
    id,
    type,
    query,
    createdBy,
});

export const safeCompareAnswers = (userAnswer: Solution, correctAnswer: Solution): boolean => {
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

export const filterAnswered = (keepAnswered: boolean) => (problem: Problem): boolean => {
    const userAnswersCount = problem.Answers.length || 0;
    return keepAnswered ? userAnswersCount > 0 : userAnswersCount === 0;
};
