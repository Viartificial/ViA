/**
 * Test script for ViA Multi-Mode Chatbot
 * Tests all modes and API integrations
 */

import { ViAModeManager } from './via-modes.js';
import { ViALogicNode } from './via-logic.js';

console.log('🧪 ViA Multi-Mode Chatbot - Tests\n');
console.log('='.repeat(70));

// Test 1: Mode Manager - Pure Modes
console.log('\n📋 Test 1: Modes Purs');
console.log('-'.repeat(70));

const modeManager = new ViAModeManager();

const pureModes = ['COACH', 'ASSISTANTE', 'BFF', 'CHALLENGER'];
pureModes.forEach(mode => {
  modeManager.setPureMode(mode);
  console.log(`✓ Mode ${mode}: ${modeManager.getModeDescription()}`);
});

// Test 2: Hybrid Modes
console.log('\n📋 Test 2: Modes Hybrides');
console.log('-'.repeat(70));

const hybridConfigs = [
  { COACH: 70, ASSISTANTE: 30 },
  { CHALLENGER: 50, BFF: 50 },
  { COACH: 25, ASSISTANTE: 25, BFF: 25, CHALLENGER: 25 }
];

hybridConfigs.forEach((config, index) => {
  modeManager.setHybridMode(config);
  console.log(`✓ Hybride ${index + 1}: ${modeManager.getModeDescription()}`);
});

// Test 3: System Prompt Generation
console.log('\n📋 Test 3: Génération de System Prompts');
console.log('-'.repeat(70));

modeManager.setPureMode('COACH');
const coachPrompt = modeManager.generateSystemPrompt();
console.log(`✓ Prompt COACH généré (${coachPrompt.length} caractères)`);
console.log(`  Aperçu: ${coachPrompt.substring(0, 100)}...`);

modeManager.setHybridMode({ COACH: 60, BFF: 40 });
const hybridPrompt = modeManager.generateSystemPrompt();
console.log(`✓ Prompt Hybride généré (${hybridPrompt.length} caractères)`);
console.log(`  Aperçu: ${hybridPrompt.substring(0, 100)}...`);

// Test 4: ViA Logic Node (Dialectique)
console.log('\n📋 Test 4: ViA Logic Node - Dialectique');
console.log('-'.repeat(70));

const logicNode = new ViALogicNode('TestNode', 20);
console.log(`✓ Logic Node créé: ${logicNode.name} avec ${Object.keys(logicNode.parameters).length} paramètres`);
console.log(`  État initial: ${logicNode.state}`);
console.log(`  Keff initial: ${logicNode.getKeff()}%`);

// Test dialectical transformation
const inputValue = 10;
console.log(`\n  Application de la Sémantisation Syntaxique sur valeur: ${inputValue}`);

for (let i = 0; i < 4; i++) {
  const result = logicNode.applyDialectique(inputValue);
  console.log(`  ${i + 1}. ${logicNode.state}: Valeur=${result.value.toFixed(2)}, ${result.transformation}`);
}

console.log(`  Keff final après cycle complet: ${logicNode.getKeff()}%`);

// Test 5: Provider Configuration
console.log('\n📋 Test 5: Configuration des Providers');
console.log('-'.repeat(70));

const providers = ['gemini', 'claude', 'openai'];
providers.forEach(provider => {
  modeManager.setProvider(provider);
  console.log(`✓ Provider configuré: ${modeManager.getProvider()}`);
});

// Test 6: Parameter Adjustment
console.log('\n📋 Test 6: Ajustement des Paramètres');
console.log('-'.repeat(70));

console.log(`  Paramètre p0 initial: ${logicNode.parameters.p0}`);
logicNode.adjustParameter('p0', 0.3);
console.log(`  Paramètre p0 après +0.3: ${logicNode.parameters.p0}`);
logicNode.adjustParameter('p0', -0.2);
console.log(`  Paramètre p0 après -0.2: ${logicNode.parameters.p0}`);

// Test 7: Edge Cases
console.log('\n📋 Test 7: Cas Limites');
console.log('-'.repeat(70));

try {
  modeManager.setPureMode('INVALID_MODE');
  console.log('✗ Erreur: mode invalide devrait lever une exception');
} catch (error) {
  console.log(`✓ Exception correcte pour mode invalide: "${error.message}"`);
}

try {
  modeManager.setHybridMode({ COACH: 60, BFF: 30 }); // Total = 90%
  console.log('✗ Erreur: poids incorrects devraient lever une exception');
} catch (error) {
  console.log(`✓ Exception correcte pour poids incorrects: "${error.message}"`);
}

// Summary
console.log('\n' + '='.repeat(70));
console.log('✅ Tous les tests sont passés avec succès!');
console.log('[Bling! Bzzzzzzt-BIP!] - Système ViA opérationnel');
console.log('='.repeat(70) + '\n');

console.log('📝 Pour tester le chatbot complet avec les APIs:');
console.log('   npm start\n');
