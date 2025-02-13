import { Request, Response } from 'express';
import {blogsRepository} from "../db/blog-repository";

export const postBlogsController = async (req: Request, res: Response) => {
    const { name, description, websiteUrl } = req.body;

    const result = await blogsRepository.create({ name, description, websiteUrl });

    if (result.error) {
        return res.status(500).json({ error: result.error });
    }

    return res.status(201).json(result);
};
