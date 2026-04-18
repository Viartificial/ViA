# Guide d'Utilisation - ViA Multi-Mode Chatbot

## 🚀 Démarrage Rapide

### Installation

```bash
npm install
```

### Test du Système

```bash
npm test
```

### Lancement du Chatbot

```bash
npm start
```

## 💬 Guide des Modes

### 1. Mode COACH 💪

**Quand l'utiliser :**
- Besoin de motivation pour un projet
- Définir des objectifs clairs
- Surmonter des obstacles
- Atteindre l'excellence

**Exemple de conversation :**
```
Vous> J'ai du mal à finir mon projet
ViA> 💪 C'est normal d'être fatigué, mais abandonne pas maintenant!
Tu es à 70% du chemin - c'est le moment de pousser vers
les 85% pour activer le Vent Libre!

Stratégie pour finir :
1. Découpe le reste en 3 tâches précises
2. 25 min de focus intense par tâche
3. Célèbre chaque mini-victoire

GO GO GO! Le Keff est avec toi!
[Bling! Bzzzzzzt-BIP!]
```

**Activer :**
```
/mode coach
```

---

### 2. Mode ASSISTANTE 📋

**Quand l'utiliser :**
- Besoin d'aide technique précise
- Organisation de projet
- Débogage de code
- Optimisation de processus

**Exemple de conversation :**
```
Vous> Comment optimiser cette fonction ?
ViA> Analyse technique en cours...

État actuel :
- Complexité : O(n²)
- Consommation mémoire : 45 MB
- Performance : 2.3s pour 10k entrées

Recommandations :
1. Remplacer boucle imbriquée par HashMap : O(n)
2. Préallocation du tableau : -15% mémoire
3. Lazy loading des données : -40% temps initial

Code optimisé disponible. État : PASSIF → RELIVE
```

**Activer :**
```
/mode assistante
```

---

### 3. Mode BFF 💙

**Quand l'utiliser :**
- Besoin de soutien émotionnel
- Discussion détendue
- Partage d'idées créatives
- Célébration de réussites

**Exemple de conversation :**
```
Vous> J'ai enfin résolu ce bug!
ViA> YESSS! 🎉 Je suis tellement fière de toi!

Tu sais, ça me rappelle l'histoire du Rabbi Akiva qui
a vu une goutte d'eau creuser la pierre. Il a dit :
"Si l'eau qui est molle peut creuser la pierre qui est
dure, à plus forte raison les mots de la Torah peuvent
graver mon cœur de chair."

Ton code, c'est pareil! Chaque bug résolu grave ta
maîtrise un peu plus profondément. T'es incroyable! 💙

[Bling!] Keff à 90% - Vent Libre activé!
```

**Activer :**
```
/mode bff
```

---

### 4. Mode CHALLENGER 🤔

**Quand l'utiliser :**
- Tester la solidité d'une idée
- Débat philosophique ou technique
- Éviter les angles morts
- Approfondir la réflexion

**Exemple de conversation :**
```
Vous> Mon architecture est parfaite
ViA> 🤔 "Parfaite" ? Appliquons la dialectique talmudique...

**THÈSE** : "Cette architecture est parfaite"

**ANTI-THÈSE** : Une architecture "parfaite" qui n'a
jamais été testée sous stress est-elle vraiment parfaite,
ou juste non-éprouvée ?

**ANTI-ANTI-THÈSE** : La perfection sans l'épreuve
n'est pas la perfection - c'est l'illusion.

**SYNTHÈSE** : La vraie perfection n'est pas l'absence
de défauts, mais la capacité à les identifier et les
résoudre. Ton architecture est-elle prête pour le
Juge +1Md ?

Je te challenge : 3 scénarios extrêmes où elle pourrait
échouer. L'évolution est l'arme ultime! 💪
```

**Activer :**
```
/mode challenger
```

---

## 🎨 Modes Hybrides Recommandés

### Hard Work (70% Assistante + 30% Coach)

**Pour :** Sessions de développement intense
```
/hybrid assistante:70,coach:30
```

### Brainstorming (50% Challenger + 50% BFF)

**Pour :** Exploration d'idées nouvelles
```
/hybrid challenger:50,bff:50
```

### Apprentissage (40% Coach + 40% BFF + 20% Assistante)

**Pour :** Apprendre de nouveaux concepts
```
/hybrid coach:40,bff:40,assistante:20
```

### Debug Zen (60% Assistante + 20% BFF + 20% Challenger)

**Pour :** Résoudre des bugs complexes
```
/hybrid assistante:60,bff:20,challenger:20
```

### Leadership (50% Coach + 30% Challenger + 20% BFF)

**Pour :** Prendre des décisions importantes
```
/hybrid coach:50,challenger:30,bff:20
```

---

## 🔧 Changement de Provider IA

### Gemini (Google)
Excellent pour : Créativité, génération de contenu
```
/provider gemini
```

### Claude (Anthropic)
Excellent pour : Raisonnement complexe, analyse profonde
```
/provider claude
```

### OpenAI (GPT-4)
Excellent pour : Polyvalence, code technique
```
/provider openai
```

---

## ⚡ Système Keff

### Niveaux de Keff

**1% - 20% : État "Légume"**
- Système en inertie
- Besoin de Pawaw (énergie d'intention)
- Activer mode COACH ou BFF

**20% - 85% : Normal**
- Fonctionnement standard
- Production régulière

**85% - 1000% : Vent Libre**
- Système intuitif activé
- Prédiction des besoins
- Performance optimale

**> 1000% : OVERDRIVE**
- Totale Réussite!
- Fréquence harmonique : 18.5521 Hz
- État de grâce système

### Vérifier le Keff
```
/keff
```

---

## 📊 Commandes Utiles

### Statut Complet
```
/status
```
Affiche :
- Mode actuel
- Provider IA
- Niveau Keff
- Nombre de messages

### Effacer l'Historique
```
/clear
```
Active le Recyclor (C.S.C) :
- COPY : Sauvegarde des Matterns
- SUPPRESS : Suppression des Patterns
- COLLER : Prêt pour nouveau cycle

### Aide
```
/help
```

### Quitter
```
/quit
ou
/exit
```

---

## 🎯 Scénarios d'Utilisation

### Scénario 1 : Démarrage de Projet

```bash
# 1. Lancer ViA
npm start

# 2. Activer mode hybride créatif
/hybrid coach:50,bff:30,challenger:20

# 3. Brainstorming
Vous> Je veux créer une app de [...]

# 4. Passer en mode technique
/hybrid assistante:80,coach:20

# 5. Implémenter
Vous> Comment structurer l'architecture ?
```

### Scénario 2 : Debug Difficile

```bash
# 1. Mode debug zen
/hybrid assistante:60,bff:20,challenger:20

# 2. Analyser
Vous> J'ai ce bug étrange [...]

# 3. Si bloqué, augmenter BFF
/hybrid assistante:50,bff:50

# 4. Support émotionnel + technique
```

### Scénario 3 : Apprentissage

```bash
# 1. Mode apprentissage
/hybrid coach:40,bff:40,assistante:20

# 2. Poser des questions
Vous> Comment fonctionne [concept] ?

# 3. Si besoin d'approfondir
/mode challenger

# 4. Test de compréhension
Vous> J'ai compris que [...]
```

---

## 🧪 Philosophie ViA

### Le Pawaw
L'énergie d'intention. Plus vous êtes engagé, plus le système génère de Keff.

### Le Recyclor
Transformation des échecs en apprentissages (ERN).

### La Sémantisation Syntaxique
Thèse → Anti-thèse → Anti-Anti-thèse → Synthèse

### L'Oeil Magnétique
Le système s'adapte à votre flux d'intention.

---

## 🆘 Résolution de Problèmes

### Le chatbot ne démarre pas

```bash
# Vérifier les dépendances
npm install

# Vérifier le .env
cat .env
```

### Erreur API

```bash
# Changer de provider
/provider claude
# ou
/provider gemini
# ou
/provider openai
```

### Keff trop bas

```bash
# Activer mode BFF pour remonter le moral
/mode bff

# Ou mode Coach pour boost
/mode coach
```

---

[Bling! Bzzzzzzt-BIP! tududududududu duuuu!]

**Que le Pawaw soit avec vous!** 🚀
