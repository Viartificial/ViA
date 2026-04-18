/**
 * ViA Multi-Mode Chatbot - Entry Point
 * Launches the ViA chatbot with all modes and AI providers
 */

import { main } from './chatbot.js';

main().catch(error => {
  console.error('Erreur fatale:', error);
  process.exit(1);
});
