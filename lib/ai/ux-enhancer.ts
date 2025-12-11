/**
 * AI-Powered UX Enhancer
 * Provides intelligent personalization and adaptive user experiences
 */

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

export interface UserBehavior {
  pages: string[];
  timeSpent: Record<string, number>;
  interactions: string[];
  device: string;
  location: string;
  sessionId: string;
  timestamp: Date;
}

export interface PersonalizedContent {
  headline: string;
  subheadline: string;
  recommendedSections: Array<{
    id: string;
    title: string;
    content: string;
    priority: number;
  }>;
  adaptiveLayout: 'hero-focus' | 'grid-layout' | 'minimal' | 'interactive';
  callToAction: string;
  microcopy: Record<string, string>;
}

export interface Microcopy {
  buttonText: string;
  tooltip: string;
  feedback: string;
  navigation: Record<string, string>;
}

export interface Context {
  action: string;
  section: string;
  userType?: string;
  device?: string;
  timeOfDay?: string;
}

/**
 * AI-Powered UX Enhancement Class
 */
export class UXEnhancer {
  private static openai = openai('gpt-4-turbo-preview');
  private static claude = anthropic('claude-3-opus-20240229');

  /**
   * Personalize content based on user behavior
   */
  static async personalizeContent(
    userBehavior: UserBehavior,
    useClaude: boolean = true
  ): Promise<PersonalizedContent> {
    try {
      const model = useClaude ? this.claude : this.openai;

      const prompt = `
        Based on the following user behavior data, generate personalized content for a portfolio website:

        User Behavior:
        - Pages visited: ${userBehavior.pages.join(', ')}
        - Time spent on sections: ${JSON.stringify(userBehavior.timeSpent)}
        - Interactions: ${userBehavior.interactions.join(', ')}
        - Device: ${userBehavior.device}
        - Location: ${userBehavior.location}
        - Session time: ${userBehavior.timestamp.toISOString()}

        Generate personalized content including:
        1. A compelling headline
        2. A supporting subheadline
        3. 3-5 recommended sections with titles and brief content
        4. An adaptive layout type (hero-focus, grid-layout, minimal, interactive)
        5. A call-to-action button text
        6. Contextual microcopy for buttons and navigation

        Return as JSON with this structure:
        {
          "headline": "string",
          "subheadline": "string",
          "recommendedSections": [
            {
              "id": "string",
              "title": "string",
              "content": "string",
              "priority": number
            }
          ],
          "adaptiveLayout": "hero-focus|grid-layout|minimal|interactive",
          "callToAction": "string",
          "microcopy": {
            "heroButton": "string",
            "learnMore": "string",
            "contactMe": "string",
            "viewWork": "string"
          }
        }
      `;

      const response = await generateText({
        model,
        prompt,
        maxTokens: 1000,
        temperature: 0.7,
      });

      const result = JSON.parse(response.text);

      return {
        headline: result.headline,
        subheadline: result.subheadline,
        recommendedSections: result.recommendedSections,
        adaptiveLayout: result.adaptiveLayout,
        callToAction: result.callToAction,
        microcopy: result.microcopy,
      };

    } catch (error) {
      console.error('AI personalization failed:', error);

      // Fallback content
      return {
        headline: 'Welcome to DreamFolio',
        subheadline: 'Discover innovative solutions and creative excellence',
        recommendedSections: [
          {
            id: 'hero',
            title: 'Featured Work',
            content: 'Explore my latest projects and innovations',
            priority: 1,
          },
          {
            id: 'skills',
            title: 'Technical Expertise',
            content: 'Specialized in cutting-edge technologies',
            priority: 2,
          },
          {
            id: 'contact',
            title: 'Let\'s Connect',
            content: 'Ready to bring your ideas to life',
            priority: 3,
          },
        ],
        adaptiveLayout: 'hero-focus',
        callToAction: 'Explore My Work',
        microcopy: {
          heroButton: 'Get Started',
          learnMore: 'Learn More',
          contactMe: 'Contact Me',
          viewWork: 'View Work',
        },
      };
    }
  }

  /**
   * Generate contextual microcopy
   */
  static async generateMicrocopy(
    context: Context,
    useClaude: boolean = false
  ): Promise<Microcopy> {
    try {
      const model = useClaude ? this.claude : this.openai;

      const prompt = `
        Generate contextual microcopy for: "${context.action}" in the "${context.section}" section.

        Context:
        - User type: ${context.userType || 'general'}
        - Device: ${context.device || 'desktop'}
        - Time of day: ${context.timeOfDay || 'day'}

        Generate microcopy for:
        1. Primary button text
        2. Tooltip/helper text
        3. Success feedback message
        4. Navigation labels

        Keep it concise, engaging, and contextually appropriate.
        Return as JSON.
      `;

      const response = await generateText({
        model,
        prompt,
        maxTokens: 300,
        temperature: 0.6,
      });

      return JSON.parse(response.text);

    } catch (error) {
      console.error('Microcopy generation failed:', error);

      // Fallback microcopy
      return {
        buttonText: 'Continue',
        tooltip: 'Click to proceed',
        feedback: 'Action completed successfully',
        navigation: {
          home: 'Home',
          about: 'About',
          work: 'Work',
          contact: 'Contact',
        },
      };
    }
  }

  /**
   * Analyze user behavior patterns
   */
  static async analyzeBehavior(
    behaviorHistory: UserBehavior[]
  ): Promise<{
    userType: 'developer' | 'designer' | 'business' | 'student' | 'general';
    interests: string[];
    engagement: 'high' | 'medium' | 'low';
    recommendations: string[];
  }> {
    try {
      const model = this.claude;

      const prompt = `
        Analyze this user behavior history and classify the user:

        Behavior History:
        ${JSON.stringify(behaviorHistory, null, 2)}

        Classify into:
        - User type (developer/designer/business/student/general)
        - Main interests
        - Engagement level (high/medium/low)
        - Content recommendations

        Return as JSON.
      `;

      const response = await generateText({
        model,
        prompt,
        maxTokens: 500,
        temperature: 0.3,
      });

      return JSON.parse(response.text);

    } catch (error) {
      console.error('Behavior analysis failed:', error);

      return {
        userType: 'general',
        interests: ['technology', 'design'],
        engagement: 'medium',
        recommendations: ['featured projects', 'contact information'],
      };
    }
  }

  /**
   * Generate adaptive layouts based on content and user preferences
   */
  static async generateAdaptiveLayout(
    content: any,
    userPreferences: any
  ): Promise<{
    layout: string;
    components: Array<{
      type: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
      content: any;
    }>;
  }> {
    try {
      const model = this.openai;

      const prompt = `
        Generate an adaptive layout for this content:

        Content: ${JSON.stringify(content)}
        User Preferences: ${JSON.stringify(userPreferences)}

        Create a responsive layout with component positioning.
        Return as JSON with layout type and component array.
      `;

      const response = await generateText({
        model,
        prompt,
        maxTokens: 800,
        temperature: 0.4,
      });

      return JSON.parse(response.text);

    } catch (error) {
      console.error('Layout generation failed:', error);

      return {
        layout: 'grid',
        components: [],
      };
    }
  }
}

export default UXEnhancer;