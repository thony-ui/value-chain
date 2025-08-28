export interface IPost {
  id: string;
  user_id: string;
  parent_post_id?: string | null;
  created_at: string;
}

export interface ICreatePostInput {
  user_id: string;
  parent_post_id?: string | null;
}
export interface PostTreeNode {
  post: IPost;
  children: PostTreeNode[];
}

export interface IPostsService {
  createPost: (input: ICreatePostInput) => Promise<IPost>;
  repost: (input: ICreatePostInput) => Promise<IPost>;
  getPostChain: (postId: string) => Promise<IPost[]>;
  getPostById: (id: string) => Promise<IPost | null>;

  getPostDescendants(postId: string): Promise<IPost[]>;

  getPosts: (userId: string) => Promise<IPost[]>;
}
