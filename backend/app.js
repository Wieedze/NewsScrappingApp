const express = require('express');
const cors = require('cors');
const { fetchNewsletters } = require('./imapReader');

const app = express();
const port = 3000;

app.use(cors());

let cachedNewsletters = []; // 🧠 stockage temporaire en mémoire

// Au démarrage : on fetch et on stocke
(async () => {
  console.log('📩 Début fetchNewsletters');
  try {
    cachedNewsletters = await fetchNewsletters();
    console.log(`✅ Fin fetchNewsletters, emails parsés : ${cachedNewsletters.length}`);
  } catch (err) {
    console.error('❌ Erreur initiale :', err);
  }
})();

// Quand le front appelle /api/newsletters, on renvoie ce qu’on a déjà
app.get('/api/newsletters', (req, res) => {
  const query = (req.query.q || '').toLowerCase();

  if (!query) {
    // Si pas de query, on renvoie tout
    return res.json(cachedNewsletters);
  }

  // Filtrer selon sujet, résumé, ou tags
  const filtered = cachedNewsletters.filter(mail => {
    return (
      mail.subject.toLowerCase().includes(query) ||
      mail.summary.toLowerCase().includes(query) ||
      mail.tags.some(tag => tag.includes(query))
    );
  });

  res.json(filtered);
});


app.listen(port, () => {
  console.log(`✅ API serveur démarré sur http://localhost:${port}`);
});
