import imaps from 'imap-simple';
import { appMdp } from './config.js';

const config = {
  imap: {
    user: 'newslettercheckapp@gmail.com',
    password: appMdp,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 20000,
    tlsOptions: { rejectUnauthorized: false }
  }
};

imaps.connect(config)
  .then(connection => {
    console.log('✅ Connexion IMAP réussie');
    return connection.end();
  })
  .catch(err => {
    console.error('❌ Erreur de connexion IMAP :', err);
  });
