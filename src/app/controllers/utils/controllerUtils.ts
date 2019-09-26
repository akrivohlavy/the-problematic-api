import { compose, Middleware } from 'compose-middleware';
import { NextFunction, Request, Response } from 'express';
import { NO_CONTENT, OK } from 'http-status-codes';
import { mapValues, omit, values } from 'lodash';
import httpContext from './httpContext';

type Handler = (req: Request, res: Response, next: NextFunction) => any;
type SimpleHandler = (req: Request, res: Response) => any;
type WriteResponse = (req: Request, res: Response, data?: any) => any;
const writeResponse: WriteResponse = (_req, res, data) => res.json(data);

export const respond = (
    controllerHandler: SimpleHandler,
    statusCode = OK,
    respondFn: WriteResponse = writeResponse
): Handler => async (req, res, next) => {
    try {
        const result = await controllerHandler(req, res);
        res.status(statusCode);
        return respondFn(req, res, result);
    } catch (error) {
        next(error);
    }
};

export const respondWithEmpty = (_req: Request, res: Response, data?: any) => {
    if (Array.isArray(data) && data.length === 0) {
        res.status(NO_CONTENT);
        return res.end();
    }
    return res.json(data);
};

export const omitOrder = (o: any) => omit(o, ['order']);
export const omitPagination = (o: any) => omit(o, ['limit', 'offset']);

export const pipeMiddleware = (...middlewares: Array<Middleware<Request, Response>>) => compose(middlewares);

export const bindContext = (req: Request, res: Response, next: NextFunction) => {
    req.context = httpContext({ req, res });
    next();
};

export const meTranslate = (req: Request, res: Response, next: NextFunction) => {
    const context = req.context || httpContext({ req, res });

    if (!context.user) {
        return next();
    }

    const translate = (object: any): any =>
        mapValues(object, (value: any) => {
            if (Array.isArray(value)) {
                return values(translate(value));
            }
            return value === 'me' ? context.user.id : value;
        });

    req.params = translate(req.params);
    req.query = translate(req.query);

    next();
};
