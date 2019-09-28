import { HttpContext } from 'app/controllers/utils/httpContext';
import { ProblemType } from '../enums';
import { E_CODES } from '../errors';
import { NotAuthorized, NotFound, NotModified } from '../errors/classes';
import Answer from '../models/Answer';
import Problem from '../models/Problem';
import { filterAnswered, problemToSchema, safeCompareAnswers } from './utils/problemServiceUtils';

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
    });
    return problemToSchema(newProblem);
};

export const listProblems = async (params: any, context: HttpContext) => {
    const { username } = context.user || {};
    const where: any = {};
    const include: any = [
        {
            model: Answer,
            where: { username },
            required: false,
        },
    ];

    if (params.type) {
        where.type = ProblemType[params.type];
    }

    let problems = await Problem.findAll({ where, include });

    if (params.answered) {
        problems = problems.filter(filterAnswered(params.answered === 'true'));
    }

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
    const { answer: submittedAnswer } = context.payload;
    const { username } = context.user || {};

    const problem = await loadProblem(_params.id);
    const correctAnswer = problem.getSolution();
    const answeredCorrectly = safeCompareAnswers(submittedAnswer, correctAnswer);

    if (answeredCorrectly) {
        const answer = await Answer.create({ username });
        await answer.setProblem(problem);
    }
    return { answer: submittedAnswer, correct: answeredCorrectly };
};
