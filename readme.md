# Chayn

## Inspiration

Every viral trend starts with a spark, but today only the final uploader benefits. The originators and remixers who carried the trend get nothing. We wanted to fix this unfair system and create a way to reward _every link_ in the chain of creativity. That’s how Chayn was born.

## What it does

Chayn links every repost, stitch, duet, or remix back to its parent post. When a fan or brand pays into a trend, Chayn traces the chain back to the origin. The root creator receives 70%, while the remaining 30% is divided among the rest of the chain. This turns trends into transparent, community-driven economies where every contribution is recognized.

## How we built it

We built Chayn as a **web app** with a Next.js frontend and a Node.js backend powered by the Supabase JavaScript client.

- **Frontend**: Next.js with React Query to fetch chains, purchases, and receipts from our API routes.
- **Backend**: Node.js server using Supabase’s JS SDK to handle all database operations. Each post record stores a `parent_post_id`.
- **Purchases**: When a fan buys in, the backend calls Supabase to recursively walk the chain (`post.parent_post_id` until null).
- **Split logic**: The backend then applies the 70/30 algorithm — 70% to the root, 30% split evenly among all other users in the chain — and inserts allocation rows back through Supabase.

## Challenges we ran into

- Traversing chains recursively through Supabase’s API without writing stored procedures
- Getting the 70/30 split math correct for chains of different lengths
- Making sure allocations round correctly to the cent
- Coordinating Supabase auth with purchases and allocations

## Accomplishments that we're proud of

- Built a working demo with Supabase JS client as our single source of truth
- Implemented a simple but fair 70/30 revenue-sharing model
- Made a transparent receipt flow so anyone can see where their money went
- Shipped a clean frontend that visualizes repost chains

## What we learned

- How to structure parent-child relationships with Supabase tables and query them via the JS client
- How to implement recursive lookups in Node.js instead of SQL functions
- The importance of balancing simplicity with fairness in revenue sharing

## What's next for Chayn

- Add Supabase Row Level Security policies so only creators can edit their posts
- Connect Stripe payouts directly to creator accounts
- Optimize chain traversal with caching or pre-computed roots
- Build a browser extension to auto-capture repost relationships from TikTok

## To Run

cd frontend && npm run dev
cd backend && npm run dev
