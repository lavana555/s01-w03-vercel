import { Request, Response } from 'express';
import {blogsRepository} from "../db/blog-repository";

export const updateBlogController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, websiteUrl } = req.body;

    const updateResult = await blogsRepository.update(id, { name, description, websiteUrl });

    if (!updateResult.success) {
        return res.status(404).json({
            errorsMessages: [
                {
                    message: 'Blog not found',
                    field: "id"
                }
            ]
        });
    }

    return res.status(204).send();
};
