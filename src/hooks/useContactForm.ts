import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSupabaseClient, hasSupabasePublicConfig } from '../lib/supabase/client';

/**
 * Validation schema for contact form
 */
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type SubmitStatus = 'idle' | 'success' | 'error' | 'fallback';

/**
 * Custom hook that encapsulates all contact form logic.
 * Separates business logic from UI presentation following best practices.
 * 
 * @example
 * const { register, errors, isSubmitting, submitStatus, onSubmit } = useContactForm();
 */
export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!hasSupabasePublicConfig) {
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
        );

        window.location.href = `mailto:contact@dreamcoder08.com?subject=${subject}&body=${body}`;
        setSubmitStatus('fallback');
        reset();
        return;
      }

      const supabase = await getSupabaseClient();

      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
          },
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    errors,
    isSubmitting,
    submitStatus,
    handleFormSubmit: handleSubmit(onSubmit),
  };
}
