// export-contentful.js
require('dotenv').config({ path: '.env.local' });
const contentfulExport = require('contentful-export');

const options = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    environmentId: 'master',
    exportDir: './contentful-backup',
    contentFile: 'content-models.json',

    // Optionen
    saveFile: true,
    contentModelOnly: true, // Nur Models, kein Content
    skipRoles: true,
    skipWebhooks: true,

    // Oder alles exportieren:
    // contentModelOnly: false,
    // includeArchived: false,
    // includeDrafts: false
};

console.log('📦 Starte Contentful Export...');

contentfulExport(options)
    .then((result) => {
        console.log('✅ Export erfolgreich!');
        console.log('📁 Gespeichert in:', options.exportDir);
        console.log('📊 Content Types:', result.contentTypes?.length || 0);
        console.log('📝 Entries:', result.entries?.length || 0);
        console.log('🖼️  Assets:', result.assets?.length || 0);
    })
    .catch((err) => {
        console.error('❌ Export fehlgeschlagen:', err);
    });