import * as problemService from 'app/services/problem.service';
import { NO_CONTENT, OK } from 'http-status-codes';
import * as createProblemSchema from '../../../schemas/createProblem.json';
import createValidator from '../../middlewares/inputValidator';
import { bindContext, pipeMiddleware, respond, respondWithEmpty } from '../utils/controllerUtils';

export const listProblems = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.listProblems(context.params, context), OK, respondWithEmpty)
);

export const createProblem = pipeMiddleware(
    bindContext,
    createValidator(createProblemSchema),
    respond(({ context }) => problemService.createProblem(context.params, context))
);

export const getProblem = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.getProblem(context.params))
);

export const updateProblem = pipeMiddleware(
    bindContext,
    createValidator(createProblemSchema),
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
