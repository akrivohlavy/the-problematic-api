import * as problemService from 'app/services/problem.service';
import { bindContext, pipeMiddleware, respond } from '../utils/controllerUtils';

export const listProblems = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.listProblems(context.params))
);

export const createProblem = pipeMiddleware(
    bindContext,
    respond(({ context }) => problemService.createProblem(context.params, context))
);
