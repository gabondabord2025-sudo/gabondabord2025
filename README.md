# Site de Pétition "Gabon d'abord !"

## URL du site déployé
**https://gabondabord2025.vercel.app/**

## Description
Site web professionnel de pétition pour le boycott des marchandises béninoises et camerounaises, créé pour défendre la dignité du Gabon.

## ✅ Fonctionnalités implémentées
- ✅ **Texte de la pétition**
- ✅ **Base de données Supabase** avec table des signatures
- ✅ **Entête avec fond blanc+logo baniere "GABONDABORD"** 
- ✅ **Toutes les 4 images** d'identité graphique intégrées libre de droits sous réserve d'une utilisation propre à défendre les intérêts de son Pays Bénie , de sa Nation Majestueuse qu'est notre SEUL & UNIQUE GABON. Toute utilisations contraire à cette règle n'engage que son ou ses utilisateurs et ceux qu'ils en feront .
- ✅ **Interface responsive** 
- ✅ **Formulaire de signature sécurisé** 
- ✅ **Compteur de signatures en temps réel** 
- ✅ **Liste des signataires avec commentaires et option d'anonimisation** 
- ✅ **Boutons de partage social avec hashtags** 


## 🎨 Design
- **Couleurs**: Vert foncé (#1B5E20) et doré (#FFD700)
- **Logo**: Masque traditionnel gabonais avec balances de justice 
- **Entête**: Fond blanc comme demandé
- **Images**: Toutes les 4 images d'identité graphique intégrées harmonieusement

## 🔧 Technologies utilisées
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS
- **Backend**: Supabase (base de données, authentification)
- **Déploiement**: Vercel

## 📦 Structure du projet
```
src/
├── components/          # Composants React
│   ├── Logo.tsx        # Composant logo avec toutes les variantes
│   ├── SignatureForm.tsx
│   ├── SignatureCounter.tsx
│   ├── SignatureList.tsx
│   └── SocialShare.tsx
├── data/               # Données de la pétition
│   └── petitionContent.ts  # Texte EXACT original
├── hooks/              # Hooks personnalisés
│   └── useSignatures.ts
├── lib/                # Utilitaires
│   └── supabase.ts     # Configuration Supabase
└── App.tsx            # Composant principal

public/images/          # Assets graphiques
├── Image_3.png         # Logo principal
├── Image_15.png        # Logo avec sous-titre
├── Image_3.jpeg        # Version couverture
└── Image_5.jpeg        # Interface complète
```


## 📞 Support
- **Username GitHub**: `gabondabord2025-sudo`
- **Repository**: `gabondabord2025`
- **Hashtags**: #GabonDabord #BoycottIngratitude #DigniteGabonaise
- **Email de signalement**: gabondabord2025@gmail.com
---

**Développé par MiniMax Agent - Toutes les corrections ont été appliquées conformément aux exigences.**
