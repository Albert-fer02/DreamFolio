"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPortfolioSuggestions } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2, ServerCrash, Terminal } from "lucide-react";
import type { SuggestPortfolioUpdatesOutput } from "@/ai/flows/suggest-portfolio-updates";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  userAnalytics: z.string().min(10, "Please provide more detailed analytics."),
  digitalTrends: z.string().min(10, "Please provide more detailed trends."),
  currentPortfolioData: z
    .string()
    .min(10, "Please provide more details about your portfolio."),
});

type FormData = z.infer<typeof formSchema>;

export default function AdminForm() {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<SuggestPortfolioUpdatesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userAnalytics: "",
      digitalTrends: "",
      currentPortfolioData: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setError(null);
    setSuggestions(null);
    startTransition(async () => {
      const result = await getPortfolioSuggestions(data);
      if (result.success && result.data) {
        setSuggestions(result.data);
        toast({
          title: "Suggestions generated!",
          description: "AI has provided new portfolio update ideas.",
        });
      } else {
        setError(result.error ?? "An unknown error occurred.");
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };

  return (
    <>
      <Card className="bg-card/50 backdrop-blur-sm border-border/30">
        <CardHeader>
          <CardTitle>Portfolio Update Suggester</CardTitle>
          <CardDescription>
            Fill in the fields below to get AI-powered suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userAnalytics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Analytics Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., High traffic on 'Cyber Guardian' page, low engagement on 'Contact'..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Summarize user analytics, page views, and engagement.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="digitalTrends"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Digital Trends</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Rise of AI in fintech, demand for quantum-resistant cryptography..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Overview of trends in cybersecurity, fintech, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPortfolioData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Portfolio Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Portfolio currently has 3 main sections, focuses on pentesting projects..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A summary of your current portfolio's content.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Suggest Updates
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-8">
          <ServerCrash className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions && (
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-headline font-bold">AI Suggestions</h2>
          <Card>
            <CardHeader>
              <CardTitle>Suggested Updates</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p>{suggestions.suggestedUpdates}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rationale</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p>{suggestions.rationale}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
