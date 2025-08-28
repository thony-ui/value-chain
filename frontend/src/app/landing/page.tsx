"use client";

import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Sparkles,
  Calendar,
  BarChart3,
  Users,
  ChevronRight,
  Play,
} from "lucide-react";
import { SignInForm } from "./_components/signin-form";
import { SignUpForm } from "./_components/signup-form";

export default function LandingPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <img
                src="/valuechain-logo.svg"
                alt="ValueChain Studio Logo"
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ValueChain Studio
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowSignIn(true)}
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Build a Value Chain
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Where Everyone Benefits
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Connect content producers and consumers in a collaborative
                platform. Share, discover, and amplify posts to create value for
                everyone in the chain. Grow your audience, support creators, and
                benefit from engagement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowSignUp(true)}
                className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg text-lg px-8 py-4"
              >
                Join the Value Chain
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Collaborative Sharing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Producers and consumers connect to share and amplify posts,
                    creating a network effect that benefits all participants.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Amplify & Discover
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Discover new content and help amplify posts to reach wider
                    audiences, supporting creators and growing the community.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Mutual Benefit
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Engagement creates value for both producers and consumers.
                    Everyone benefits from participation and collaboration.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Social Proof */}
        </div>
      </main>

      {/* Sign In Modal */}
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Welcome Back
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <SignInForm />
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-700 cursor-pointer"
                onClick={() => {
                  setShowSignIn(false);
                  setShowSignUp(true);
                }}
              >
                Sign up
              </Button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Create Your Account
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <SignUpForm />
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 hover:text-blue-700 cursor-pointer"
                onClick={() => {
                  setShowSignUp(false);
                  setShowSignIn(true);
                }}
              >
                Sign in
              </Button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
