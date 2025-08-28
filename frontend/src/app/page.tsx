"use client";
import { useState } from "react";
import { PostCreator, PostViewer } from "./_components/posts";
import { useUser } from "@/contexts/user-context";
import { PostChainViewer } from "./_components/posts-chain-viewer";
import { PostsTreeViewer } from "./_components/posts-tree-viewer";
import { useGetPosts } from "@/queries/use-get-post";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ViewType = "details" | "chain" | "tree";

export default function Home() {
  const { user, isLoading } = useUser();
  const { data: posts } = useGetPosts();

  const [activeViews, setActiveViews] = useState<Record<string, ViewType>>({});

  const setActiveView = (postId: string, view: ViewType) => {
    setActiveViews((prev) => ({ ...prev, [postId]: view }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
            🌟 Value Chain Explorer
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Discover, create, and visualize the interconnected world of posts
            and transactions.
          </p>
        </div>

        {/* User Loading */}
        {isLoading && (
          <div className="flex items-center justify-center gap-4 text-purple-200 font-semibold">
            <div className="animate-spin w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full"></div>
            Loading user...
          </div>
        )}

        {/* Post Creator */}
        <PostCreator />

        {/* Filtered Posts */}
        {posts
          ?.filter(
            (post) =>
              post.id === "9dd493b6-0ea6-4e9d-9aa4-faa656f442b6" ||
              post.id === "b758b8b7-40b1-4530-a5e5-81798812abe2"
          )
          .map((post) => {
            const activeView = activeViews[post.id] || "details";
            return (
              <div key={post.id} className="space-y-8">
                {/* Post Title and View Selector */}
                <Card className="p-6 bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-2xl shadow-xl">
                  <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold text-purple-200">
                      Post: {post.id.slice(0, 8)}
                    </h2>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant={activeView === "details" ? "default" : "outline"}
                      onClick={() => setActiveView(post.id, "details")}
                      className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                        activeView === "details"
                          ? "bg-purple-500 text-white shadow-lg"
                          : "bg-white/20 text-purple-200 border-purple-400 hover:bg-purple-400 hover:text-white"
                      }`}
                    >
                      📄 Details
                    </Button>
                    <Button
                      variant={activeView === "chain" ? "default" : "outline"}
                      onClick={() => setActiveView(post.id, "chain")}
                      className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                        activeView === "chain"
                          ? "bg-teal-500 text-white shadow-lg"
                          : "bg-white/20 text-teal-200 border-teal-400 hover:bg-teal-400 hover:text-white"
                      }`}
                    >
                      🔗 Chain
                    </Button>
                    <Button
                      variant={activeView === "tree" ? "default" : "outline"}
                      onClick={() => setActiveView(post.id, "tree")}
                      className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                        activeView === "tree"
                          ? "bg-blue-500 text-white shadow-lg"
                          : "bg-white/20 text-blue-200 border-blue-400 hover:bg-blue-400 hover:text-white"
                      }`}
                    >
                      🌳 Tree
                    </Button>
                  </div>
                </Card>

                {/* Conditional Viewer */}
                <div className="transition-opacity duration-300">
                  {activeView === "details" && <PostViewer postId={post.id} />}
                  {activeView === "chain" && (
                    <PostChainViewer postId={post.id} />
                  )}
                  {activeView === "tree" && (
                    <PostsTreeViewer postId={post.id} />
                  )}
                </div>
              </div>
            );
          })}

        {/* Footer */}
        <div className="text-center mt-16 text-purple-300 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/20">
          <p className="text-sm">Built with ❤️ for seamless value chains</p>
        </div>
      </div>
    </main>
  );
}
