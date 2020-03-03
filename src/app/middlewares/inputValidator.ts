import * as Ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';
import { get, omit } from 'lodash';
import { E_CODES } from '../errors';
import { BadRequest } from '../errors/classes';
import logger from '../logger';

const schema = require('../../../docs/openapi.json');

const getOperation = (operationId: string) => {
    for (const methods of Object.values(schema.paths)) {
        for (const op of Object.values(methods as any)) {
            if ((op as any).operationId === operationId) return op;
        }
    }
};

const getRequestSchema = (operationId: string) => {
    const op = getOperation(operationId);
    return get(op, 'requestBody.content.application/json.schema');
};

const getResponseSchema = (operationId: string, statusCode: number) => {
    const op = getOperation(operationId);
    return get(op, `responses[${statusCode}].content.application/json.schema`);
};

export const createRequestValidator = (operationId: string) => {
    const ajv = new Ajv();
    const requestSchema = getRequestSchema(operationId);
    const validateBody = ajv.compile(omit(requestSchema, ['$schema']));

    return ({ context }: Request, _res: Response, next: NextFunction) => {
        const { payload } = context;
        if (!validateBody(payload)) {
            return next(new BadRequest(E_CODES.e4000, [validateBody.errors]));
        }
        next();
    };
};
