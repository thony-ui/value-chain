import { Application, Router } from "express";
import { authenticateUser } from "../../../../middleware/authorization";
import { PostsRepository } from "../../domain/posts.repository";
import { PostsService } from "../../domain/posts.service";
import { PostsController } from "../../domain/posts.controller";

export function definePostsRoutes(expressApp: Application) {
  const postsRouter = Router();
  const postsRepository = new PostsRepository();
  const postsService = new PostsService(postsRepository);
  const postsController = new PostsController(postsService);

  postsRouter.post("/", postsController.createPost);
  postsRouter.post("/repost", postsController.repost);
  postsRouter.get("/:post_id/chain", postsController.getPostChain);
  postsRouter.get("/:post_id", postsController.getPostById);
  postsRouter.get("/:post_id/descendants", postsController.getPostDescendants);
  postsRouter.get("/", postsController.getPosts);

  expressApp.use("/v1/posts", authenticateUser, postsRouter);
}
