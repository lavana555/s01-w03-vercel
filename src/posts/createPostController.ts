import { Request, Response } from 'express';
import { PostTypes } from "../db/post-types";
import {postsRepository} from "../db/post-repository";



export const createPostController = async (req: Request, res: Response) => {
    const { title, shortDescription, content, blogId } = req.body;

    const post: PostTypes = {
        id: Math.floor(Date.now() + Math.random() * 1000).toString(),
        shortDescription: shortDescription,
        content: content,
        title: title,
        blogId: blogId,
        blogName: "",
    };

    const result = await postsRepository.create(post);

    if (result.error) {
        if (result.error === 'Blog not found') {
            return res.status(404).json({
                errorsMessages: [
                    {
                        message: result.error,
                        field: "blogId",
                    }
                ]
            });
        }
        return res.status(500).json({ error: result.error });
    }

    return res.status(201).json(result.post);
};
