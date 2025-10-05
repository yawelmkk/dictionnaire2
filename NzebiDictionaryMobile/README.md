# Dictionnaire Inzèbi Mobile

Application mobile React Native/Expo pour le dictionnaire Inzèbi-Français.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- EAS CLI (`npm install -g eas-cli`)

### Installation
```bash
cd NzebiDictionaryMobile
npm install
```

### Développement
```bash
npm run dev
# ou
expo start
```

## 📱 Build et Déploiement

### Configuration EAS Build

1. **Connexion à Expo**
```bash
eas login
```

2. **Configuration du projet**
```bash
eas build:configure
```

3. **Build de développement**
```bash
# Android APK
eas build --platform android --profile development

# iOS (nécessite un compte développeur Apple)
eas build --platform ios --profile development
```

4. **Build de production**
```bash
# Android AAB pour Google Play
eas build --platform android --profile production

# iOS pour App Store
eas build --platform ios --profile production
```

### Soumission aux stores

1. **Google Play Store**
```bash
eas submit --platform android
```

2. **Apple App Store**
```bash
eas submit --platform ios
```

## 🔧 Configuration

### Variables d'environnement
Copiez `.env.example` vers `.env` et configurez :
- `EXPO_PROJECT_ID` : ID du projet Expo
- `APPLE_ID` : Apple ID pour iOS
- `APPLE_TEAM_ID` : Team ID Apple
- `GOOGLE_SERVICE_ACCOUNT_KEY_PATH` : Clé de service Google Play

### Métadonnées importantes
- **Bundle ID iOS** : `com.languenzebiofficiel.nzebi-dictionary`
- **Package Android** : `com.languenzebiofficiel.nzebi_dictionary`
- **Scheme** : `nzebi-dictionary`

## 📋 Scripts disponibles

- `npm run dev` : Démarre le serveur de développement
- `npm start` : Démarre Expo
- `npm run android` : Lance sur Android
- `npm run ios` : Lance sur iOS
- `npm run web` : Lance sur le web

## 🏗️ Architecture

- **Framework** : React Native avec Expo
- **Styling** : NativeWind (Tailwind CSS)
- **Base de données** : SQLite (expo-sqlite)
- **Stockage** : AsyncStorage
- **Audio** : expo-speech pour la synthèse vocale

## 📦 Fonctionnalités

- ✅ Recherche intelligente avec tolérance aux fautes
- ✅ Favoris et historique
- ✅ Mode sombre/clair
- ✅ Synthèse vocale
- ✅ Interface multilingue (français)
- ✅ Stockage local hors ligne
- ✅ Design adaptatif

## 🎨 Design

L'application utilise un design inspiré de l'art traditionnel africain avec :
- Couleurs principales : Ambre (#f59e0b) et Brun (#8B7355)
- Typographie claire et lisible
- Animations fluides
- Interface intuitive

## 📄 Licence

Ce projet est développé pour la préservation du patrimoine linguistique Inzèbi.

## 📞 Contact

**Langue Nzèbi Officiel**
- Email : languenzebiofficiel@gmail.com