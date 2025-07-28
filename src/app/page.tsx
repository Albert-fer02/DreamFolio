"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  Code,
  Github,
  Linkedin,
  Lock,
  Mail,
  Music,
  Palette,
  Shield,
  Twitter,
  Twitch,
  Youtube,
  BarChart,
  Server,
  Cloud,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ProgressRing, MultiProgressRing } from "@/components/ui/lightweight-chart";
import TypingAnimation from "@/components/typing-animation";
import { Icons } from "@/lib/icons";
import Link from "next/link";
import { EnhancedHeroSection } from "@/components/enhanced-hero";
import { EnhancedTrinitySection } from "@/components/enhanced-trinity";
import { EnhancedNavigation } from "@/components/enhanced-navigation";
import { motion } from "framer-motion";

const trinityData = [
  {
    icon: <Shield className="size-12 text-primary" />,
    title: "Cyber Guardian",
    description: "Red Team, Pentesting, Forensics.",
    prose: "Expert in offensive security, simulating advanced threats to identify and mitigate vulnerabilities before they are exploited.",
  },
  {
    icon: <BrainCircuit className="size-12 text-primary" />,
    title: "FinTech Architect",
    description: "Accountings Pro SaaS, AI Analytics.",
    prose: "Developing secure and scalable financial software solutions, leveraging AI to provide deep market insights and analytics.",
  },
  {
    icon: <Palette className="size-12 text-primary" />,
    title: "Creative Technologist",
    description: "Music, Art, Visuals.",
    prose: "Fusing technology with creativity to produce immersive music, generative art, and compelling visual experiences.",
  },
];

const techData = [
  { icon: <Icons.ReactIcon className="size-8" />, name: "React", category: "frontend" },
  { icon: <Icons.NextjsIcon className="size-8" />, name: "Next.js", category: "frontend" },
  { icon: <Icons.NodejsIcon className="size-8" />, name: "Node.js", category: "backend" },
  { icon: <Icons.TailwindIcon className="size-8" />, name: "Tailwind CSS", category: "frontend" },
  { icon: <Icons.Code className="size-8" />, name: "Python", category: "backend" },
  { icon: <Icons.Server className="size-8" />, name: "Docker", category: "devops" },
  { icon: <Icons.Cloud className="size-8" />, name: "AWS", category: "cloud" },
  { icon: <Icons.Shield className="size-8" />, name: "Solidity", category: "blockchain" },
];

const learningData = [
  {
    title: "Quantum Computing",
    progress: 75,
    color: "hsl(var(--chart-1))",
  },
  { title: "AI Ethics", progress: 60, color: "hsl(var(--chart-2))" },
  {
    title: "Advanced Cryptography",
    progress: 85,
    color: "hsl(var(--chart-3))",
  },
  { title: "Game Development", progress: 45, color: "hsl(var(--chart-4))" },
];

const collaborationData = [
  {
    title: "Open Source Security",
    description: "Contribute to hardening the security of popular open-source projects.",
    image: "https://placehold.co/600x400.png",
    hint: "open source"
  },
  {
    title: "AI-Powered Art Installations",
    description: "Collaborate on interactive art pieces that respond to human emotion.",
    image: "https://placehold.co/600x400.png",
    hint: "ai art"
  },
  {
    title: "DeFi Platform Development",
    description: "Join forces to build the next generation of decentralized finance applications.",
    image: "https://placehold.co/600x400.png",
    hint: "finance crypto"
  },
  {
    title: "Indie Game Soundtrack",
    description: "Produce dynamic and adaptive soundtracks for independent video games.",
    image: "https://placehold.co/600x400.png",
    hint: "game music"
  },
];

const socialData = [
  {
    name: "LinkedIn",
    icon: <Icons.Linkedin className="size-5" />,
    url: "https://linkedin.com",
  },
  { name: "GitHub", icon: <Icons.Github className="size-5" />, url: "https://github.com" },
  {
    name: "Twitter",
    icon: <Icons.Twitter className="size-5" />,
    url: "https://twitter.com",
  },
  {
    name: "SoundCloud",
    icon: <Icons.SoundCloudIcon className="size-5" />,
    url: "https://soundcloud.com",
  },
  {
    name: "YouTube",
    icon: <Icons.Youtube className="size-5" />,
    url: "https://youtube.com",
  },
  {
    name: "Twitch",
    icon: <Icons.Twitch className="size-5" />,
    url: "https://twitch.tv",
  },
  {
    name: "Discord",
    icon: <Icons.DiscordIcon className="size-5" />,
    url: "https://discord.com",
  },
  { name: "Reddit", icon: <Icons.RedditIcon className="size-5" />, url: "https://reddit.com" },
];

const funFactsData = [
  "Once solved a Rubik's Cube blindfolded.",
  "Has composed over 100 electronic music tracks.",
  "Can speak three languages, including Python.",
  "Favorite dish to cook is ramen from scratch.",
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedNavigation />
      <main className="flex-grow">
        <EnhancedHeroSection />
        <EnhancedTrinitySection />
        <TechSection />
        <LearningSection />
        <CollaborationSection />
        <MissionSection />
        <ConnectSection />
        <FunFactsSection />
        <ContactSection />
      </main>
      <Footer />
      <DynamicMicrocopy />
    </div>
  );
}

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold">
            <Icons.DreamcoderLogo className="h-8 w-8 text-primary"/>
            <span>Dreamfolio</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">Admin Panel</Button>
          </Link>
        </div>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section id="hero" className="py-32 sm:py-40 text-center bg-grid-primary/10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl md:text-7xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/80 mb-4">
        𓂀 Dreamcoder08 𓂀
      </h1>
      <div className="text-lg md:text-xl text-muted-foreground">
        <TypingAnimation
          texts={[
            "Cybersecurity Engineer",
            "Creative Technologist",
            "Financial Innovator",
            "Music Producer",
          ]}
        />
      </div>
    </div>
  </section>
);

const TrinitySection = () => {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);
  
  return (
    <section id="trinity" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Improved headline with value proposition */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Trinity of Innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Three specialized domains, infinite possibilities. Each area backed by real projects and proven results.
          </p>
          {/* Social proof indicator */}
          <div className="inline-flex items-center gap-2 text-sm text-primary bg-primary/10 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>50+ projects delivered across these domains</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trinityData.map((item, index) => (
            <Card
              key={item.title}
              className={`bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-500 cursor-pointer group relative overflow-hidden
                ${hoveredCard === item.title 
                  ? 'border-primary shadow-2xl shadow-primary/25 scale-105' 
                  : 'hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1'
                }`}
              onMouseEnter={() => setHoveredCard(item.title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Success indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge variant="secondary" className="text-xs">
                  {index === 0 ? '5+ years' : index === 1 ? '3+ years' : '7+ years'}
                </Badge>
              </div>

              <CardHeader className="items-center text-center pb-2">
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <CardTitle className="font-headline text-xl mb-2">{item.title}</CardTitle>
                <CardDescription className="text-primary font-medium mb-3">
                  {item.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 leading-relaxed">{item.prose}</p>
                
                {/* Specific CTAs for each domain */}
                <div className="space-y-3">
                  {index === 0 && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      >
                        View Security Projects <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <p className="text-xs text-muted-foreground">Latest: Advanced threat simulation</p>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      >
                        See FinTech Solutions <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <p className="text-xs text-muted-foreground">Latest: AI-powered analytics platform</p>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      >
                        Listen to My Music <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <p className="text-xs text-muted-foreground">Latest: Generative ambient collection</p>
                    </>
                  )}
                </div>
              </CardContent>

              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Overall CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Interested in collaborating across multiple domains?
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            Let's Build Something Amazing Together
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const TechSection = () => (
  <section id="tech" className="py-20 sm:py-24 bg-gradient-to-br from-background via-muted/5 to-background relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Badge className="glass-primary text-primary border-primary/50 px-4 py-2 text-sm font-code mb-4">
          <Code className="w-4 h-4 mr-2" />
          TECH STACK
        </Badge>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          <span className="gradient-text-cyber">Technologies</span> &{" "}
          <span className="gradient-text-financial">Tools</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-tech">
          Building the future with cutting-edge technologies across security, finance, and creativity.
        </p>
      </motion.div>

      {/* Tech Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {techData.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="glass hover-lift hover-glow p-6 rounded-xl text-center transition-all duration-300 cursor-pointer">
              <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <span className="text-sm font-code text-muted-foreground group-hover:text-primary transition-colors">
                {tech.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech Categories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 mt-16"
      >
        {/* Security Tech */}
        <div className="glass-primary p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h3 className="font-tech font-semibold text-primary">Security Stack</h3>
          </div>
          <p className="text-sm text-muted-foreground font-code">
            Penetration testing, forensics, threat modeling, and secure development practices.
          </p>
        </div>

        {/* FinTech Tech */}
        <div className="glass-secondary p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-secondary" />
            <h3 className="font-tech font-semibold text-secondary">FinTech Stack</h3>
          </div>
          <p className="text-sm text-muted-foreground font-code">
            Blockchain, AI/ML, real-time analytics, and scalable financial systems.
          </p>
        </div>

        {/* Creative Tech */}
        <div className="glass-accent p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-accent" />
            <h3 className="font-tech font-semibold text-accent">Creative Stack</h3>
          </div>
          <p className="text-sm text-muted-foreground font-code">
            Generative AI, audio processing, visual effects, and interactive experiences.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const LearningSection = () => {
  const [selectedLearning, setSelectedLearning] = React.useState<string | null>(null);
  
  // Enhanced learning data with storytelling elements
  const enhancedLearningData = [
    {
      title: "Quantum Computing",
      progress: 75,
      color: "hsl(var(--chart-1))",
      timeline: "2023 - Present",
      nextMilestone: "Quantum algorithms certification",
      motivation: "Building the future of computing",
      achievement: "Implemented first quantum encryption prototype"
    },
    {
      title: "AI Ethics",
      progress: 60,
      color: "hsl(var(--chart-2))",
      timeline: "2024 - Present", 
      nextMilestone: "Research publication",
      motivation: "Responsible AI development",
      achievement: "Led 3 ethical AI workshops"
    },
    {
      title: "Advanced Cryptography",
      progress: 85,
      color: "hsl(var(--chart-3))",
      timeline: "2022 - Present",
      nextMilestone: "Zero-knowledge proofs mastery", 
      motivation: "Securing the digital world",
      achievement: "Developed custom encryption library"
    },
    {
      title: "Game Development",
      progress: 45,
      color: "hsl(var(--chart-4))",
      timeline: "2024 - Present",
      nextMilestone: "First indie game release",
      motivation: "Combining art with technology",
      achievement: "Built procedural music engine"
    }
  ];

  return (
    <section id="learning" className="py-20 sm:py-24 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header with motivation */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Continuous Learning Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Every day is an opportunity to grow. Here's what I'm currently mastering and the milestones I'm working toward.
          </p>
          {/* Learning streak indicator */}
          <div className="inline-flex items-center gap-3 bg-orange-500/10 text-orange-600 px-6 py-3 rounded-full">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
            </div>
            <span className="font-semibold">247 consecutive days of learning</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {enhancedLearningData.map((item, index) => (
            <div 
              key={item.title} 
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedLearning === item.title ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setSelectedLearning(selectedLearning === item.title ? null : item.title)}
            >
              {/* Progress ring container */}
              <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all">
                                 <ProgressRing
                                   progress={item.progress}
                                   size={120}
                                   color={item.color}
                                   animate={true}
                                   className="mx-auto"
                                 />
                
                {/* Learning info */}
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {item.timeline}
                  </Badge>
                  
                  {/* Expanded details on selection */}
                  {selectedLearning === item.title && (
                    <div className="mt-4 space-y-3 text-sm animate-in slide-in-from-top-2">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <p className="font-medium text-primary mb-1">🎯 Next Milestone:</p>
                        <p className="text-muted-foreground">{item.nextMilestone}</p>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <p className="font-medium text-green-600 mb-1">🏆 Latest Achievement:</p>
                        <p className="text-muted-foreground">{item.achievement}</p>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <p className="font-medium text-blue-600 mb-1">💡 Why This Matters:</p>
                        <p className="text-muted-foreground">{item.motivation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-3 w-full bg-muted/30 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${item.progress}%`,
                    background: `linear-gradient(to right, ${item.color}, ${item.color}80)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Learning philosophy */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8">
          <h3 className="text-2xl font-headline font-bold mb-4">Learning Philosophy</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            "The intersection of disciplines creates the most innovative solutions. Each skill I develop amplifies the others."
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Theory + Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Community Driven</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Real-World Applied</span>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to learn together or share knowledge?
          </p>
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
            Join My Learning Community
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const CollaborationSection = () => (
  <section id="collaboration" className="py-20 sm:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Collaboration Opportunities
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {collaborationData.map((item) => (
          <Card
            key={item.title}
            className="bg-card/50 backdrop-blur-sm border-border/30 overflow-hidden group transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20"
          >
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                data-ai-hint={item.hint}
                className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <CardHeader>
              <CardTitle className="font-headline">{item.title}</CardTitle>
              <CardDescription className="text-muted-foreground">{item.description}</CardDescription>
              <Button variant="link" className="p-0 h-auto text-primary">
                Learn More <ArrowRight className="ml-2 size-4" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const MissionSection = () => (
  <section id="mission" className="py-32 text-center bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
     <div className="absolute inset-0 bg-grid-primary/10 animate-[spin_20s_linear_infinite_reverse]"></div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <h3 className="text-3xl md:text-5xl font-headline font-bold text-white leading-tight">
        "Bridging the Digital Divide Between Security, Finance, and Creativity"
      </h3>
    </div>
  </section>
);

const ConnectSection = () => (
  <section id="connect" className="py-20 sm:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Connect with Me
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {socialData.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge
              variant="outline"
              className="py-2 px-4 text-base border-border/60 hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              {social.icon}
              <span className="ml-2">{social.name}</span>
            </Badge>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const FunFactsSection = () => (
  <section id="fun-facts" className="py-20 sm:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Fun Facts
      </h2>
      <ul className="space-y-4 max-w-2xl mx-auto">
        {funFactsData.map((fact, i) => (
          <li
            key={i}
            className="p-4 rounded-lg bg-card/50 border border-transparent hover:border-primary hover:bg-card transition-all duration-300 cursor-default"
          >
            <p>{fact}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const ContactSection = () => {
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
              <div className="flex items-center gap-2 bg-purple-500/10 text-purple-600 px-4 py-2 rounded-full">
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
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium py-3 relative overflow-hidden group"
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
                          <span key={i} className="text-yellow-500 text-xs">⭐</span>
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
};

const Footer = () => {
  const [time, setTime] = React.useState('');
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="py-8 bg-black/50 text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <div className="flex justify-center items-center gap-6 mb-4">
          <span>Status: Available for opportunities</span>
          <span>Location: New York, USA</span>
          <span>Timezone: {time} (EST)</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Dreamcoder08. All Rights Reserved.</p>
        <p>Visits: 1337</p>
      </div>
    </footer>
  );
};

// Dynamic micro-copy component for enhanced engagement
const DynamicMicrocopy = () => {
  const [currentMicrocopy, setCurrentMicrocopy] = React.useState(0);
  
  const microcopies = [
    "💡 Every vulnerability fixed is a future attack prevented",
    "🚀 Code that scales, minds that innovate",
    "🎵 Where algorithms meet artistry",
    "🔐 Building tomorrow's secure foundations today",
    "💰 FinTech solutions that move at the speed of trust",
    "🌟 Turning complex problems into elegant solutions"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMicrocopy((prev) => (prev + 1) % microcopies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-xs">
      <div className="bg-gradient-to-r from-primary/90 to-accent/90 text-white p-3 rounded-lg shadow-lg backdrop-blur-sm animate-in slide-in-from-bottom-2">
        <p className="text-sm font-medium">
          {microcopies[currentMicrocopy]}
        </p>
      </div>
    </div>
  );
};
