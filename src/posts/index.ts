import { Router } from "express";
import { authMiddleware } from "../middleware/authMidleware";
import { getPostsController } from "./getPostsController";
import { createPostController } from "./createPostController";
import { findPostController } from "./findPostController";
import { updatePostController } from "./updatePostController";
import { deletePostController } from "./deletePostController";
import {postIdSchema, postScheme} from "../schema/post";
import {inputMiddleware} from "../middleware/blogs-middleware/inputMiddleware";
import {queryValidateMiddleware} from "../middleware/blogs-middleware/queryValidateMiddleware";
import {putPostMiddleware} from "../middleware/post-middleware/putPostMiddleware";
import {queryPostValidate} from "../middleware/post-middleware/queryPostValidate"; // Assuming similar to blogs middleware

export const postsRouter = Router();

postsRouter.get('/', getPostsController);

postsRouter.post('/',
    authMiddleware,
    inputMiddleware(postScheme, 'body'), // Validate request body
    createPostController
);

postsRouter.get('/:id',
    queryValidateMiddleware(postIdSchema), // Validate params
    findPostController
);

postsRouter.put('/:id',
    authMiddleware,
    putPostMiddleware(postIdSchema, 'params'), // Validate params
    putPostMiddleware(postScheme, 'body'), // Validate request body
    updatePostController
);

postsRouter.delete('/:id',
    authMiddleware,
    queryPostValidate(postIdSchema, 'params'), // Validate params
    deletePostController
);
