import * as auth from 'basic-auth';
import { NextFunction, Request, Response } from 'express';
import { E_CODES } from '../errors';
import { NotAuthenticated } from '../errors/classes';

/**
 * Stubby username and password authentication method.
 * Made async for easier plug in of a db.
 */
async function verifyCredentials(_username: string, _password: string): Promise<boolean> {
    return true;
}

/**
 * Stubby User getter
 */
async function getUser(username: string): Promise<object> {
    return { username };
}

export default async function basicAuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const credentials = auth(req);

    if (!credentials || !(await verifyCredentials(credentials.name, credentials.pass))) {
        res.setHeader('WWW-Authenticate', 'Basic realm="protected-api"');
        return next(new NotAuthenticated(E_CODES.e4001));
    }

    req.user = await getUser(credentials.name);
    await next();
}
