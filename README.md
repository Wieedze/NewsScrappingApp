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

---

## 🔧 Installation

### 1. Cloner le repo

```bash
git clone https://github.com/ton-pseudo/NewsletterCheckApp.git
cd NewsletterCheckApp
2. Backend
bash
Copier
Modifier
cd backend
npm install
Crée un fichier config.js :

js
Copier
Modifier
// config.js
module.exports = {
  appMdp: 'TON_MOT_DE_PASSE_APP_GMAIL'
};
Lancer le serveur :

bash
Copier
Modifier
node app.js
3. Frontend
bash
Copier
Modifier
cd frontend
npm install
npm run dev
Accéder à http://localhost:5173

✅ Fonctionnalités en place
 Connexion à Gmail via IMAP

 Récupération et parsing des emails HTML

 Filtrage par expéditeurs spécifiques

 Affichage dans un feed React

 Support du HTML complet (webview intégrée)

 Sécurité avec DOMPurify

 Interface mobile (à venir via React Native ou Expo)

✨ Exemples d’expéditeurs pris en charge
no-reply@news.ableton.com

noreply@mailing.image-line.com

newsletter@news.plugin-alliance.com

hello@email.pluginboutique.com

no-reply@waves.com

(personnalisable dans le backend)

🧱 Stack utilisée
Backend : Node.js, Express, imap-simple, mailparser, cheerio

Frontend : React (Vite), DOMPurify

IMAP : Gmail

À venir : React Native / Expo pour version mobile

📌 Prochaines étapes
 Interface de connexion utilisateur (adresse mail + mot de passe app)

 Version mobile (React Native)

 Stockage local (SQLite / Realm pour mobile)

 Planification automatique (fetch quotidien)

 UI/UX épurée avec tri par date / expéditeur

💡 Aide
Pour toute question, contacte-moi sur GitHub ou par email : newslettercheckapp@gmail.com

📜 Licence
Projet open source sous licence MIT.