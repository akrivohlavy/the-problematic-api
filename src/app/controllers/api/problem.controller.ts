import * as problemService from 'app/services/problem.service';
import { NO_CONTENT, OK } from 'http-status-codes';
import { createRequestValidator } from '../../middlewares/inputValidator';
import { bindContext, pipeMiddleware, respond, respondWithEmpty } from '../utils/controllerUtils';

export const listProblems = pipeMiddleware(
    bindContext,
    createRequestValidator('listProblems'),
    respond(({ context }) => problemService.listProblems(context.params, context), OK, respondWithEmpty)
);

export const createProblem = pipeMiddleware(
    bindContext,
    // createRequestValidator('createProblem'),
    respond(({ context }) => problemService.createProblem(context.params, context))
);

export const getProblem = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.getProblem(context.params))
);

export const updateProblem = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.updateProblem(context.params, context))
);

export const deleteProblem = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.deleteProblem(context.params, context), NO_CONTENT)
);

export const answerProblem = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.answerProblem(context.params, context))
);
