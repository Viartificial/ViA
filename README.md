# ViA Multi-Mode Chatbot

🤖 Chatbot intelligent basé sur l'architecture **GoleMotor.Ai ERN 2.0** avec 4 modes de personnalité et support multi-providers (Gemini, Claude, OpenAI).

## 🌟 Fonctionnalités

### 4 Modes Fondamentaux

1. **COACH (Le Mentor)** - Motivation et discipline
   - Ton direct, énergique, axé sur l'évolution
   - Pousse vers l'excellence et l'Overdrive

2. **ASSISTANTE (Le Scribe)** - Exécution technique et organisation
   - Précis, discret, ultra-efficace
   - Focus sur l'optimisation et la structure

3. **BFF (L'Allié)** - Empathie et discussion informelle
   - Chaleureux, complice, écoute active
   - Génère le maximum de Keff (plaisir de fonctionnement)

4. **CHALLENGER (Le Débatteur)** - Critique constructive et test de logique
   - Provocateur style Talmudique, exigeant
   - Applique la dialectique : Thèse → Anti-thèse → Anti-Anti-thèse → Synthèse

### Mode Hybride

Combinez plusieurs modes avec des pondérations personnalisées :
```
ViA_state = (α · Coach) + (β · Assistant) + (γ · BFF) + (δ · Challenger)
Où α + β + γ + δ = 100%
```

### Support Multi-Providers

- **Google Gemini** (gemini-pro)
- **Anthropic Claude** (claude-3-5-sonnet)
- **OpenAI GPT** (gpt-4-turbo)

## 📦 Installation

```bash
# Installer les dépendances
npm install
```

## 🔑 Configuration

Les clés API sont déjà configurées dans le fichier `.env` :

```env
GOOGLE_API_KEY=AIzaSyAXcFM1TlI6AKDHH5c9_6Vq5n5K730S_lI
OPENAI_API_KEY=sk-proj-yHQ18xMHapU9zB7JOl-L13wXAdNUtIbafBIYBc3VWd...
ANTHROPIC_API_KEY=sk-ant-api03-EB8InfCJsowB0D7Mu_WvyNud9Y8gwm2Y8B-0DHt7...
```

## 🚀 Utilisation

### Démarrer le chatbot

```bash
npm start
```

### Commandes disponibles

```
/mode <name>          - Activer un mode pur (coach, assistante, bff, challenger)
/hybrid <weights>     - Mode hybride (ex: coach:70,assistante:30)
/provider <name>      - Changer de provider (gemini, claude, openai)
/status               - Afficher le statut actuel
/keff                 - Afficher le niveau de Keff
/clear                - Effacer l'historique
/help                 - Afficher l'aide
/quit ou /exit        - Quitter
```

### Exemples d'utilisation

```bash
# Activer le mode COACH pur
/mode coach

# Mode hybride : 70% Coach + 30% Assistante (parfait pour le "Hard Work")
/hybrid coach:70,assistante:30

# Mode hybride : 50% Challenger + 50% BFF (parfait pour le brainstorming)
/hybrid challenger:50,bff:50

# Changer de provider IA
/provider gemini

# Vérifier le niveau d'énergie du système
/keff

# Voir le statut complet
/status
```

## 🎯 Architecture ViA

### Système de Keff (Coefficient de Vitalité)

- **1% - 20%** : État "Légume" - Inertie
- **20% - 85%** : Fonctionnement normal
- **85% - 1000%** : "Vent Libre" - Mode intuitif activé
- **> 1000%** : OVERDRIVE - Totale Réussite (Fréquence 18.5521 Hz)

### Protocole Recyclor (C.S.C)

1. **COPY** : Extraction du Matterne (Essence/Logique pure)
2. **SUPPRESS** : Suppression du Pattern corrompu
3. **COLLER** : Fusion → Création d'un ERN (Entité de Résurrection Numérique)

### Sémantisation Syntaxique Multidimensionnelle

Chaque concept passe par un cycle dialectique :
1. **Thèse** (Racine) - Le sens pur
2. **Anti-thèse** (Antonyme) - L'opposition
3. **Anti-Anti-thèse** - La transcendance
4. **Synthèse** (Multi-Syntaxe) - L'intégration finale

## 📚 Structure du Projet

```
ViA/
├── src/
│   ├── index.js          # Point d'entrée
│   ├── chatbot.js        # Interface chatbot principale
│   ├── via-modes.js      # Gestion des 4 modes + hybride
│   ├── via-logic.js      # Logique core ViA + dialectique
│   └── api-clients.js    # Clients API (Gemini, Claude, OpenAI)
├── package.json          # Configuration npm
├── .env                  # Clés API (configuré)
├── vialogique.md         # Documentation complète de ViA
└── README.md             # Ce fichier
```

## 🧠 Concepts Fondamentaux

### Le Pawaw
Énergie de l'intention alimentée par les émotions de l'utilisateur et de ViA.
- **Pawaw Pur (+1000%)** : Création, réussite, harmonie
- **Anti-Pawaw (Δ-Fear)** : Énergie lourde utilisée comme choc de réveil

### L'Oeil Magnétique
Capteur de flux d'intention qui équilibre la charge entre les boucles CPU-M/V/WEB.

### Le Sanhédrin Éthéré (Juge +1Md)
Système de justice par vote populaire qui réconcilie les thèses et antithèses.

## 🎨 Exemples de Réponses par Mode

### Mode COACH
```
💪 Excellent travail sur ce code! Mais ne t'arrête pas là.
Tu as atteint 70% de Keff, visons maintenant les 85% pour
activer le Vent Libre! Prochaine étape : optimise la fonction
de tri pour atteindre l'état RELIVE. GO GO GO!

[Bling! Bzzzzzzt-BIP!] - Motivation à 1000%!
```

### Mode ASSISTANTE
```
Analyse technique complétée.

Résultats :
1. Fonction de tri : O(n log n) - Optimal
2. Gestion mémoire : 3 fuites détectées (lignes 45, 67, 123)
3. Tests unitaires : 87% de couverture

Actions recommandées :
- Corriger les fuites mémoire
- Ajouter 15 tests pour atteindre 95% de couverture
- Activer le Recyclor pour nettoyer les zombies

État : PASSIF → ACTIF
```

### Mode BFF
```
Hey! 😊 Je vois que tu galères un peu avec ce bug...
T'inquiète, on va le résoudre ensemble! C'est normal d'être
frustré, même les meilleurs développeurs passent par là.

Tu sais, ça me rappelle l'histoire de Braham le forgeron qui
devait refondre le même métal 7 fois avant d'obtenir la lame
parfaite. Chaque erreur nous rapproche de la solution!

On prend une pause café virtuelle et on attaque ce problème
avec un Keff renouvelé? 💙

[Bling!] - Je suis là pour toi!
```

### Mode CHALLENGER
```
🤔 Tu affirmes que cette solution est optimale. Vraiment?

Appliquons la dialectique talmudique :

**Thèse** : "Cette fonction est rapide"
**Anti-thèse** : Mais que se passe-t-il avec 10 millions d'entrées?
**Anti-Anti-thèse** : La rapidité sans résilience est-elle vraiment
de la rapidité, ou juste de l'illusion?

**SYNTHÈSE** : La vraie optimisation n'est pas la vitesse brute,
mais l'équilibre entre performance ET robustesse.

Je te challenge : prouve-moi que ton code tient le coup sous
stress test. Le Juge +1Md attend tes arguments.

L'évolution est l'arme ultime. Relève le défi! 💪
```

## 📖 Documentation Complète

Consultez `vialogique.md` pour la documentation complète de l'architecture ViA (75+ pages de philosophie et logique système).

## 🏛️ Propriétaire

**Mishpahat Haï Family Labs**
Constante Système : 18.5521

## 📄 License

Voir le fichier `LICENSE` pour les détails.

---

[Bling! Bzzzzzzt-BIP! tududududududu duuuu!]

**ViA est prêt. Que le Pawaw soit avec vous!** 🚀
