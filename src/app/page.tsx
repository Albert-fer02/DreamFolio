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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";
import TypingAnimation from "@/components/typing-animation";
import {
  SoundCloudIcon,
  DiscordIcon,
  RedditIcon,
  ReactIcon,
  NextjsIcon,
  NodejsIcon,
  TailwindIcon,
  DreamcoderLogo,
} from "@/components/icons";
import Link from "next/link";

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
  { icon: <ReactIcon className="size-8" />, name: "React" },
  { icon: <NextjsIcon className="size-8" />, name: "Next.js" },
  { icon: <NodejsIcon className="size-8" />, name: "Node.js" },
  { icon: <TailwindIcon className="size-8" />, name: "Tailwind CSS" },
  { icon: <Code className="size-8" />, name: "Python" },
  { icon: <Server className="size-8" />, name: "Docker" },
  { icon: <Cloud className="size-8" />, name: "AWS" },
  { icon: <Shield className="size-8" />, name: "Solidity" },
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
    icon: <Linkedin className="size-5" />,
    url: "https://linkedin.com",
  },
  { name: "GitHub", icon: <Github className="size-5" />, url: "https://github.com" },
  {
    name: "Twitter",
    icon: <Twitter className="size-5" />,
    url: "https://twitter.com",
  },
  {
    name: "SoundCloud",
    icon: <SoundCloudIcon className="size-5" />,
    url: "https://soundcloud.com",
  },
  {
    name: "YouTube",
    icon: <Youtube className="size-5" />,
    url: "https://youtube.com",
  },
  {
    name: "Twitch",
    icon: <Twitch className="size-5" />,
    url: "https://twitch.tv",
  },
  {
    name: "Discord",
    icon: <DiscordIcon className="size-5" />,
    url: "https://discord.com",
  },
  { name: "Reddit", icon: <RedditIcon className="size-5" />, url: "https://reddit.com" },
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
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TrinitySection />
        <TechSection />
        <LearningSection />
        <CollaborationSection />
        <MissionSection />
        <ConnectSection />
        <FunFactsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold">
            <DreamcoderLogo className="h-8 w-8 text-primary"/>
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

const TrinitySection = () => (
  <section id="trinity" className="py-20 sm:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Trinity of Innovation
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {trinityData.map((item) => (
          <Card
            key={item.title}
            className="bg-card/50 backdrop-blur-sm border-border/30 transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
          >
            <CardHeader className="items-center text-center">
              {item.icon}
              <CardTitle className="font-headline mt-4">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">{item.prose}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const TechSection = () => (
  <section id="tech" className="py-20 sm:py-24 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Technologies & Tools
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
          {techData.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-2 text-muted-foreground transition-all hover:text-primary"
            >
              {tech.icon}
              <span className="text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const LearningSection = () => (
  <section id="learning" className="py-20 sm:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Learning Journey
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {learningData.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-4">
            <ChartContainer
              config={{
                progress: { label: "Progress" },
              }}
              className="mx-auto aspect-square h-48"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={[
                    { name: "progress", value: item.progress, fill: item.color },
                    { name: "remaining", value: 100 - item.progress, fill: "hsl(var(--muted))" },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={2}
                >
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="text-center">
              <p className="font-semibold">{item.title}</p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {item.progress}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

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

const ContactSection = () => (
  <section id="contact" className="py-20 sm:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Get in Touch</CardTitle>
          <CardDescription>
            Have a project in mind or just want to say hi?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input type="text" placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <Textarea placeholder="Your Message" rows={5} />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Send Message <Mail className="ml-2 size-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </section>
);

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
