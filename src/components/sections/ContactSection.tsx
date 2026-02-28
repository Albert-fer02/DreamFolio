import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Copy, Check, Terminal } from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';
import { Button, Input, Textarea, Card } from '../ui';
import { cn } from '../../lib/utils';
import { hasSupabasePublicConfig } from '../../lib/supabase/client';

/**
 * Contact section component with form and social links.
 * Uses extracted hook for logic separation and atomic UI components.
 */
const ContactSection: React.FC = () => {
  const { register, errors, isSubmitting, submitStatus, handleFormSubmit } = useContactForm();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@dreamcoder08.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { href: 'https://github.com/Albert-fer02', icon: Github, label: 'GitHub profile' },
    { href: 'mailto:contact@dreamcoder08.com', icon: Mail, label: 'Email Dreamcoder08' },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/6 bg-black/30 py-28"
      aria-labelledby="contact-heading"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute right-0 top-0 p-12 opacity-[0.04]" aria-hidden="true">
        <Terminal size={400} strokeWidth={0.5} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-24 items-start">

          {/* Left Column (40%) */}
          <div className="lg:col-span-2 space-y-12 pt-8">
            <div className="space-y-6">
              <p className="font-code text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Contact
              </p>
              <h2
                id="contact-heading"
                className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-tight tracking-[-0.04em]"
              >
                Build the next
                <br />
                serious system.
              </h2>
              <p className="max-w-sm text-lg leading-relaxed text-zinc-400">
                If the work needs structure, clarity, and execution discipline,
                this is the right channel.
              </p>
              {!hasSupabasePublicConfig && (
                <p className="max-w-sm rounded-2xl border border-accent/[0.16] bg-accent/[0.05] px-4 py-3 text-sm leading-7 text-zinc-300">
                  Static deployment mode is enabled. Submitting the form will open your email client instead of sending through a hosted backend.
                </p>
              )}
            </div>

            {/* Email Copier */}
            <button
              className="group cursor-pointer text-left w-full"
              onClick={handleCopyEmail}
              aria-label={copied ? 'Email copied to clipboard' : 'Copy email address to clipboard'}
            >
              <div className="mb-2 font-code text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Direct contact
              </div>
              <div className="flex items-center gap-4 text-2xl md:text-3xl font-light text-white transition-colors duration-300 group-hover:text-zinc-300">
                <span>contact@dreamcoder08.com</span>
                <span className={cn(
                  "rounded-full border border-white/8 bg-white/[0.03] p-2 transition-all duration-300 transform",
                  copied ? "opacity-100 scale-100" : "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                )}>
                  {copied ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
                </span>
              </div>
            </button>

            {/* Social Links */}
            <nav aria-label="External contact links">
              <ul className="flex gap-6">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-block text-zinc-500 transition-colors duration-300 transform hover:-translate-y-1 hover:text-white"
                    >
                      <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Column (60%) - Clean Glass Form */}
          <div className="lg:col-span-3">
            <Card variant="glass" className="p-8 md:p-12">
              {/* Form Background Accent */}
              <div
                className="pointer-events-none absolute -mr-16 -mt-16 right-0 top-0 h-64 w-64 rounded-full bg-white/[0.04] blur-[80px]"
                aria-hidden="true"
              />

              <form onSubmit={handleFormSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <Input
                    {...register('name')}
                    label="Name"
                    placeholder="John Doe"
                    error={errors.name?.message}
                  />
                  <Input
                    {...register('email')}
                    type="email"
                    label="Email"
                    placeholder="john@example.com"
                    error={errors.email?.message}
                  />
                </div>

                <Input
                  {...register('subject')}
                  label="Subject"
                  placeholder="Project Inquiry"
                  error={errors.subject?.message}
                />

                <Textarea
                  {...register('message')}
                  label="Message"
                  rows={4}
                  placeholder="Tell me about your vision..."
                  error={errors.message?.message}
                />

                <div className="pt-4">
                  <Button type="submit" loading={isSubmitting} size="lg">
                    {isSubmitting
                      ? 'Preparing...'
                      : hasSupabasePublicConfig
                        ? 'Start the project brief'
                        : 'Open email draft'}
                    {!isSubmitting && <Mail size={18} aria-hidden="true" />}
                  </Button>
                </div>

                {submitStatus === 'fallback' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-accent/[0.16] bg-accent/[0.06] p-4 text-sm font-code text-zinc-100"
                    role="status"
                    aria-live="polite"
                  >
                    &gt; Opening your local email client with a prefilled draft.
                  </motion.div>
                )}

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-code text-zinc-100"
                    role="status"
                    aria-live="polite"
                  >
                    &gt; Message received. I will review the brief and respond.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-code text-red-300"
                    role="alert"
                    aria-live="assertive"
                  >
                    &gt; Message failed. Retry or use direct email.
                  </motion.div>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
