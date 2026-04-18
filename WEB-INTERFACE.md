# ViA Multi-Mode Chatbot - Interface Web

🌟 **Design Noir & Or Pur Miroitant** - Interface graphique web pour le chatbot ViA

## 🎨 Nouvelle Interface Web

### Démarrage de l'Interface Web

```bash
# Installer les dépendances
npm install

# Lancer le serveur web
npm run web
```

Puis ouvrez votre navigateur à l'adresse : **http://localhost:3000**

### Design Noir & Or Miroitant

L'interface web présente un design luxueux et futuriste avec :

- **Fond noir profond** avec effets de miroir animés
- **Accents dorés** (or pur #FFD700) avec dégradés lumineux
- **Effets de verre** (glass morphism) pour un rendu premium
- **Animations fluides** et transitions élégantes
- **Indicateur Keff** dynamique avec barre de progression dorée
- **Messages avec design différencié** :
  - Messages utilisateur : Fond doré avec texte noir
  - Messages ViA : Fond transparent avec bordure dorée

### Fonctionnalités de l'Interface

#### 1. **Interface de Chat**
- Messages en temps réel
- Animation de frappe (typing indicator)
- Scroll automatique
- Indicateur temporel pour chaque message

#### 2. **Sélection de Modes Rapide**
- Boutons visuels pour chaque mode (emojis)
  - ⚡ Hybride
  - 💪 COACH
  - 📋 ASSISTANTE
  - 💙 BFF
  - 🤔 CHALLENGER
- Indication visuelle du mode actif

#### 3. **Panneau de Paramètres**
- **Provider IA** : Sélection entre Gemini, Claude, OpenAI
- **Mode Hybride Personnalisé** : Sliders pour ajuster les pourcentages
  - COACH : 0-100%
  - ASSISTANTE : 0-100%
  - BFF : 0-100%
  - CHALLENGER : 0-100%
  - Total automatique affiché
- **Effacer l'historique** : Active le Recyclor (C.S.C)

#### 4. **Indicateurs Visuels**
- **Barre Keff** :
  - Or foncé (< 85%)
  - Or brillant (85-1000%)
  - Or-blanc éclatant (> 1000% - OVERDRIVE)
- **Mode actuel** : Affichage en temps réel
- **Système** : Constante 18.5521 visible

### Effets Visuels Spéciaux

1. **Animation de fond miroitant**
   - Gradient radial doré
   - Motif diagonal animé
   - Rotation et translation continues

2. **Effet de pulsation sur le logo**
   - Glow doré pulsant
   - Synchronisé avec le Keff

3. **Transitions fluides**
   - Apparition des messages en fade-in
   - Hover effects sur les boutons
   - Scale et glow au survol

4. **Glass Morphism**
   - Bordures dorées semi-transparentes
   - Effet de flou backdrop
   - Superposition de gradients

### Architecture Technique

```
ViA/
├── public/
│   ├── index.html        # Interface HTML
│   ├── style.css         # Design noir & or
│   └── script.js         # Logique frontend
├── src/
│   ├── web-server.js     # Serveur Express
│   ├── api-clients.js    # APIs (Gemini, Claude, OpenAI)
│   ├── via-modes.js      # Gestion des modes
│   └── via-logic.js      # Logique ViA
└── package.json          # Configuration
```

### API Endpoints

- **POST /api/chat** - Envoyer un message
  ```json
  {
    "message": "Votre message",
    "mode": "coach",
    "modeWeights": { "coach": 100, ... },
    "provider": "claude",
    "history": [...]
  }
  ```

- **GET /api/status** - Statut du système
  ```json
  {
    "keff": 75.5,
    "mode": "COACH (100%)",
    "provider": "claude",
    "messagesCount": 10
  }
  ```

- **POST /api/clear** - Effacer l'historique

### Responsive Design

L'interface s'adapte automatiquement :
- **Desktop** : Layout complet avec tous les éléments
- **Tablet** : Adaptation des colonnes
- **Mobile** : Vue simplifiée optimisée

### Raccourcis Clavier

- **Enter** : Envoyer le message
- **Shift+Enter** : Nouvelle ligne
- **Auto-resize** : Le textarea s'adapte au contenu (max 150px)

## 🚀 Utilisation

### Mode CLI (Original)
```bash
npm start
```

### Mode Web (Nouveau)
```bash
npm run web
```

L'interface web conserve toutes les fonctionnalités du CLI avec une expérience visuelle premium noir & or miroitant.

---

**[Bling! Bzzzzzzt-BIP!]** - Interface Web ViA activée avec design noir & or pur miroitant! 🌟
