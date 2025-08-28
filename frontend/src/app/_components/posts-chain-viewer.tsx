import { useEffect, useState } from "react";
import { useGetPostChain, IPost } from "../../queries/use-get-post";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CytoscapeComponent from "react-cytoscapejs";

// --- Payout calculation logic ---
function calculateChainPayouts(
  chain: IPost[],
  transactionAmount: number,
  startNodeId: string
): Record<string, number> {
  const payouts: Record<string, number> = {};
  if (!chain || chain.length === 0) return payouts;

  // Find the starting index
  const startIndex = chain.findIndex((post) => post.id === startNodeId);
  if (startIndex === -1) return payouts;

  const ownerId = chain[0].id;
  const ownerShare = transactionAmount * 0.7;
  payouts[ownerId] = ownerShare;

  let remaining = transactionAmount - ownerShare;
  let decay = 0.5;
  for (let i = 1; i < chain.length; i++) {
    const payout = remaining * decay;
    payouts[chain[i].id] = payout;
    remaining -= payout;
    decay /= 2;
  }

  return payouts;
}

export function PostChainViewer({ postId }: { postId: string }) {
  const { data: chain, isLoading, error } = useGetPostChain(postId);

  // --- Dialog state ---
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // --- Transaction simulation state ---
  const [transactionNodeId, setTransactionNodeId] = useState<string | null>(
    null
  );
  const [transactionAmount, setTransactionAmount] = useState<number>(100);
  const [payouts, setPayouts] = useState<Record<string, number>>({});
  const [payoutPath, setPayoutPath] = useState<string[]>([]);

  useEffect(() => {
    if (chain && transactionNodeId) {
      setPayouts(
        calculateChainPayouts(chain, transactionAmount, transactionNodeId)
      );
      // For chain, payout path is the entire chain
      setPayoutPath(chain.map((post) => post.id));
    } else {
      setPayouts({});
      setPayoutPath([]);
    }
  }, [chain, transactionNodeId, transactionAmount]);

  // Convert chain to Cytoscape elements
  const elements = chain
    ? (() => {
        const nodes: any[] = [];
        const edges: any[] = [];

        chain.forEach((post, idx) => {
          nodes.push({
            data: {
              id: post.id,
              label: post.id.slice(0, 8),
              user_id: post.user_id,
              created_at: post.created_at,
              isInPayoutPath: payoutPath.includes(post.id),
            },
          });
          if (idx < chain.length - 1) {
            edges.push({
              data: {
                source: post.id,
                target: chain[idx + 1].id,
                isInPayoutPath:
                  payoutPath.includes(post.id) &&
                  payoutPath.includes(chain[idx + 1].id),
              },
            });
          }
        });
        return [...nodes, ...edges];
      })()
    : [];

  const stylesheet = [
    {
      selector: "node",
      style: {
        "background-color": "#ffffff",
        "border-color": "#e5e7eb",
        "border-width": 1,
        "text-valign": "center",
        "text-halign": "center",
        "font-size": 10,
        "font-weight": "500",
        color: "#374151",
        width: 40,
        height: 40,
        shape: "ellipse",
        "transition-property": "background-color, border-color, transform",
        "transition-duration": "0.2s",
        cursor: "pointer",
        "background-gradient-stop-colors": "#ffffff #f9fafb",
        "background-gradient-stop-positions": "0% 100%",
        "background-gradient-direction": "radial",
        "shadow-blur": 4,
        "shadow-color": "#d1d5db",
        "shadow-opacity": 0.2,
        "shadow-offset-x": 0,
        "shadow-offset-y": 2,
      },
    },
    {
      selector: "node[isInPayoutPath]",
      style: {
        "background-color": "#3b82f6",
        "border-color": "#2563eb",
        "border-width": 2,
        color: "#ffffff",
        "background-gradient-stop-colors": "#3b82f6 #2563eb",
        "background-gradient-stop-positions": "0% 100%",
        "background-gradient-direction": "radial",
        "shadow-blur": 8,
        "shadow-color": "#3b82f6",
        "shadow-opacity": 0.4,
        "shadow-offset-x": 0,
        "shadow-offset-y": 4,
        transform: "scale(1.05)",
      },
    },
    {
      selector: "edge",
      style: {
        width: 2,
        "line-color": "#9D00FF",
        "target-arrow-color": "#6b7280", // Contrasting darker gray for arrows
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
        "transition-property": "line-color, width",
        "transition-duration": "0.2s",
      },
    },
    {
      selector: "edge[isInPayoutPath]",
      style: {
        "line-color": "#3b82f6",
        "target-arrow-color": "#1d4ed8", // Darker blue for contrast
        width: 3,
      },
    },
    {
      selector: "node:hover",
      style: {
        "background-color": "#f3f4f6",
        "border-color": "#9ca3af",
        transform: "scale(1.02)",
        "shadow-blur": 6,
        "shadow-opacity": 0.3,
      },
    },
  ];

  const layout = {
    name: "breadthfirst",
    directed: true,
    padding: 50,
    spacingFactor: 1.5,
    animate: true,
    animationDuration: 500,
    animationEasing: "ease-out",
  };

  // --- UI ---
  return (
    <Card className="mb-8 w-full shadow-lg border border-gray-200 bg-white rounded-2xl">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-lg">🔗</span>
          Chain Playground
        </h2>
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg px-4 py-2"
        >
          Refresh
        </Button>
      </div>
      <div className="flex flex-col items-center pb-6 pt-2">
        {/* Transaction controls */}
        {chain && (
          <div className="w-full max-w-3xl mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <label className="font-medium text-gray-700 flex items-center gap-1">
                <span className="text-sm">💰</span>
                Simulate:
              </label>
              <Input
                type="number"
                value={transactionAmount}
                min={1}
                onChange={(e) => setTransactionAmount(Number(e.target.value))}
                className="w-24 h-10 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
              />
              <Select
                value={transactionNodeId || ""}
                onValueChange={(value) => setTransactionNodeId(value)}
              >
                <SelectTrigger className="w-48 h-10 border border-gray-300 rounded-lg hover:border-gray-400">
                  <SelectValue placeholder="Select Node" />
                </SelectTrigger>
                <SelectContent className="border border-gray-200 rounded-lg">
                  {chain.map((post) => (
                    <SelectItem
                      key={post.id}
                      value={post.id}
                      className="font-mono hover:bg-gray-50"
                    >
                      {post.id.slice(0, 8)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="animate-spin w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full"></div>
            Loading chain...
          </div>
        )}
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            Error: {error.message}
          </div>
        )}
        {elements.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-5xl h-[600px] bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative">
              <CytoscapeComponent
                elements={elements}
                stylesheet={stylesheet}
                layout={layout}
                cy={(cy) => {
                  cy.on("tap", "node", (evt) => {
                    const node = evt.target;
                    setSelectedNodeId(node.id());
                    setDialogOpen(true);
                  });
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            {/* --- Display payouts summary --- */}
            {Object.keys(payouts).length > 0 && (
              <div className="w-full max-w-3xl mt-6 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center flex items-center justify-center gap-1">
                  <span className="text-sm">📊</span>
                  Payouts
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 px-4 text-left font-medium text-gray-700">
                          Post ID
                        </th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(payouts)
                        .sort((a, b) => b[1] - a[1])
                        .map(([id, amount]) => (
                          <tr
                            key={id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-2 px-4 font-mono text-gray-600">
                              {id.slice(0, 8)}
                            </td>
                            <td className="py-2 px-4 font-semibold text-green-600">
                              ${amount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <span className="text-2xl">🔗</span>
            <p className="text-sm font-medium mt-1">No chain found.</p>
          </div>
        )}
      </div>
      {/* Dialog for node details */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800 flex items-center gap-1">
              <span className="text-sm">🔍</span>
              Node Details
            </DialogTitle>
            <DialogDescription className="space-y-3 mt-4">
              {selectedNodeId &&
                chain &&
                (() => {
                  const nodeData = chain.find(
                    (post) => post.id === selectedNodeId
                  );
                  return nodeData ? (
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="font-medium text-gray-700 text-xs mb-1">
                          Post ID:
                        </p>
                        <p className="font-mono text-gray-600 text-sm break-all">
                          {nodeData.id}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="font-medium text-gray-700 text-xs mb-1">
                          User ID:
                        </p>
                        <p className="font-mono text-gray-600 text-sm">
                          {nodeData.user_id}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="font-medium text-gray-700 text-xs mb-1">
                          Created At:
                        </p>
                        <p className="text-gray-600 text-sm">
                          {new Date(nodeData.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ) : null;
                })()}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
