// test-contentful-access.js
// Testet ob Token und Space korrekt sind
require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful-management');

async function testAccess() {
  console.log('🧪 Teste Contentful Access...\n');
  
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  
  console.log('📋 Credentials:');
  console.log('  Space ID:', spaceId);
  console.log('  Token:', token ? `${token.substring(0, 10)}...` : 'NICHT GESETZT');
  console.log('');

  try {
    // Client erstellen
    const client = contentful.createClient({
      accessToken: token
    });
    
    console.log('✅ Client erstellt');
    
    // Alle Spaces auflisten (die du Zugriff hast)
    console.log('\n📦 Deine verfügbaren Spaces:');
    const spaces = await client.getSpaces();
    
    if (spaces.items.length === 0) {
      console.log('  ⚠️  Keine Spaces gefunden!');
      console.log('  👉 Überprüfe ob dein Token die richtigen Permissions hat');
      return;
    }
    
    spaces.items.forEach((space, index) => {
      console.log(`\n  ${index + 1}. ${space.name}`);
      console.log(`     ID: ${space.sys.id}`);
      console.log(`     Match: ${space.sys.id === spaceId ? '✅ DAS IST DEIN SPACE!' : '❌'}`);
    });
    
    // Versuche den spezifischen Space zu holen
    console.log(`\n\n🎯 Versuche Space "${spaceId}" zu laden...`);
    const space = await client.getSpace(spaceId);
    console.log(`✅ Space gefunden: "${space.name}"`);
    
    // Environment laden
    console.log('\n🌍 Lade Environment "master"...');
    const environment = await space.getEnvironment('master');
    console.log(`✅ Environment gefunden: "${environment.name}"`);
    
    // Content Types auflisten
    console.log('\n📝 Bestehende Content Types:');
    const contentTypes = await environment.getContentTypes();
    
    if (contentTypes.items.length === 0) {
      console.log('  Keine Content Types vorhanden (Space ist leer)');
    } else {
      contentTypes.items.forEach(ct => {
        console.log(`  - ${ct.name} (${ct.sys.id})`);
      });
    }
    
    console.log('\n\n✅ ALLES FUNKTIONIERT! Migration sollte klappen.');
    console.log('👉 Führe jetzt aus: bun run run-migration.js');
    
  } catch (error) {
    console.error('\n❌ FEHLER:');
    console.error('  Message:', error.message);
    
    if (error.message.includes('does not exist or you do not have access')) {
      console.log('\n🔧 LÖSUNGEN:');
      console.log('  1. Stelle sicher, dass du OWNER oder ADMIN des Spaces bist');
      console.log('  2. Gehe zu Contentful → Settings → Members');
      console.log('  3. Prüfe ob dein Account die richtigen Rollen hat');
      console.log('  4. Erstelle einen NEUEN Personal Access Token:');
      console.log('     - Settings → API keys → Content management tokens');
      console.log('     - Generate personal token');
      console.log('     - Ersetze den Token in .env.local');
    }
    
    if (error.message.includes('Unauthorized')) {
      console.log('\n🔧 Token ist ungültig oder abgelaufen');
      console.log('  👉 Erstelle einen neuen Personal Access Token');
    }
    
    console.error('\n  Stack:', error.stack);
  }
}

testAccess();
