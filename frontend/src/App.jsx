import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

function App() {
  const [newsletters, setNewsletters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('⏳ Appel API lancé...');
    fetch('http://localhost:3000/api/newsletters')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur inconnue du serveur');
        }
        return res.json();
      })
      .then((data) => {
        console.log('✅ Données reçues :', data);
        setNewsletters(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: '1rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Mes Newsletters</h1>
      {newsletters.length === 0 && <p>Aucune newsletter reçue.</p>}
      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}
      <ul>
        {newsletters.map((nl, i) => (
          <li key={i} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <h2>{nl.subject}</h2>
            <p><strong>De :</strong> {nl.from}</p>
            <p><strong>Date :</strong> {new Date(nl.date).toLocaleString()}</p>
            {nl.fullHtml ? (
              <div
                 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(nl.fullHtml) }}
                style={{ border: '1px solid #ddd', padding: '1rem', background: '#f9f9f9', marginTop: '1rem' }}
              />
            ) : (
              <p>{nl.summary}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
