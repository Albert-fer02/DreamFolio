import AdminForm from "./admin-form";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 border-b border-border/50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-headline font-bold">Admin Panel</h1>
          <Link href="/">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground mb-6">
            Use this tool to get AI-powered suggestions for optimizing your portfolio content. Enter your latest user analytics, current digital trends, and a summary of your portfolio data to receive tailored recommendations for maximizing impact and engagement.
          </p>
          <AdminForm />
        </div>
      </main>
    </div>
  );
}
