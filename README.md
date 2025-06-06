# 📩 NewsletterCheckApp

Une application (web/mobile) qui récupère automatiquement les newsletters de votre boîte mail et les affiche dans un fil d’actualité lisible et épuré.

## 🚀 Objectif

Permettre à n'importe qui de :

- Télécharger l'app
- Entrer son adresse email (Gmail uniquement pour l’instant)
- Visualiser automatiquement toutes ses newsletters dans un **fil déroulant**, comme un agrégateur de contenu personnel

## 🧠 Fonctionnement

1. Connexion sécurisée à la boîte mail via IMAP (Gmail)
2. Filtrage des messages provenant de newsletters spécifiques
3. Parsing des emails au format HTML
4. Affichage dans une interface React (web ou mobile avec React Native prochainement)

---

## 📦 Structure du projet

.
├── backend/ # API Node.js
│ ├── app.js # Serveur Express
│ ├── imapReader.js # Lecture et parsing des emails via IMAP
│ └── config.js # Stockage sécurisé du mot de passe d'app
└── frontend/ # Interface React
├── App.jsx # Composant principal
├── components/ # (À venir) Composants UI
└── styles/ # Styles modulaires

yaml
Copier
Modifier

---

## ⚙️ Prérequis

### 1. Un compte Gmail avec l'IMAP activé
- [Activer l'IMAP](https://mail.google.com/mail/u/0/#settings/fwdandpop)
- Générer un **mot de passe d'application** (nécessite l'authentification à deux facteurs) via :  
  [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

### 2. Node.js et npm installés

## 🔧 Installation

### 1. Cloner le repo

```bash
git clone https://github.com/ton-pseudo/NewsletterCheckApp.git
cd NewsletterCheckApp


### 2. Backend

```bash
cd backend
npm install
```

Créer un fichier `config.js` avec votre mot de passe d'application Gmail :


Lancer le serveur :

```bash
node app.js
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Accéder à l'application : [http://localhost:5173](http://localhost:5173)

## ✅ Fonctionnalités en place

- [x] Connexion à Gmail via IMAP
- [x] Récupération et parsing des emails HTML
- [x] Filtrage par expéditeurs spécifiques
- [x] Affichage dans un feed React
- [x] Support du HTML complet (webview intégrée)
- [x] Sécurité avec DOMPurify
- [ ] Interface mobile (à venir via React Native ou Expo)

## 🧱 Stack utilisée

- **Backend** : Node.js, Express, imap-simple, mailparser, cheerio
- **Frontend** : React (Vite), DOMPurify
- **IMAP** : Gmail
- **À venir** : React Native / Expo pour version mobile

## 📌 Prochaines étapes

- [ ] Interface de connexion utilisateur (adresse mail + mot de passe app)
- [ ] Version mobile (React Native)
- [ ] Stockage local (SQLite / Realm pour mobile)
- [ ] Planification automatique (fetch quotidien)
- [ ] UI/UX épurée avec tri par date / expéditeur

## 💡 Aide

Pour toute question ou idée, contacte-moi sur GitHub ou par email : **newslettercheckapp@gmail.com**

## 📜 Licence

Projet open source sous licence MIT.

