// set-service-booking-link.js
// Usage: node scripts/set-service-booking-link.js
// Requires: CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN in .env.local

require('dotenv').config({ path: '.env.local' });
const contentful = require('contentful-management');

const BOOKING_LINK =
  process.env.BOOKING_LINK ?? 'https://www.instagram.com/massoterapista_paradiso/';

async function run() {
  console.log('🔧 Setze Booking Link für alle Service-Einträge...\n');

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID || 'master';

  if (!spaceId || !token) {
    throw new Error(
      'CONTENTFUL_SPACE_ID oder CONTENTFUL_MANAGEMENT_TOKEN fehlt in .env.local'
    );
  }

  const client = contentful.createClient({ accessToken: token });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  const locales = await environment.getLocales();
  const defaultLocale =
    locales.items.find((locale) => locale.default)?.code || 'en-US';

  console.log(`📦 Space: ${space.name}`);
  console.log(`🌍 Environment: ${environment.name}`);
  console.log(`🗣️  Default locale: ${defaultLocale}`);
  const shouldClear = BOOKING_LINK === '';
  const bookingLinkLabel = shouldClear ? '(empty string -> clear field)' : BOOKING_LINK;
  console.log(`🔗 Booking Link: ${bookingLinkLabel}\n`);

  const limit = 100;
  let skip = 0;
  let total = 0;
  let updatedCount = 0;
  let publishedCount = 0;
  let skippedCount = 0;

  do {
    const entries = await environment.getEntries({
      content_type: 'service',
      limit,
      skip
    });

    if (skip === 0) {
      total = entries.total;
      console.log(`📄 Gefundene Service-Einträge: ${total}\n`);
    }

    for (const entry of entries.items) {
      const current = entry.fields.bookingLink?.[defaultLocale];
      if (shouldClear) {
        if (!current || String(current).trim().length === 0) {
          skippedCount += 1;
          continue;
        }
      } else if (current === BOOKING_LINK) {
        skippedCount += 1;
        continue;
      }

      if (shouldClear) {
        if (entry.fields.bookingLink) {
          delete entry.fields.bookingLink[defaultLocale];
          if (Object.keys(entry.fields.bookingLink).length === 0) {
            delete entry.fields.bookingLink;
          }
        }
      } else {
        entry.fields.bookingLink = {
          ...(entry.fields.bookingLink || {}),
          [defaultLocale]: BOOKING_LINK
        };
      }

      const wasPublished = entry.isPublished
        ? entry.isPublished()
        : Boolean(entry.sys.publishedAt);

      const updatedEntry = await entry.update();
      updatedCount += 1;

      if (wasPublished) {
        await updatedEntry.publish();
        publishedCount += 1;
      }
    }

    skip += entries.items.length;
  } while (skip < total);

  console.log('\n✅ Fertig!');
  console.log(`📝 Aktualisiert: ${updatedCount}`);
  console.log(`🚀 Wieder veröffentlicht: ${publishedCount}`);
  console.log(`⏭️  Übersprungen (bereits gesetzt): ${skippedCount}`);
}

run().catch((error) => {
  console.error('\n❌ Fehler beim Setzen des Booking Links:');
  console.error(error.message || error);
  process.exit(1);
});
