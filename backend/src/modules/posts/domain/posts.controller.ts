import type { NextFunction, Request, Response } from "express";
import { validateCreatePost, validateGetPost } from "./posts.validator";
import { PostsService } from "./posts.service";
import logger from "../../../logger";

export class PostsController {
  constructor(private postsService: PostsService) {}

  createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { parent_post_id } = req.body;
    const user_id = req.user.id;
    try {
      const parsedData = validateCreatePost({ user_id, parent_post_id });
      logger.info(
        `PostsController: createPost called with data: ${JSON.stringify(
          parsedData
        )}`
      );
      const post = await this.postsService.createPost(parsedData);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  repost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { parent_post_id } = req.body;
    const user_id = req.user.id;
    try {
      const parsedData = validateCreatePost({ user_id, parent_post_id });
      logger.info(
        `PostsController: repost called with data: ${JSON.stringify(
          parsedData
        )}`
      );
      const post = await this.postsService.repost(parsedData);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  getPostChain = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { post_id } = req.params;
    try {
      const parsedId = validateGetPost({ id: post_id });
      logger.info(
        `PostsController: getPostChain called with post_id: ${JSON.stringify(
          parsedId
        )}`
      );
      const chain = await this.postsService.getPostChain(parsedId.id);
      res.status(200).json(chain);
    } catch (error) {
      next(error);
    }
  };

  getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { post_id } = req.params;
    try {
      const parsedId = validateGetPost({ id: post_id });
      logger.info(
        `PostsController: getPostById called with post_id: ${JSON.stringify(
          parsedId
        )}`
      );
      const post = await this.postsService.getPostById(parsedId.id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };
  getPostDescendants = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { post_id } = req.params;
    try {
      const parsedId = validateGetPost({ id: post_id });
      logger.info(
        `PostsController: getPostDescendants called with post_id: ${JSON.stringify(
          parsedId
        )}`
      );
      const descendants = await this.postsService.getPostDescendantsTree(
        parsedId.id
      );
      res.status(200).json(descendants);
    } catch (error) {
      next(error);
    }
  };
  getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user_id = req.user.id;
    try {
      const posts = await this.postsService.getPosts(user_id);
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };
}
