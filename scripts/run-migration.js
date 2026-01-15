// run-migration.js - Erweiterte Debug Version
require('dotenv').config({ path: '.env.local' });
const path = require('path');
const { runMigration } = require('contentful-migration');

// DEBUG: Token prüfen
console.log('🔍 Debug Info:');
console.log('Space ID:', process.env.CONTENTFUL_SPACE_ID);
console.log('Token prefix:', process.env.CONTENTFUL_MANAGEMENT_TOKEN?.substring(0, 6));
console.log('Token defined:', !!process.env.CONTENTFUL_MANAGEMENT_TOKEN);

if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN?.startsWith('CFPAT-')) {
    console.error('❌ Falscher Token! Management Token muss mit CFPAT- beginnen');
    console.log('👉 Gehe zu: Settings → API keys → Content management tokens');
    process.exit(1);
}

const options = {
    filePath: path.resolve(__dirname, 'contentful-migration.js'),
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    environmentId: 'master',
    yes: true
};

console.log('\n🚀 Starte Contentful Migration...');
console.log(`📦 Space ID: ${options.spaceId}`);
console.log(`🌍 Environment: ${options.environmentId}\n`);

runMigration(options)
    .then(() => {
        console.log('\n✅ Migration erfolgreich abgeschlossen!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Migration fehlgeschlagen:');
        console.error(error.message);
        process.exit(1);
    });