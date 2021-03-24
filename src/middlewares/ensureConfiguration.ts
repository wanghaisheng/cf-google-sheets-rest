import { Request, Response, NextFunction } from 'express';

export default function ensureConfiguration(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { client_email, private_key } = request.headers;

    if (!client_email) {
        throw Error('Client email is missing.');
    }

    if (!private_key) {
        throw Error('Private key is missing.');
    }

    request.config = {
        client_email: client_email as string,
        private_key: (private_key as string).replace(/\\n/gm, '\n'),
    }

    return next();
}