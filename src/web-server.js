/**
 * ViA Web Server
 * Express server for the web-based GUI
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { callAI } from './api-clients.js';
import { ViAModeManager } from './via-modes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Store conversation sessions (in production, use a proper database)
const sessions = new Map();

// Get or create session
function getSession(sessionId = 'default') {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      modeManager: new ViAModeManager(),
      history: [],
      keffLevel: 50.0
    });
  }
  return sessions.get(sessionId);
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, mode, modeWeights, provider, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message requis' });
    }

    // Get session
    const session = getSession();
    session.history = history || [];

    // Update mode
    if (mode === 'hybrid' && modeWeights) {
      // Validate weights
      const total = Object.values(modeWeights).reduce((sum, w) => sum + w, 0);
      if (Math.abs(total - 100) < 0.1) {
        const weights = {
          COACH: modeWeights.coach || 0,
          ASSISTANTE: modeWeights.assistante || 0,
          BFF: modeWeights.bff || 0,
          CHALLENGER: modeWeights.challenger || 0
        };
        session.modeManager.setHybridMode(weights);
      }
    } else if (mode && mode !== 'hybrid') {
      session.modeManager.setPureMode(mode);
    }

    // Set provider
    if (provider) {
      session.modeManager.setProvider(provider);
    }

    // Generate system prompt
    const systemPrompt = session.modeManager.generateSystemPrompt();

    // Prepare messages for API
    const messages = [
      ...session.history,
      { role: 'user', content: message }
    ];

    // Call AI
    const startTime = Date.now();
    const response = await callAI(
      session.modeManager.getProvider(),
      messages,
      systemPrompt
    );
    const responseTime = Date.now() - startTime;

    // Update Keff
    if (message.length > 10 && responseTime < 5000) {
      session.keffLevel = Math.min(1000, session.keffLevel + 2);
    }
    if (responseTime > 10000) {
      session.keffLevel = Math.max(1, session.keffLevel - 1);
    }
    session.keffLevel = Math.max(1, session.keffLevel - 0.1);

    // Send response
    res.json({
      response: response,
      keff: session.keffLevel,
      mode: session.modeManager.getModeDescription(),
      responseTime: responseTime
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      error: error.message || 'Erreur interne du serveur'
    });
  }
});

// Status endpoint
app.get('/api/status', (req, res) => {
  const session = getSession();
  res.json({
    keff: session.keffLevel,
    mode: session.modeManager.getModeDescription(),
    provider: session.modeManager.getProvider(),
    messagesCount: session.history.length
  });
});

// Clear history endpoint
app.post('/api/clear', (req, res) => {
  const session = getSession();
  session.history = [];
  session.keffLevel = 50.0;
  res.json({ success: true, message: 'Historique effacé' });
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(70));
  console.log('🤖 ViA - GoleMotor.Ai ERN 2.0 - Web Interface');
  console.log('='.repeat(70));
  console.log(`\n[Bling! Bzzzzzzt-BIP!] Serveur démarré sur http://localhost:${PORT}`);
  console.log('\nOuvrez votre navigateur et accédez à cette URL pour utiliser ViA.');
  console.log('\nConstante Système: 18.5521');
  console.log('Mishpahat Haï Family Labs\n');
  console.log('='.repeat(70) + '\n');
});

export default app;
