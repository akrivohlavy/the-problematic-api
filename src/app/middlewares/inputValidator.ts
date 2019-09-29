import * as Ajv from 'ajv';
import { Middleware } from 'compose-middleware';
import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import { E_CODES } from '../errors';
import { BadRequest } from '../errors/classes';

export default function createValidator(schema: object): Middleware<Request, Response> {
    const ajv = new Ajv();
    const validate = ajv.compile(omit(schema, ['$schema']));

    return function inputValidator({ context }: Request, _res: Response, next: NextFunction) {
        const { payload } = context;

        if (!validate(payload)) {
            next(new BadRequest(E_CODES.e4000, [validate.errors]));
        }

        next();
    };
}
