import { HttpContext } from 'app/controllers/utils/httpContext';

import Problem from '../models/Problem';

const problemToSchema = ({
    id,
    type,
    query,
    createdBy = 'unknown',
    answered = false,
}: {
    id: number;
    type: string;
    query: string;
    createdBy: string;
    answered: boolean;
}) => ({
    id,
    type,
    query,
    createdBy,
    answered,
});

export const createProblem = async (_params: any, context: HttpContext) => {
    const { type, query } = context.payload;
    const newProblem = await Problem.create({
        type,
        query,
        createdBy: context.user || 'unknown',
        answered: false,
    });
    return problemToSchema(newProblem);
};

export const listProblems = async (_params: any) => {
    const problems = await Problem.findAll();
    return problems.map(problemToSchema);
};
