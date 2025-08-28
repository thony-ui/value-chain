import logger from "../../../logger";
import {
  IPostsService,
  ICreatePostInput,
  PostTreeNode,
  IPost,
} from "./posts.interface";
import { PostsRepository } from "./posts.repository";

export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  createPost = async (input: ICreatePostInput) => {
    const data = await this.postsRepository.createPost(input);
    logger.info(
      `PostsService: createPost called with data: ${JSON.stringify(data)}`
    );
    return data;
  };

  repost = async (input: ICreatePostInput) => {
    const data = await this.postsRepository.repost(input);
    logger.info(
      `PostsService: repost called with data: ${JSON.stringify(data)}`
    );
    return data;
  };

  getPostChain = async (postId: string) => {
    const data = await this.postsRepository.getPostChain(postId);
    logger.info(
      `PostsService: getPostChain called with postId: ${JSON.stringify(postId)}`
    );
    return data;
  };

  getPostById = async (id: string) => {
    const data = await this.postsRepository.getPostById(id);
    logger.info(
      `PostsService: getPostById called with id: ${JSON.stringify(id)}`
    );
    return data;
  };
  getPostDescendantsTree = async (postId: string): Promise<PostTreeNode> => {
    const rootPost: IPost | null = await this.postsRepository.getPostById(
      postId
    );
    const descendants: IPost[] = await this.postsRepository.getPostDescendants(
      postId
    );

    if (!rootPost) {
      logger.error(`Post with id ${postId} not found`);
      throw new Error(`Post with id ${postId} not found`);
    }

    // Map post id to node
    const nodeMap: Record<string, PostTreeNode> = {};
    const allPosts: IPost[] = [rootPost, ...descendants];
    allPosts.forEach((post) => {
      nodeMap[post.id] = { post, children: [] };
    });

    // Build tree
    allPosts.forEach((post) => {
      if (post.parent_post_id && nodeMap[post.parent_post_id]) {
        nodeMap[post.parent_post_id].children.push(nodeMap[post.id]);
      }
    });

    const rootNode = nodeMap[rootPost.id];

    logger.info(
      `PostsService: getPostDescendantsTree called with postId: ${postId}`
    );

    return rootNode;
  };
  async getPosts(userId: string): Promise<IPost[]> {
    const data = await this.postsRepository.getPosts(userId);
    logger.info(
      `PostsService: getPosts called with userId: ${JSON.stringify(userId)}`
    );
    return data;
  }
}
