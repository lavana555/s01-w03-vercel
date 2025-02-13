import { Request, Response } from 'express';
import {blogsRepository} from "../db/blog-repository";

export const findBlogController = async (req: Request, res: Response) => {
    const findValue = blogsRepository.find(req.params.id);
    if (findValue) {
        return res.status(200).json(findValue)
    } else {
        return res.status(404).json({
            errorMessage: [
                {
                    message: 'Blog not found',
                    field: "id"
                }
            ]
        })
    }
}
