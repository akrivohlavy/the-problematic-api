import {
    BAD_REQUEST,
    FORBIDDEN,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    NOT_MODIFIED,
    UNAUTHORIZED,
    UNPROCESSABLE_ENTITY,
} from 'http-status-codes';
import { E_CODES } from '.';
import * as coreErrors from './coreClasses';

type E_CODE = typeof E_CODES[keyof typeof E_CODES];

const apiErrorData = (error?: E_CODE, errorData?: object) => {
    const { message, code } = (error as any) || { message: '', code: '' };
    return [code, message, errorData] as [string, string, any];
};

/* tslint:disable:max-classes-per-file */
export class NotModified extends coreErrors.HttpJsonError {
    constructor(error?: E_CODE, errorData?: object) {
        super(NOT_MODIFIED, ...apiErrorData(error, errorData));
    }
}

export class BadRequest extends coreErrors.HttpJsonError {
    constructor(error?: E_CODE, errorData?: object) {
        super(BAD_REQUEST, ...apiErrorData(error, errorData));
    }
}

export class NotAuthorized extends coreErrors.HttpJsonError {
    constructor(error?: E_CODE, errorData?: object) {
        super(FORBIDDEN, ...apiErrorData(error, errorData));
    }
}

export class ValidationError extends coreErrors.HttpJsonError {
    constructor(error?: E_CODE, errorData?: object) {
        super(UNPROCESSABLE_ENTITY, ...apiErrorData(error, errorData));
    }
}

export class NotAuthenticated extends coreErrors.HttpJsonError {
    constructor(error?: E_CODE, errorData?: object) {
        super(UNAUTHORIZED, ...apiErrorData(error, errorData));
    }
}

export class NotFound extends coreErrors.HttpJsonError {
    constructor(error?: E_CODE, errorData?: object) {
        super(NOT_FOUND, ...apiErrorData(error, errorData));
    }
}

export class ServerError extends coreErrors.HttpJsonError {
    constructor(error?: E_CODE, errorData?: object) {
        super(INTERNAL_SERVER_ERROR, ...apiErrorData(error, errorData));
    }
}
