import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios";

interface CreatePostInput {
  parent_post_id?: string | null;
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreatePostInput) => {
      const { data } = await axios.post("/v1/posts", input);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post-chain"] });
      queryClient.invalidateQueries({ queryKey: ["post-descendants"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useRepost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreatePostInput) => {
      const { data } = await axios.post(`/v1/posts/repost`, input);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post-chain"] });
      queryClient.invalidateQueries({ queryKey: ["post-descendants"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
