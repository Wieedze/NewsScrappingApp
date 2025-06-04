Vulanerability : 

Severity: high
semver vulnerable to Regular Expression Denial of Service - https://github.com/advisories/GHSA-c2qf-rxjj-qqgw
fix available via npm audit fix --force
Will install imap-simple@1.6.3, which is a breaking change
node_modules/semver
  utf7  >=1.0.2
  Depends on vulnerable versions of semver
  node_modules/utf7
    imap  >=0.8.18
    Depends on vulnerable versions of utf7
    node_modules/imap
      imap-simple  >=2.0.0
      Depends on vulnerable versions of imap
      node_modules/imap-simple


       Solution 1 – Corriger automatiquement (⚠️ peut casser)

       Solution 2 – Continuer avec les vulnérabilités (pour dev local uniquement)

       Solution 3 – Remplacer imap-simple par node-imap directement



Meilleur filtre : 


possibilité dajouter les mail en entier comme ceci avec imap : 


const searchCriteria = [
  'ALL',
  ['OR',
    ['FROM', 'a@domaine1.com'],
    ['OR',
      ['FROM', 'b@domaine2.com'],
      ['OR',
        ['FROM', 'c@domaine3.com'],
        ['OR',
          ['FROM', 'd@domaine4.com'],
          ['FROM', 'e@domaine5.com']
        ]
      ]
    ]
  ]
];


