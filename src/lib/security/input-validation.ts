import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// 🔒 Esquemas de validación seguros
export const secureFormSchemas = {
  adminForm: z.object({
    userAnalytics: z
      .string()
      .min(10, "Please provide more detailed analytics.")
      .max(5000, "Analytics data too long") // Límite de longitud
      .transform(sanitizeHtml), // Sanitización automática
    digitalTrends: z
      .string()
      .min(10, "Please provide more detailed trends.")
      .max(5000, "Trends data too long")
      .transform(sanitizeHtml),
    currentPortfolioData: z
      .string()
      .min(10, "Please provide more details about your portfolio.")
      .max(10000, "Portfolio data too long")
      .transform(sanitizeHtml),
  }),
  
  contactForm: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name too long")
      .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
      .transform(sanitizeHtml),
    email: z
      .string()
      .email("Invalid email address")
      .max(320, "Email too long"), // RFC 5322 limit
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(2000, "Message too long")
      .transform(sanitizeHtml),
    projectType: z
      .string()
      .max(100, "Project type too long")
      .transform(sanitizeHtml),
  }),
};

// 🧹 Función de sanitización
function sanitizeHtml(input: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic sanitization
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  }
  
  // Client-side: DOMPurify
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [] 
  });
}

// 🚦 Rate limiting (simple in-memory)
class RateLimiter {
  private requests = new Map<string, number[]>();
  
  checkLimit(identifier: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, []);
    }
    
    const requestTimes = this.requests.get(identifier)!;
    
    // Remove old requests outside the window
    const validRequests = requestTimes.filter(time => time > windowStart);
    this.requests.set(identifier, validRequests);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
}

export const rateLimiter = new RateLimiter();

// 🔐 Utilidades de seguridad
export const securityUtils = {
  // Sanitizar entrada
  sanitizeInput: sanitizeHtml,
  
  // Verificar rate limit
  checkRateLimit: (ip: string, endpoint: string) => {
    const identifier = `${ip}:${endpoint}`;
    return rateLimiter.checkLimit(identifier, 10, 60 * 1000); // 10 requests per minute
  },
  
  // Validar origen de request
  validateOrigin: (origin: string, allowedOrigins: string[]) => {
    return allowedOrigins.some(allowed => 
      origin === allowed || 
      (allowed.startsWith('.') && origin.endsWith(allowed))
    );
  },
  
  // Generar nonce para CSP
  generateNonce: () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  },
}; 