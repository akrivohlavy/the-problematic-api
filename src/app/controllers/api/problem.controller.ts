import * as problemService from 'app/services/problem.service';
import { OK } from 'http-status-codes';
import { bindContext, pipeMiddleware, respond, respondWithEmpty } from '../utils/controllerUtils';

export const listProblems = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.listProblems(context.params), OK, respondWithEmpty)
);

export const createProblem = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.createProblem(context.params, context))
);

export const getProblem = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.getProblem(context.params))
);