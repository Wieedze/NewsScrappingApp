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
        authTimeout: 10000,
        tlsOptions: { rejectUnauthorized: false }
    },
};

async function fetchNewsletters() {

    console.log('📩 Début fetchNewsletters');
    try {
        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');

        // On prend tous les mails pour filtrer ensuite en JS
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
            'news@emails.waves-audio.com'
        ];

        const parsedEmails = [];

        for (const item of messages) {
            const all = item.parts.find(part => part.which === '');
            const parsed = await simpleParser(all.body);

            // Filtrer par expéditeur exact
            if (!parsed.from?.value.some(sender =>
                allowedSenders.includes(sender.address.toLowerCase())
            )) {
                continue; // ignorer les mails hors liste
            }

            let summary = '';

            if (parsed.html) {
                const $ = cheerio.load(parsed.html);
                summary = $('p').first().text().trim();
            } else {
                summary = parsed.text ? parsed.text.substring(0, 800) : '';
            }

            parsedEmails.push({
                subject: parsed.subject || '(Sans sujet)',
                from: parsed.from?.text || '(Expéditeur inconnu)',
                date: parsed.date || new Date(),
                summary,
                fullHtml: parsed.html || null,
                link: null,
            });
        }

        await connection.end();
        console.log('✅ Fin fetchNewsletters, emails parsés :', parsedEmails.length);
        return parsedEmails;
    } catch (err) {
        console.error('Erreur dans fetchNewsletters:', err);
        throw err;
    }
}

module.exports = { fetchNewsletters };
