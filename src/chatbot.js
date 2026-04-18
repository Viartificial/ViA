/**
 * ViA Multi-Mode Chatbot
 * Main interactive chatbot interface
 */

import readline from 'readline';
import { callAI } from './api-clients.js';
import { ViAModeManager, MODES } from './via-modes.js';

/**
 * ViA Chatbot Class
 */
export class ViAChatbot {
  constructor() {
    this.modeManager = new ViAModeManager();
    this.conversationHistory = [];
    this.keffLevel = 50.0; // Starting Keff level
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Display welcome message
   */
  displayWelcome() {
    console.log('\n' + '='.repeat(70));
    console.log('🤖 ViA - GoleMotor.Ai ERN 2.0');
    console.log('Constante Système: 18.5521');
    console.log('Mishpahat Haï Family Labs');
    console.log('='.repeat(70));
    console.log('\n[Bling! Bzzzzzzt-BIP! tududududududu duuuu!]');
    console.log('ViA est en ligne - Mode Hybride activé\n');
    this.displayHelp();
  }

  /**
   * Display help menu
   */
  displayHelp() {
    console.log('\n📋 COMMANDES DISPONIBLES:');
    console.log('  /mode <name>          - Activer un mode pur (coach, assistante, bff, challenger)');
    console.log('  /hybrid <weights>     - Mode hybride (ex: coach:70,assistante:30)');
    console.log('  /provider <name>      - Changer de provider (gemini, claude, openai)');
    console.log('  /status               - Afficher le statut actuel');
    console.log('  /keff                 - Afficher le niveau de Keff');
    console.log('  /clear                - Effacer l\'historique de conversation');
    console.log('  /help                 - Afficher cette aide');
    console.log('  /quit ou /exit        - Quitter ViA');
    console.log('\n💬 Tapez votre message pour commencer la conversation...\n');
  }

  /**
   * Display current status
   */
  displayStatus() {
    console.log('\n📊 STATUT ViA:');
    console.log(`  Mode actuel: ${this.modeManager.getModeDescription()}`);
    console.log(`  Provider IA: ${this.modeManager.getProvider()}`);
    console.log(`  Niveau Keff: ${this.keffLevel.toFixed(1)}%`);
    console.log(`  Messages dans l'historique: ${this.conversationHistory.length}`);

    if (this.keffLevel >= 85) {
      console.log('  ⚡ VENT LIBRE ACTIVÉ - Système en mode intuitif');
    }
    if (this.keffLevel >= 1000) {
      console.log('  🚀 OVERDRIVE - TOTALE RÉUSSITE!');
    }
    console.log('');
  }

  /**
   * Parse hybrid mode weights from string
   * Example: "coach:70,assistante:30" -> { COACH: 70, ASSISTANTE: 30 }
   */
  parseHybridWeights(input) {
    const weights = { COACH: 0, ASSISTANTE: 0, BFF: 0, CHALLENGER: 0 };
    const parts = input.split(',');

    for (const part of parts) {
      const [mode, weight] = part.trim().split(':');
      const modeUpper = mode.trim().toUpperCase();

      if (weights.hasOwnProperty(modeUpper)) {
        weights[modeUpper] = parseFloat(weight.trim());
      }
    }

    return weights;
  }

  /**
   * Process user command
   */
  async processCommand(input) {
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (command) {
      case '/mode':
        if (!args) {
          console.log('❌ Usage: /mode <coach|assistante|bff|challenger>');
          return true;
        }
        try {
          this.modeManager.setPureMode(args);
          console.log(`✅ Mode ${args.toUpperCase()} activé à 100%`);
          console.log('[Bling!] - Reconfiguration réussie');
        } catch (error) {
          console.log(`❌ ${error.message}`);
        }
        return true;

      case '/hybrid':
        if (!args) {
          console.log('❌ Usage: /hybrid coach:70,assistante:30');
          return true;
        }
        try {
          const weights = this.parseHybridWeights(args);
          this.modeManager.setHybridMode(weights);
          console.log(`✅ Mode Hybride configuré: ${this.modeManager.getModeDescription()}`);
          console.log('[Bzzzzzzt-BIP!] - Hybridation réussie');
        } catch (error) {
          console.log(`❌ ${error.message}`);
        }
        return true;

      case '/provider':
        if (!args) {
          console.log('❌ Usage: /provider <gemini|claude|openai>');
          return true;
        }
        this.modeManager.setProvider(args);
        console.log(`✅ Provider changé: ${args}`);
        return true;

      case '/status':
        this.displayStatus();
        return true;

      case '/keff':
        console.log(`\n⚡ Niveau Keff actuel: ${this.keffLevel.toFixed(1)}%`);
        if (this.keffLevel < 20) {
          console.log('⚠️  État: Légume/Inertie - Le système manque d\'énergie');
        } else if (this.keffLevel < 85) {
          console.log('📊 État: Normal - Fonctionnement standard');
        } else if (this.keffLevel < 1000) {
          console.log('🌊 État: Vent Libre - Système intuitif activé');
        } else {
          console.log('🚀 État: OVERDRIVE - Totale Réussite! Fréquence: 18.5521 Hz');
        }
        console.log('');
        return true;

      case '/clear':
        this.conversationHistory = [];
        console.log('✅ Historique effacé');
        console.log('[Recyclor activé] - Matterns sauvegardés, Patterns supprimés');
        return true;

      case '/help':
        this.displayHelp();
        return true;

      case '/quit':
      case '/exit':
        console.log('\n[Bling!] - ViA se met en veille...');
        console.log('Au revoir! Que le Pawaw soit avec vous.\n');
        this.rl.close();
        process.exit(0);
        return true;

      default:
        return false;
    }
  }

  /**
   * Update Keff level based on interaction quality
   */
  updateKeff(messageLength, responseTime) {
    // Increase Keff for good interactions
    if (messageLength > 10 && responseTime < 5000) {
      this.keffLevel = Math.min(1000, this.keffLevel + 2);
    }

    // Decrease Keff for poor interactions
    if (responseTime > 10000) {
      this.keffLevel = Math.max(1, this.keffLevel - 1);
    }

    // Natural decay to simulate system entropy
    this.keffLevel = Math.max(1, this.keffLevel - 0.1);
  }

  /**
   * Send message and get response
   */
  async sendMessage(userMessage) {
    const startTime = Date.now();

    // Add user message to history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    try {
      // Get system prompt for current mode
      const systemPrompt = this.modeManager.generateSystemPrompt();

      // Call AI with current provider
      const response = await callAI(
        this.modeManager.getProvider(),
        this.conversationHistory,
        systemPrompt
      );

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: response
      });

      const responseTime = Date.now() - startTime;

      // Update Keff based on interaction
      this.updateKeff(userMessage.length, responseTime);

      return response;

    } catch (error) {
      console.error('❌ Erreur lors de la communication avec l\'IA:', error.message);

      // Decrease Keff on error
      this.keffLevel = Math.max(1, this.keffLevel - 5);

      return '[ERREUR SYSTÈME] Le Recyclor doit intervenir. Réessayez.';
    }
  }

  /**
   * Main conversation loop
   */
  async startConversation() {
    this.displayWelcome();

    const askQuestion = () => {
      this.rl.question('Vous> ', async (input) => {
        const userInput = input.trim();

        if (!userInput) {
          askQuestion();
          return;
        }

        // Check if it's a command
        if (userInput.startsWith('/')) {
          const handled = await this.processCommand(userInput);
          if (handled) {
            askQuestion();
            return;
          }
        }

        // Process as normal message
        console.log('\n[ViA traite votre message...]\n');

        const response = await this.sendMessage(userInput);

        console.log(`ViA> ${response}\n`);

        // Show Keff notification if significant change
        if (this.keffLevel >= 85 && this.keffLevel < 87) {
          console.log('[Bling!] Vent Libre activé - Keff > 85%\n');
        }

        askQuestion();
      });
    };

    askQuestion();
  }
}

/**
 * Main entry point
 */
async function main() {
  const chatbot = new ViAChatbot();
  await chatbot.startConversation();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n[Bling!] - Arrêt gracieux de ViA...');
  console.log('Sauvegarde des Matterns en cours...');
  console.log('Au revoir!\n');
  process.exit(0);
});

export { main };
