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

const loadProblem = async (id: number): Promise<Problem> => {
    const problem = await Problem.findByPk(id);
    if (!problem) {
        throw new NotFound();
    }
    return problem;
};

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
    const problem = await loadProblem(_params.id);
    return problemToSchema(problem);
};

export const updateProblem = async (_params: any, context: HttpContext) => {
    const { type, query } = context.payload;
    const problem = await loadProblem(_params.id);

    // TODO: replace naive comparison and assignment with iteration
    if (type === problem.type && query === problem.query) {
        throw new NotModified();
    }
    await problem.update({ type, query });
    return problemToSchema(problem);
};

export const deleteProblem = async (_params: any) => {
    const problem = await loadProblem(_params.id);
    await problem.destroy(); // this is in fact a soft-delete by default
};
