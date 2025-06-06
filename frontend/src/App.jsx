import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import './App.css';

function App() {
  const [newsletters, setNewsletters] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <>
      <nav className="navbar">
        <h1>NewsletterFeed</h1>
      </nav>

      <div className="app-container">
        {newsletters.length === 0 && <p>Aucune newsletter reçue.</p>}
        {error && <p className="error-message">Erreur : {error}</p>}
        <div className="newsletter-grid">
          {newsletters.map((nl, i) => (
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
        </div>
      </div>
    </>
  );
}

export default App;
