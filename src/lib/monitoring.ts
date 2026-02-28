/**
 * @fileoverview Monitoring and Analytics Utilities
 * @description Service for tracking Core Web Vitals (FCP, LCP, CLS, FID, TTFB),
 * user interactions, errors, and page views. Implements Singleton pattern.
 * @module lib/monitoring
 * @see {@link https://web.dev/vitals/} Core Web Vitals documentation
 * 
 * @example
 * ```typescript
 * import { monitoring, trackButtonClick, trackFormSubmit } from '../lib/monitoring';
 * 
 * // Track button click
 * trackButtonClick('cta-hero', { position: 'above-fold' });
 * 
 * // Track form submission
 * trackFormSubmit('contact', true);
 * 
 * // Get current metrics
 * const metrics = monitoring.getMetrics();
 * ```
 */

/**
 * Core Web Vitals performance metrics.
 * Based on Google's Web Vitals initiative for measuring user experience.
 * 
 * @interface PerformanceMetrics
 * @property {number} fcp - First Contentful Paint (ms). Target: < 1.8s
 * @property {number} lcp - Largest Contentful Paint (ms). Target: < 2.5s
 * @property {number} cls - Cumulative Layout Shift. Target: < 0.1
 * @property {number} fid - First Input Delay (ms). Target: < 100ms
 * @property {number} ttfb - Time to First Byte (ms). Target: < 600ms
 * @see {@link https://web.dev/vitals/}
 */
export interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  ttfb: number;
}

/**
 * User event structure for analytics tracking.
 * 
 * @interface UserEvent
 * @property {'page_view' | 'interaction' | 'error' | 'performance'} type - Event category
 * @property {Record<string, any>} data - Event-specific payload
 * @property {number} timestamp - Unix timestamp in milliseconds
 * @property {string} url - URL where event occurred
 * @property {string} userAgent - Browser user agent string
 */
export interface UserEvent {
  type: 'page_view' | 'interaction' | 'error' | 'performance';
  data: Record<string, any>;
  timestamp: number;
  url: string;
  userAgent: string;
}

/**
 * Singleton service for performance monitoring and analytics.
 * Automatically initializes Core Web Vitals observers and error tracking.
 * 
 * @class MonitoringService
 * @example
 * ```typescript
 * // Use the exported singleton instance
 * import { monitoring } from '../lib/monitoring';
 * 
 * monitoring.trackPageView('/about');
 * monitoring.trackInteraction('button', 'click', { id: 'submit' });
 * 
 * const metrics = monitoring.getMetrics();
 * console.log(`LCP: ${metrics?.lcp}ms`);
 * ```
 */
class MonitoringService {
  /** @private Collected performance metrics */
  private metrics: PerformanceMetrics | null = null;
  /** @private Array of tracked events */
  private events: UserEvent[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initPerformanceMonitoring();
      this.initErrorTracking();
    }
  }

  private initPerformanceMonitoring() {
    // Basic performance metrics using Performance API
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.collectPerformanceMetrics();
        }, 0);
      });

      // Monitor navigation timing
      if ('PerformanceObserver' in window) {
        try {
          // Monitor Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.updateMetrics({ lcp: lastEntry.startTime });
            this.trackEvent('performance', { metric: 'LCP', value: lastEntry.startTime });
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Monitor First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              this.updateMetrics({ fid: entry.processingStart - entry.startTime });
              this.trackEvent('performance', { metric: 'FID', value: entry.processingStart - entry.startTime });
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Monitor Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            this.updateMetrics({ cls: clsValue });
            this.trackEvent('performance', { metric: 'CLS', value: clsValue });
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          console.log('Performance monitoring not fully supported');
        }
      }
    }
  }

  private initErrorTracking() {
    window.addEventListener('error', (event) => {
      this.trackEvent('error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent('error', {
        type: 'unhandled_promise_rejection',
        reason: event.reason,
        promise: event.promise,
      });
    });
  }

  private handleCLS = (metric: any) => {
    this.updateMetrics({ cls: metric.value });
    this.trackEvent('performance', { metric: 'CLS', value: metric.value });
  };

  private handleFID = (metric: any) => {
    this.updateMetrics({ fid: metric.value });
    this.trackEvent('performance', { metric: 'FID', value: metric.value });
  };

  private handleFCP = (metric: any) => {
    this.updateMetrics({ fcp: metric.value });
    this.trackEvent('performance', { metric: 'FCP', value: metric.value });
  };

  private handleLCP = (metric: any) => {
    this.updateMetrics({ lcp: metric.value });
    this.trackEvent('performance', { metric: 'LCP', value: metric.value });
  };

  private handleTTFB = (metric: any) => {
    this.updateMetrics({ ttfb: metric.value });
    this.trackEvent('performance', { metric: 'TTFB', value: metric.value });
  };

  private collectPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.updateMetrics({
        ttfb: navigation.responseStart - navigation.requestStart,
      });
    }
  }

  private updateMetrics(updates: Partial<PerformanceMetrics>) {
    this.metrics = { ...this.metrics, ...updates } as PerformanceMetrics;
  }

  /**
   * Tracks a custom analytics event.
   * Automatically adds timestamp, URL, and userAgent to the event payload.
   * In production, sends to the configured analytics service.
   * 
   * @public
   * @param {UserEvent['type']} type - Event category: 'page_view', 'interaction', 'error', or 'performance'
   * @param {Record<string, any>} data - Event-specific data payload
   * @returns {void}
   * 
   * @example
   * ```typescript
   * monitoring.trackEvent('interaction', {
   *   element: 'form',
   *   action: 'submit',
   *   formName: 'contact',
   *   success: true
   * });
   * ```
   */
  public trackEvent(type: UserEvent['type'], data: Record<string, any>) {
    const event: UserEvent = {
      type,
      data,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.events.push(event);

    // In production, send to analytics service
    if (import.meta.env.PROD) {
      this.sendToAnalytics(event);
    } else {
      console.log('Analytics Event:', event);
    }
  }

  /**
   * Sends event to external analytics service.
   * Override this method to integrate with your analytics provider.
   * 
   * @private
   * @param {UserEvent} event - Event to send
   * @returns {Promise<void>}
   */
  private async sendToAnalytics(event: UserEvent) {
    try {
      // Send to your analytics service (Vercel Analytics, Google Analytics, etc.)
      // For now, we'll just log to console in development
      console.log('Sending to analytics:', event);
    } catch (error) {
      console.error('Failed to send analytics:', error);
    }
  }

  /**
   * Tracks a page view event.
   * 
   * @public
   * @param {string} page - Page identifier (e.g., '/about', 'home', '/projects/1')
   * @returns {void}
   * 
   * @example
   * ```typescript
   * // On component mount
   * useEffect(() => {
   *   monitoring.trackPageView(window.location.pathname);
   * }, []);
   * ```
   */
  public trackPageView(page: string) {
    this.trackEvent('page_view', { page });
  }

  /**
   * Tracks a user interaction event.
   * 
   * @public
   * @param {string} element - Type of element interacted with (e.g., 'button', 'form', 'link')
   * @param {string} action - Action performed (e.g., 'click', 'submit', 'hover')
   * @param {Record<string, any>} [data] - Additional event data
   * @returns {void}
   * 
   * @example
   * ```typescript
   * monitoring.trackInteraction('button', 'click', { 
   *   buttonName: 'cta-hero',
   *   position: 'above-fold'
   * });
   * ```
   */
  public trackInteraction(element: string, action: string, data?: Record<string, any>) {
    this.trackEvent('interaction', { element, action, ...data });
  }

  /**
   * Returns the currently collected Core Web Vitals metrics.
   * 
   * @public
   * @returns {PerformanceMetrics | null} Metrics object or null if not collected yet
   * 
   * @example
   * ```typescript
   * const metrics = monitoring.getMetrics();
   * if (metrics) {
   *   console.log(`LCP: ${metrics.lcp}ms, CLS: ${metrics.cls}`);
   * }
   * ```
   */
  public getMetrics(): PerformanceMetrics | null {
    return this.metrics;
  }

  /**
   * Returns all tracked events.
   * Useful for debugging or batch sending to analytics.
   * 
   * @public
   * @returns {UserEvent[]} Array of all tracked events
   */
  public getEvents(): UserEvent[] {
    return this.events;
  }

  /**
   * Clears all stored events.
   * Call this after successfully sending events to analytics to free memory.
   * 
   * @public
   * @returns {void}
   */
  public clearEvents() {
    this.events = [];
  }
}

/**
 * Singleton instance of MonitoringService.
 * Use this for all monitoring operations.
 * 
 * @const {MonitoringService}
 * @example
 * ```typescript
 * import { monitoring } from '../lib/monitoring';
 * monitoring.trackPageView('/about');
 * ```
 */
export const monitoring = new MonitoringService();

/**
 * Convenience function to track button clicks.
 * Automatically categorizes as 'button' element with 'click' action.
 * 
 * @function trackButtonClick
 * @param {string} buttonName - Identifier for the button
 * @param {Record<string, any>} [additionalData] - Extra data to include
 * @returns {void}
 * 
 * @example
 * ```tsx
 * import { trackButtonClick } from '../lib/monitoring';
 * 
 * <button onClick={() => trackButtonClick('cta-hero', { variant: 'primary' })}>
 *   Contact Me
 * </button>
 * ```
 */
export const trackButtonClick = (buttonName: string, additionalData?: Record<string, any>) => {
  monitoring.trackInteraction('button', 'click', { buttonName, ...additionalData });
};

/**
 * Convenience function to track form submissions.
 * 
 * @function trackFormSubmit
 * @param {string} formName - Identifier for the form
 * @param {boolean} success - Whether the submission was successful
 * @returns {void}
 * 
 * @example
 * ```typescript
 * import { trackFormSubmit } from '../lib/monitoring';
 * 
 * const onSubmit = async (data) => {
 *   try {
 *     await submitForm(data);
 *     trackFormSubmit('contact', true);
 *   } catch (error) {
 *     trackFormSubmit('contact', false);
 *   }
 * };
 * ```
 */
export const trackFormSubmit = (formName: string, success: boolean) => {
  monitoring.trackInteraction('form', 'submit', { formName, success });
};

/**
 * Convenience function to track page views.
 * Wrapper for direct component usage.
 * 
 * @function trackPageView
 * @param {string} page - Page identifier (e.g., '/about', '/projects')
 * @returns {void}
 * 
 * @example
 * ```typescript
 * import { trackPageView } from '../lib/monitoring';
 * 
 * // In Astro page
 * trackPageView('/projects');
 * 
 * // In React component
 * useEffect(() => {
 *   trackPageView(window.location.pathname);
 * }, []);
 * ```
 */
export const trackPageView = (page: string) => {
  monitoring.trackPageView(page);
};