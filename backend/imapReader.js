const { appMdp } = require('./config.js');
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const cheerio = require('cheerio');

const config = {
    imap: {
        user: 'newslettercheckapp@gmail.com',
        password: appMdp,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 20000,
        tlsOptions: { rejectUnauthorized: false },
    },
};

// 🔍 Fonction pour détecter les mots-clés dans le HTML ou le texte
function detectKeywords(content) {
    const text = content.toLowerCase();
    const keywords = [];

    const effectWords = ['fx', 'eq', 'compressor', 'multi-band', 'delay', 'reverb', 'mix', 'mastering'];
    const instrumentWords = ['vst', 'oscillator', 'envelope', 'filter'];

    if (effectWords.some(word => text.includes(word))) {
        keywords.push('effect');
    }

    if (instrumentWords.some(word => text.includes(word))) {
        keywords.push('instrument');
    }
    console.log('📌 Tags détectés pour', ':', keywords);

    return keywords;
}

async function fetchNewsletters() {
    console.log('📩 Début fetchNewsletters');

    try {
        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');

        const searchCriteria = ['ALL'];
        const fetchOptions = { bodies: [''], markSeen: false };
        const messages = await connection.search(searchCriteria, fetchOptions);

        console.log(`🔍 ${messages.length} messages trouvés`);

        const allowedSenders = [
            'noreply@mailing.image-line.com',
            'no-reply@news.ableton.com',
            'no-reply@waves.com',
            'newsletter@news.plugin-alliance.com',
            'hello@email.pluginboutique.com',
            'news@emails.waves-audio.com',
            'izotope@hello.izotope.com',
            'newsletter@news.native-instruments.com',
            'info@news.steinberg.net',
        ];

        const parsedEmails = [];

        for (const item of messages) {
            const all = item.parts.find(part => part.which === '');
            const parsed = await simpleParser(all.body);

            const isAllowed = parsed.from?.value.some(sender =>
                allowedSenders.includes(sender.address.toLowerCase())
            );
            if (!isAllowed) continue;

            let summary = '';
            let tags = [];

            if (parsed.html) {
                const $ = cheerio.load(parsed.html);
                summary = $('p').first().text().trim();
                tags = detectKeywords($.text());
            } else if (parsed.text) {
                summary = parsed.text.substring(0, 800);
                tags = detectKeywords(parsed.text);
            }

            parsedEmails.push({
                subject: parsed.subject || '(Sans sujet)',
                from: parsed.from?.text || '(Expéditeur inconnu)',
                date: parsed.date || new Date(),
                summary,
                fullHtml: parsed.html || null,
                link: null,
                tags,
            });
        }

        await connection.end();
        console.log('✅ Fin fetchNewsletters, emails parsés :', parsedEmails.length);
        return parsedEmails;
    } catch (err) {
        console.error('❌ Erreur dans fetchNewsletters:', err);
        throw err;
    }
}

module.exports = { fetchNewsletters };
