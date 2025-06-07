import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar({ onSelectDomain, searchTerm, onSearchChange }) {
  const [open, setOpen] = useState(false);

  const domainOrder = [
    'news.ableton.com',
    'mailing.image-line.com',
    'hello.izotope.com',
    'news.native-instruments.com',
    'news.plugin-alliance.com',
    'email.pluginboutique.com',
    'news.steinberg.net',
    'waves.com',
    'emails.waves-audio.com',
  ];

  const options = [
    { name: 'All', domain: '' },
    { name: 'Ableton', domain: 'news.ableton.com' },
    { name: 'Plugin Alliance', domain: 'news.plugin-alliance.com' },
    { name: 'Plugin Boutique', domain: 'email.pluginboutique.com' },
    { name: 'Image-line', domain: 'mailing.image-line.com' },
    { name: 'Izotope', domain: 'hello.izotope.com' },
    { name: 'Native-instruments', domain: 'news.native-instruments.com' },
    { name: 'Steinberg', domain: 'news.steinberg.net' },
    { name: 'Waves', domain: 'waves.com' },
  ];

  const sortedOptions = [...options].sort(
    (a, b) => domainOrder.indexOf(a.domain) - domainOrder.indexOf(b.domain)
  );

  const cleanDomainForHref = (domain) => {
    return domain
      .replace(/^(news\.|mailing\.|email\.|emails\.|hello\.)/, '')
      .replace(/\.(com|net|org|io|fr)$/, '');
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="#constructor" className="nav-link" onClick={toggleMenu}>
            Constructor
          </a>
          <a
            href="#effect"
            className="nav-link"
            onClick={() => onSelectDomain('tag:effect')}
          >
            Effect
          </a>
          <a
            href="#instrument"
            className="nav-link"
            onClick={() => onSelectDomain('tag:instrument')}
          >
            Instrument
          </a>
        </div>
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="navbar-right">
          <input
            type="search"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </nav>

      {open && (
        <div className="dropdown-menu">
          {sortedOptions.map((opt, i) => {
            const cleanDomain = cleanDomainForHref(opt.domain);
            return (
              <a
                key={i}
                href={`#${cleanDomain}`}
                className="dropdown-item"
                onClick={() => {
                  setOpen(false);
                  onSelectDomain(cleanDomain);
                }}
              >
                {opt.name}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}