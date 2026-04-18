/**
 * API Clients for Gemini, Claude, and OpenAI
 * Implements integration with all three AI providers
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize API clients
const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const claudeClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Gemini API integration
 */
export async function callGemini(messages, systemPrompt) {
  try {
    const model = geminiClient.getGenerativeModel({
      model: "gemini-pro",
      systemInstruction: systemPrompt
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    throw error;
  }
}

/**
 * Claude API integration
 */
export async function callClaude(messages, systemPrompt) {
  try {
    const response = await claudeClient.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: systemPrompt,
      messages: messages
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error.message);
    throw error;
  }
}

/**
 * OpenAI API integration
 */
export async function callOpenAI(messages, systemPrompt) {
  try {
    const response = await openaiClient.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      max_tokens: 4096
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    throw error;
  }
}

/**
 * Router function to call the appropriate API based on preference
 */
export async function callAI(provider, messages, systemPrompt) {
  switch (provider.toLowerCase()) {
    case 'gemini':
    case 'google':
      return await callGemini(messages, systemPrompt);
    case 'claude':
    case 'anthropic':
      return await callClaude(messages, systemPrompt);
    case 'openai':
    case 'gpt':
      return await callOpenAI(messages, systemPrompt);
    default:
      // Default to Claude
      return await callClaude(messages, systemPrompt);
  }
}
