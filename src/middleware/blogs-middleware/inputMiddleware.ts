import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const inputMiddleware = (schema: Joi.ObjectSchema, source: 'body' | 'params' | 'query' = 'body') => {
    const resStatus = source === 'params' ? 404 : 400;
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[source], { abortEarly: false });

        if (error) {
            return res.status(resStatus).json({
                errorsMessages: error.details.map(err => ({
                    message: err.message || null,
                    field: err.path[0] || null
                }))
            });
        }

        next();
    };
};





