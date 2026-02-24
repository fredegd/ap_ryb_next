// add-service-booking-phone.js
// Usage: node scripts/add-service-booking-phone.js
// Requires: CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN in .env.local

require("dotenv").config({ path: ".env.local" });
const contentful = require("contentful-management");

const DEFAULT_PHONE = "+39 3383570358";
const PHONE_REGEX = "^\\+\\d{2}\\s\\d{10,12}$";

async function ensureBookingPhoneField(contentType, defaultLocale) {
  const existingField = contentType.fields.find(
    (field) => field.id === "bookingPhoneNr"
  );

  if (!existingField) {
    contentType.fields.push({
      id: "bookingPhoneNr",
      name: "Booking Phone Nr",
      type: "Symbol",
      required: false,
      localized: false,
      disabled: false,
      omitted: false,
      validations: [{ regexp: { pattern: PHONE_REGEX } }],
      defaultValue: { [defaultLocale]: DEFAULT_PHONE },
    });
    return { updated: true };
  }

  let updated = false;
  const validations = existingField.validations || [];
  const hasRegex = validations.some(
    (validation) => validation.regexp?.pattern === PHONE_REGEX
  );

  if (!hasRegex) {
    existingField.validations = [
      ...validations,
      { regexp: { pattern: PHONE_REGEX } },
    ];
    updated = true;
  }

  if (existingField.type !== "Symbol") {
    existingField.type = "Symbol";
    updated = true;
  }

  const currentDefault = existingField.defaultValue?.[defaultLocale];
  if (currentDefault !== DEFAULT_PHONE) {
    existingField.defaultValue = {
      ...(existingField.defaultValue || {}),
      [defaultLocale]: DEFAULT_PHONE,
    };
    updated = true;
  }

  return { updated };
}

async function run() {
  console.log("🔧 Add Booking Phone for Service content type...\n");

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID || "master";

  if (!spaceId || !token) {
    throw new Error(
      "CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN missing in .env.local"
    );
  }

  const client = contentful.createClient({ accessToken: token });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  const locales = await environment.getLocales();
  const defaultLocale =
    locales.items.find((locale) => locale.default)?.code || "en-US";

  console.log(`📦 Space: ${space.name}`);
  console.log(`🌍 Environment: ${environment.name}`);
  console.log(`🗣️  Default locale: ${defaultLocale}`);
  console.log(`📞 Default phone: ${DEFAULT_PHONE}\n`);

  const contentType = await environment.getContentType("service");
  const { updated } = await ensureBookingPhoneField(
    contentType,
    defaultLocale
  );

  if (updated) {
    const updatedContentType = await contentType.update();
    await updatedContentType.publish();
    console.log("✅ Content type updated and published.\n");
  } else {
    console.log("ℹ️  Content type already up to date.\n");
  }

  const limit = 100;
  let skip = 0;
  let total = 0;
  let updatedCount = 0;
  let publishedCount = 0;
  let skippedCount = 0;

  do {
    const entries = await environment.getEntries({
      content_type: "service",
      limit,
      skip,
    });

    if (skip === 0) {
      total = entries.total;
      console.log(`📄 Found service entries: ${total}\n`);
    }

    for (const entry of entries.items) {
      const current = entry.fields.bookingPhoneNr?.[defaultLocale];
      if (current && String(current).trim().length > 0) {
        skippedCount += 1;
        continue;
      }

      entry.fields.bookingPhoneNr = {
        ...(entry.fields.bookingPhoneNr || {}),
        [defaultLocale]: DEFAULT_PHONE,
      };

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

  console.log("\n✅ Done!");
  console.log(`📝 Updated: ${updatedCount}`);
  console.log(`🚀 Republished: ${publishedCount}`);
  console.log(`⏭️  Skipped (already set): ${skippedCount}`);
}

run().catch((error) => {
  console.error("\n❌ Error while adding booking phone:");
  console.error(error.message || error);
  process.exit(1);
});
