/**
 * Service configuration - factory functions for creating service instances
 */

import { AiChatService } from '@/application/services/ai-chat.service';
import { ContactService } from '@/application/services/contact.service';
import { GeminiAiService } from '../services/gemini-ai.service';
import { ResendEmailService } from '../services/resend-email.service';

/**
 * Create and configure email service
 */
export function createEmailService(): ResendEmailService {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = 'Portfolio Contact <onboarding@resend.dev>';
  const toEmail = 'achievafuturagemilang@gmail.com';

  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is required');
  }

  return new ResendEmailService(apiKey, fromEmail, toEmail);
}

/**
 * Create and configure AI service
 */
export function createAiService(): GeminiAiService {
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = process.env.GEMINI_API_URL;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }

  if (!apiUrl) {
    throw new Error('GEMINI_API_URL environment variable is required');
  }

  return new GeminiAiService(apiKey, apiUrl);
}

/**
 * Create contact service with dependencies
 */
export function createContactService(): ContactService {
  const emailService = createEmailService();
  return new ContactService(emailService);
}

/**
 * Create AI chat service with dependencies
 */
export function createAiChatService(): AiChatService {
  const aiService = createAiService();
  return new AiChatService(aiService);
}
