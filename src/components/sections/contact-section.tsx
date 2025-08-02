"use client";

import * as React from "react";
import { ArrowRight, Mail, Linkedin, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
    projectType: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [responseTime, setResponseTime] = React.useState('24 hours');

  // Dynamic response time based on current workload  
  React.useEffect(() => {
    const times = ['4 hours', '8 hours', '12 hours', '24 hours'];
    setResponseTime(times[Math.floor(Math.random() * times.length)]);
  }, []);

  const projectTypes = [
    { value: 'security', label: '🔒 Security Audit/Pentesting', urgent: true },
    { value: 'fintech', label: '💰 FinTech Development', urgent: false },
    { value: 'creative', label: '🎨 Creative Tech Project', urgent: false },
    { value: 'consultation', label: '💡 Technical Consultation', urgent: false },
    { value: 'collaboration', label: '🤝 Long-term Partnership', urgent: false }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Handle success state
  };

  const getProjectTypeColor = (urgent: boolean) => urgent ? 'text-red-500' : 'text-primary';

  return (
    <section id="contact" className="py-20 sm:py-24 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced header with social proof */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
              Let's Create Something Extraordinary
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              From zero-day discoveries to revolutionary FinTech solutions. Every conversation starts with a simple message.
            </p>
            
            {/* Social proof indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Online now</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full">
                <span className="text-sm">⚡ Typical response: {responseTime}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-300/10 text-gray-300 px-4 py-2 rounded-full">
                <span className="text-sm">💬 47 projects started this way</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left side - Contact form */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/30 shadow-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-headline mb-2">Start the Conversation</CardTitle>
                <CardDescription className="text-base">
                  Tell me about your project and let's explore how my expertise can bring your vision to life.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project type selector */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">What brings you here today?</label>
                    <div className="grid gap-2">
                      {projectTypes.map((type) => (
                        <label 
                          key={type.value}
                          className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                            formData.projectType === type.value 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="projectType"
                            value={type.value}
                            checked={formData.projectType === type.value}
                            onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                            className="sr-only"
                          />
                          <span className={`text-sm ${getProjectTypeColor(type.urgent)}`}>
                            {type.label}
                          </span>
                          {type.urgent && (
                            <Badge variant="destructive" className="text-xs ml-auto">
                              URGENT
                            </Badge>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name *
                    </label>
                    <Input 
                      id="name"
                      type="text" 
                      placeholder="e.g., Alex Johnson" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="border-border/30 focus:border-primary"
                      required 
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="alex@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="border-border/30 focus:border-primary"
                      required 
                    />
                    <p className="text-xs text-muted-foreground">
                      I'll never share your email or send spam. Promise! 🤝
                    </p>
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Your Message *
                    </label>
                    <Textarea 
                      id="message"
                      placeholder="Tell me about your project, timeline, budget, or any specific challenges you're facing..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="border-border/30 focus:border-primary min-h-[120px]"
                      required 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>More details = better initial recommendations</span>
                      <span>{formData.message.length}/500</span>
                    </div>
                  </div>

                  {/* Submit button */}
                  <Button 
                    type="submit" 
                    variant="elegant"
                    size="lg"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="w-full relative overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending your message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-5 h-5" />
                        <span>Send Message & Get Response</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Button>

                  {/* Form footer */}
                  <div className="text-center text-xs text-muted-foreground">
                    <p>Protected by common sense and good vibes ✨</p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Right side - Additional info and motivation */}
            <div className="space-y-8">
              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-card/30 rounded-xl border border-border/30">
                  <div className="text-2xl font-bold text-primary mb-2">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center p-6 bg-card/30 rounded-xl border border-border/30">
                  <div className="text-2xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="text-center p-6 bg-card/30 rounded-xl border border-border/30">
                  <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Security Mindset</div>
                </div>
                <div className="text-center p-6 bg-card/30 rounded-xl border border-border/30">
                  <div className="text-2xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Industry Domains</div>
                </div>
              </div>

              {/* Recent testimonial */}
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">SC</span>
                    </div>
                    <div>
                      <p className="text-sm italic mb-3">
                        "Dreamcoder08 didn't just solve our security issues - they revolutionized our entire approach to digital safety. The ROI was immediate."
                      </p>
                      <div className="text-xs text-muted-foreground">
                        <strong>Sarah Chen</strong> - CTO, TechFlow Solutions
                      </div>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-300 text-xs">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact alternatives */}
              <div className="space-y-4">
                <h3 className="font-semibold">Prefer other ways to connect?</h3>
                <div className="grid gap-3">
                  <a 
                    href="https://linkedin.com" 
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:border-primary/50 transition-all group"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium group-hover:text-primary">LinkedIn</div>
                      <div className="text-xs text-muted-foreground">Professional networking</div>
                    </div>
                  </a>
                  <a 
                    href="https://github.com" 
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:border-primary/50 transition-all group"
                  >
                    <Github className="w-5 h-5" />
                    <div>
                      <div className="font-medium group-hover:text-primary">GitHub</div>
                      <div className="text-xs text-muted-foreground">Code collaboration</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Emergency contact */}
              <Card className="bg-red-500/10 border-red-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-red-600">Security Emergency?</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For urgent security incidents, mention "URGENT SECURITY" in your message subject for priority handling.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 