import { HttpContext } from 'app/controllers/utils/httpContext';
import { E_CODES } from '../errors';
import { NotAuthorized, NotFound, NotModified } from '../errors/classes';
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
    const { username } = context.user || {};
    const newProblem = await Problem.create({
        type,
        query,
        createdBy: username,
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

    if (problem.createdBy !== (context.user && context.user.username)) {
        throw new NotAuthorized(E_CODES.e4002);
    }

    if (type === problem.type && query === problem.query) {
        throw new NotModified(E_CODES.e0001);
    }

    await problem.update({ type, query });
    return problemToSchema(problem);
};

export const deleteProblem = async (_params: any, context: HttpContext) => {
    const problem = await loadProblem(_params.id);
    if (problem.createdBy !== (context.user && context.user.username)) {
        throw new NotAuthorized(E_CODES.e4002);
    }
    await problem.destroy(); // this is in fact a soft-delete by default
};

export const answerProblem = async (_params: any, context: HttpContext) => {
    const { answer } = context.payload;
    const problem = await loadProblem(_params.id);

    const correctAnswer = problem.getAnswer();
    const answeredCorrectly = correctAnswer === answer; // TODO: replace with safe compare
    if (!problem.answered && answeredCorrectly) {
        await problem.update({ answered: true });
    }
    return { answer, correct: answeredCorrectly };
};
