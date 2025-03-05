import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {// assumes by the time calling requireAuth, req.currentUser has already been set.
        throw new NotAuthorizedError();
    }

    next();
};