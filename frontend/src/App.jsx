import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import './App.css';
import Navbar from './components/Navbar';
import Masonry from 'react-masonry-css';

function App() {
  const [newsletters, setNewsletters] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Ton filtre local sur les newsletters déjà chargées
  const filteredNewsletters = selectedDomain
    ? newsletters.filter(nl => {
        if (selectedDomain.startsWith('tag:')) {
          const tag = selectedDomain.replace('tag:', '');
          return nl.tags?.includes(tag);
        } else {
          const emailDomain = nl.from.split('@')[1].replace('.com', '');
          return emailDomain.includes(selectedDomain);
        }
      })
    : newsletters;

  // Ton effet initial qui fetch toutes les newsletters une fois au montage
  useEffect(() => {
    fetch('http://localhost:3000/api/newsletters')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur inconnue du serveur');
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNewsletters(sorted);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Nouvel effet qui fetch côté API avec filtre texte et domaine dès que l'un change
  useEffect(() => {
    // Pour ne pas lancer au premier rendu (quand newsletters sont vides), on peut ajouter une condition ici si voulu
    // ou on le laisse, car la 1ère fetch est sans filtre donc ça ne perturbe pas trop.

    let url = 'http://localhost:3000/api/newsletters?';
    if (selectedDomain) {
      url += `domain=${encodeURIComponent(selectedDomain)}&`;
    }
    if (searchTerm) {
      url += `q=${encodeURIComponent(searchTerm)}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur inconnue du serveur');
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNewsletters(sorted);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, [searchTerm, selectedDomain]);

  return (
    <>
      <Navbar
        onSelectDomain={setSelectedDomain}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div className="app-container">
        {newsletters.length === 0 && <p>Aucune newsletter reçue.</p>}
        {error && <p className="error-message">Erreur : {error}</p>}
        <Masonry
          breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
          className="newsletter-grid-masonry"
          columnClassName="newsletter-masonry-column"
        >
          {filteredNewsletters.map((nl, i) => (
            <div className="newsletter-card" key={i}>
              <h2 className="card-title">{nl.subject}</h2>
              {nl.fullHtml ? (
                <div
                  className="card-content"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(nl.fullHtml) }}
                />
              ) : (
                <p className="card-summary">{nl.summary}</p>
              )}
            </div>
          ))}
        </Masonry>
      </div>
    </>
  );
}

export default App;
