import { HttpContext } from 'app/controllers/utils/httpContext';
import { NotFound, NotModified } from '../errors/classes';
import Problem from '../models/Problem';

const problemToSchema = ({ id, type, query, createdBy = 'unknown', answered = false }: Problem) => ({
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

export const getProblem = async (_params: any) => {
    const problem = await Problem.findByPk(_params.id);
    if (!problem) {
        throw new NotFound();
    }
    return problemToSchema(problem);
};

export const updateProblem = async (_params: any, context: HttpContext) => {
    const { type, query } = context.payload;
    const problem = await Problem.findByPk(_params.id);
    if (!problem) {
        throw new NotFound();
    }
    // TODO: replace naive comparison with iteration
    if (type === problem.type && query === problem.query) {
        throw new NotModified();
    }

    problem.type = type;
    problem.query = query;
    await problem.save();

    return problemToSchema(problem);
};
