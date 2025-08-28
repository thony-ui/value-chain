import supabase from "../../../lib/supabase-client";
import logger from "../../../logger";
import {
  IPostsService,
  ICreatePostInput,
  IPost,
  PostTreeNode,
} from "./posts.interface";

export class PostsRepository implements IPostsService {
  async createPost(input: ICreatePostInput): Promise<IPost> {
    const { user_id, parent_post_id = null } = input;
    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id,
        parent_post_id,
      })
      .select()
      .single();

    if (error) {
      logger.error(`PostsRepository: createPost error: ${error.message}`);
      throw new Error(`Error creating post: ${error.message}`);
    }
    logger.info(`PostsRepository: createPost success: ${JSON.stringify(data)}`);
    return data as IPost;
  }

  async repost(input: ICreatePostInput): Promise<IPost> {
    // Repost is essentially creating a post with a parent_post_id
    return this.createPost(input);
  }

  async getPostChain(postId: string): Promise<IPost[]> {
    // Use a recursive CTE to get the full chain up to the root post
    const { data, error } = await supabase.rpc("get_post_chain", {
      post_id: postId,
    });

    if (error) {
      logger.error(`PostsRepository: getPostChain error: ${error.message}`);
      throw new Error(`Error fetching post chain: ${error.message}`);
    }
    logger.info(
      `PostsRepository: getPostChain success: ${JSON.stringify(data)}`
    );
    return data as IPost[];
  }

  async getPostById(id: string): Promise<IPost | null> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      logger.error(`PostsRepository: getPostById error: ${error.message}`);
      throw new Error(`Error fetching post: ${error.message}`);
    }
    logger.info(
      `PostsRepository: getPostById success: ${JSON.stringify(data)}`
    );
    return data as IPost | null;
  }

  async getPostDescendants(postId: string): Promise<IPost[]> {
    const { data, error } = await supabase.rpc("get_post_descendants", {
      root_post_id: postId,
    });
    if (error) {
      logger.error(
        `PostsRepository: getPostDescendants error: ${error.message}`
      );
      throw new Error(`Error fetching post descendants: ${error.message}`);
    }
    logger.info(
      `PostsRepository: getPostDescendants success: ${JSON.stringify(data)}`
    );
    return data as IPost[];
  }

  async getPosts(userId: string): Promise<IPost[]> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      logger.error(`PostsRepository: getPosts error: ${error.message}`);
      throw new Error(`Error fetching posts: ${error.message}`);
    }
    logger.info(`PostsRepository: getPosts success: ${JSON.stringify(data)}`);
    return data as IPost[];
  }
}
