import { useState } from "react";
import { useCreatePost, useRepost } from "../../mutations/use-create-post";
import {
  useGetPostById,
  useGetPostChain,
  IPost,
} from "../../queries/use-get-post";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function PostCreator() {
  const [parentPostId, setParentPostId] = useState<string>("");
  const { mutate: createPost, isSuccess } = useCreatePost();
  const isLoading = false; // You can enhance this by using the isLoading state from the mutation

  const handleCreate = () => {
    createPost({ parent_post_id: parentPostId || null });
  };

  return (
    <Card className="p-8 mb-8 shadow-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-teal-50 rounded-3xl backdrop-blur-sm">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <span className="text-4xl">✨</span>
          Create a New Post
        </h2>
        <p className="text-purple-600 mt-2">Start your value chain journey</p>
      </div>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-purple-700 flex items-center gap-2">
            <span className="text-xl">🔗</span>
            Parent Post ID (Optional)
          </label>
          <Input
            placeholder="e.g., abc123..."
            value={parentPostId}
            onChange={(e) => setParentPostId(e.target.value)}
            className="h-12 text-center font-medium border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white/70"
          />
        </div>
        <Button
          onClick={handleCreate}
          disabled={isLoading}
          className="w-full h-14 bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              Creating...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl">🚀</span>
              Create Post
            </div>
          )}
        </Button>
        {isSuccess && (
          <div className="text-center bg-green-50 border border-green-200 rounded-xl p-4">
            <span className="text-2xl">✅</span>
            <p className="text-green-700 font-semibold mt-2">
              Post created successfully!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export function PostViewer({ postId }: { postId: string }) {
  const { data: post, isLoading, error } = useGetPostById(postId);
  const { mutate: repost, isSuccess: repostSuccess } = useRepost();

  const repostLoading = false;
  const handleRepost = () => {
    if (post) {
      repost({ parent_post_id: post.id });
    }
  };

  return (
    <Card className="p-8 mb-8 shadow-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-teal-50 rounded-3xl backdrop-blur-sm">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <span className="text-4xl">📄</span>
          Post Details
        </h2>
        <p className="text-purple-600 mt-2">Explore the post's journey</p>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center gap-3 text-purple-600 font-semibold">
          <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full"></div>
          Loading post...
        </div>
      )}
      {error && (
        <div className="text-center bg-red-50 border border-red-200 rounded-xl p-4">
          <span className="text-2xl">❌</span>
          <p className="text-red-700 font-semibold mt-2">
            Error loading post: {error.message}
          </p>
        </div>
      )}
      {post ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/70 rounded-xl p-4 border border-purple-200 shadow-md">
              <Badge
                variant="outline"
                className="mb-2 text-xs px-3 py-1 bg-purple-100 border-purple-400 text-purple-700"
              >
                <span className="mr-1">🆔</span> Post ID
              </Badge>
              <p className="font-mono text-gray-700 break-all">{post.id}</p>
            </div>
            <div className="bg-white/70 rounded-xl p-4 border border-purple-200 shadow-md">
              <Badge
                variant="outline"
                className="mb-2 text-xs px-3 py-1 bg-indigo-100 border-indigo-400 text-indigo-700"
              >
                <span className="mr-1">👤</span> User
              </Badge>
              <p className="font-semibold text-indigo-700">{post.user_id}</p>
            </div>
            <div className="bg-white/70 rounded-xl p-4 border border-purple-200 shadow-md">
              <Badge
                variant="outline"
                className="mb-2 text-xs px-3 py-1 bg-gray-100 border-gray-400 text-gray-700"
              >
                <span className="mr-1">🔗</span> Parent
              </Badge>
              <p className="text-gray-700">
                {post.parent_post_id || (
                  <span className="italic text-gray-400">None (Root Post)</span>
                )}
              </p>
            </div>
            <div className="bg-white/70 rounded-xl p-4 border border-purple-200 shadow-md">
              <Badge
                variant="outline"
                className="mb-2 text-xs px-3 py-1 bg-green-100 border-green-400 text-green-700"
              >
                <span className="mr-1">🕒</span> Created
              </Badge>
              <p className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          <Button
            onClick={handleRepost}
            disabled={repostLoading}
            className="w-full h-14 bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {repostLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Reposting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xl">🔄</span>
                Repost
              </div>
            )}
          </Button>
          {repostSuccess && (
            <div className="text-center bg-green-50 border border-green-200 rounded-xl p-4">
              <span className="text-2xl">✅</span>
              <p className="text-green-700 font-semibold mt-2">
                Reposted successfully!
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8 bg-white/50 rounded-xl p-8 border border-purple-200">
          <span className="text-4xl">📭</span>
          <p className="text-lg font-semibold mt-2">No post found.</p>
        </div>
      )}
    </Card>
  );
}
