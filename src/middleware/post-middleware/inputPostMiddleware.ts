import Joi from "joi";
import {NextFunction, Request, Response} from "express";

export const inputPostMiddleware = (schema: Joi.ObjectSchema, source: 'body' | 'params' | 'query' = 'body') => {
    const resStatus = source === 'params' ? 404 : 400;

    return (req: Request, res: Response, next: NextFunction) => {
        const { title, shortDescription, content, blogId } = req.body;
        const validateParams = source === 'body' ? { title, shortDescription, content, blogId } : req[source]
        const { error } = schema.validate(validateParams, { abortEarly: false });

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
