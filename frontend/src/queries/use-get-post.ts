import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";

export type IPost = {
  id: string;
  user_id: string;
  parent_post_id?: string | null;
  created_at: string;
};

export interface PostTreeNode {
  post: {
    id: string;
    user_id: string;
    parent_post_id?: string | null;
    created_at: string;
  };
  children: PostTreeNode[];
}

export function useGetPostById(postId: string) {
  return useQuery<IPost | null>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { data } = await axios.get(`/v1/posts/${postId}`);
      return data;
    },
    enabled: !!postId,
  });
}

export function useGetPostChain(postId: string) {
  return useQuery<IPost[]>({
    queryKey: ["post-chain", postId],
    queryFn: async () => {
      const { data } = await axios.get(`/v1/posts/${postId}/chain`);
      return data;
    },
    enabled: !!postId,
  });
}

export function useGetPostDescendants(postId: string) {
  return useQuery<PostTreeNode>({
    queryKey: ["post-descendants", postId],
    queryFn: async () => {
      const { data } = await axios.get(`/v1/posts/${postId}/descendants`);
      return data;
    },
    enabled: !!postId,
  });
}

export function useGetPosts() {
  return useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(`/v1/posts`);
      return data;
    },
  });
}
