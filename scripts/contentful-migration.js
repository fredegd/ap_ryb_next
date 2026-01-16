// contentful-migration.js
// Installiere zuerst: npm install contentful-migration dotenv

const runMigration = require('contentful-migration/built/bin/cli').runMigration;
const path = require('path');

// Migration Script
module.exports = function (migration) {
  // 1. AUTHOR Content Type
  const author = migration.createContentType('author')
    .name('Author')
    .displayField('name')
    .description('Autori degli articoli del blog');

  author.createField('name')
    .name('Name')
    .type('Symbol')
    .required(true);

  author.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  author.createField('profileImage')
    .name('Profile Image')
    .type('Link')
    .linkType('Asset');

  author.createField('jobTitle')
    .name('Titel/Position')
    .type('Symbol');

  author.createField('slogan')
    .name('Slogan')
    .type('Symbol');

  author.createField('bio')
    .name('Biography')
    .type('RichText');

  author.createField('promise')
    .name('Promise')
    .type('Text')
    .validations([{ size: { max: 600 } }]);

  author.createField('email')
    .name('Email')
    .type('Symbol')
    .validations([{ regexp: { pattern: '^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$' } }]);

  author.createField('phone')
    .name('Phone')
    .type('Symbol');

  author.createField('socialLinks')
    .name('Social Links')
    .type('Object');

  author.createField('targetGroups')
    .name('Target Groups')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['targetGroup'] }]
    });

  author.createField('bookingLink')
    .name('Booking Link')
    .type('Symbol')
    .validations([{ regexp: { pattern: '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$' } }]);

  // 2. CATEGORY Content Type
  const category = migration.createContentType('category')
    .name('Blog Category')
    .displayField('name')
    .description('Categorie del blog');

  category.createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  category.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  category.createField('description')
    .name('Description')
    .type('Text');

  category.createField('color')
    .name('Color')
    .type('Symbol')
    .validations([{ regexp: { pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' } }]);

  // 3. SERVICE CATEGORY Content Type
  const serviceCategory = migration.createContentType('serviceCategory')
    .name('Service Category')
    .displayField('name')
    .description('Categorie dei servizi');

  serviceCategory.createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  serviceCategory.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  serviceCategory.createField('icon')
    .name('Icon')
    .type('Symbol');

  serviceCategory.createField('color')
    .name('Color')
    .type('Symbol')
    .validations([{ regexp: { pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' } }]);

  serviceCategory.createField('description')
    .name('Description')
    .type('Text');

  // 4. FAQ Content Type
  const faq = migration.createContentType('faq')
    .name('FAQ')
    .displayField('question')
    .description('Domande frequenti');

  faq.createField('question')
    .name('Question')
    .type('Symbol')
    .required(true);

  faq.createField('answer')
    .name('Answer')
    .type('RichText')
    .required(true);

  faq.createField('category')
    .name('Category')
    .type('Symbol');

  faq.createField('order')
    .name('Order')
    .type('Integer');

  // 5. TESTIMONIAL Content Type
  const testimonial = migration.createContentType('testimonial')
    .name('Testimonial')
    .displayField('customerName')
    .description('Recensioni dei clienti');

  testimonial.createField('customerName')
    .name('Kundenname')
    .type('Symbol')
    .required(true);

  testimonial.createField('rating')
    .name('Bewertung')
    .type('Integer')
    .required(true)
    .validations([{ range: { min: 1, max: 5 } }]);

  testimonial.createField('testimonialText')
    .name('Testimonial Text')
    .type('Text')
    .required(true);

  testimonial.createField('date')
    .name('Datum')
    .type('Date');

  testimonial.createField('customerPhoto')
    .name('Foto')
    .type('Link')
    .linkType('Asset');

  testimonial.createField('isFeatured')
    .name('Featured')
    .type('Boolean')
    .defaultValue({ 'en-US': false });

  // 6. SERVICE Content Type
  const service = migration.createContentType('service')
    .name('Service')
    .displayField('serviceName')
    .description('Servizi e trattamenti');

  service.createField('serviceName')
    .name('Service Name')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  service.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([
      { unique: true },
      { regexp: { pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' } }
    ]);

  service.createField('metaDescription')
    .name('Meta Description')
    .type('Symbol')
    .validations([{ size: { max: 160 } }]);

  service.createField('heroImage')
    .name('Hero Image')
    .type('Link')
    .linkType('Asset')
    .required(true);

  service.createField('icon')
    .name('Icon')
    .type('Symbol');

  service.createField('detailedDescription')
    .name('Detailed Description')
    .type('RichText')
    .required(true);

  service.createField('howDoesItWork')
    .name('How Does It Work?')
    .type('RichText')
    .required(true);

  service.createField('whoIsItFor')
    .name('Who is it for? (target group)')
    .type('RichText')
    .required(true);

  service.createField('benefits')
    .name('Benefits')
    .type('RichText')
    .required(true);

  service.createField('treatmentProcess')
    .name('Treatment Process')
    .type('RichText');

  service.createField('contraindications')
    .name('Contraindications')
    .type('RichText');

  service.createField('duration')
    .name('Treatment Duration')
    .type('Symbol')
    .required(true);

  service.createField('price')
    .name('Price')
    .type('Number');

  service.createField('priceDescription')
    .name('Price Description')
    .type('Symbol');

  service.createField('serviceCategory')
    .name('Category')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['serviceCategory'] }]
    });

  service.createField('gallery')
    .name('Gallery')
    .type('Array')
    .items({ type: 'Link', linkType: 'Asset' });

  service.createField('testimonials')
    .name('Testimonials')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['testimonial'] }]
    });

  service.createField('faqs')
    .name('FAQs')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['faq'] }]
    });

  service.createField('relatedServices')
    .name('Related Services')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['service'] }]
    });

  service.createField('bookingLink')
    .name('Booking Link')
    .type('Symbol')
    .validations([{ regexp: { pattern: '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$' } }]);

  service.createField('isFeatured')
    .name('Featured')
    .type('Boolean')
    .defaultValue({ 'en-US': false });

  service.createField('order')
    .name('order')
    .type('Integer');

  service.createField('status')
    .name('Status')
    .type('Symbol')
    .required(true)
    .validations([{
      in: ['Active', 'Inactive']
    }])
    .defaultValue({ 'en-US': 'Active' });

  // 7. BLOG POST Content Type
  const blogPost = migration.createContentType('blogPost')
    .name('Blog Post')
    .displayField('title')
    .description('Articoli del blog');

  blogPost.createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  blogPost.createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([
      { unique: true },
      { regexp: { pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' } }
    ]);

  blogPost.createField('metaDescription')
    .name('Meta Description')
    .type('Symbol')
    .validations([{ size: { max: 160 } }]);

  blogPost.createField('featuredImage')
    .name('Featured Image')
    .type('Link')
    .linkType('Asset')
    .required(true);

  blogPost.createField('author')
    .name('Author')
    .type('Link')
    .linkType('Entry')
    .required(true)
    .validations([{ linkContentType: ['author'] }]);

  blogPost.createField('publishDate')
    .name('Publish date')
    .type('Date')
    .required(true);

  blogPost.createField('category')
    .name('Category')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['category'] }]
    });

  blogPost.createField('tags')
    .name('Tags')
    .type('Array')
    .items({ type: 'Symbol' });

  blogPost.createField('excerpt')
    .name('Introduction')
    .type('Text')
    .required(true)
    .validations([{ size: { max: 300 } }]);

  blogPost.createField('content')
    .name('Content')
    .type('RichText')
    .required(true);

  blogPost.createField('readingTime')
    .name('Reading Time ')
    .type('Integer');

  blogPost.createField('relatedServices')
    .name('Related Services')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['service'] }]
    });

  blogPost.createField('faqSection')
    .name('FAQ Section')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['faq'] }]
    });

  blogPost.createField('isFeatured')
    .name('Featured')
    .type('Boolean')
    .defaultValue({ 'en-US': false });

  blogPost.createField('status')
    .name('Status')
    .type('Symbol')
    .required(true)
    .validations([{
      in: ['Draft', 'Published', 'Archived']
    }])
    .defaultValue({ 'en-US': 'Draft' });

  // 8. PAGE SETTINGS Content Type
  const pageSettings = migration.createContentType('pageSettings')
    .name('Page Settings')
    .displayField('pageName')
    .description('Impostazioni per le diverse pagine');

  pageSettings.createField('pageName')
    .name('Page')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  pageSettings.createField('heroTitle')
    .name('Hero title')
    .type('Symbol');

  pageSettings.createField('heroSubtitle')
    .name('Hero subtitle')
    .type('Text');

  pageSettings.createField('heroImage')
    .name('Hero image')
    .type('Link')
    .linkType('Asset');

  pageSettings.createField('ctaText')
    .name('CTA text')
    .type('Symbol');

  pageSettings.createField('ctaLink')
    .name('CTA link')
    .type('Symbol');

  pageSettings.createField('seoTitle')
    .name('SEO title')
    .type('Symbol');

  pageSettings.createField('seoDescription')
    .name('SEO description')
    .type('Text');

  // 9. PROMO BANNER Content Type
  const promoBanner = migration.createContentType('promoBanner')
    .name('Promo Banner')
    .displayField('title')
    .description('Banner per Offerte Promozionali');

  promoBanner.createField('title')
    .name('Title')
    .type('Symbol')
    .required(true);

  promoBanner.createField('message')
    .name('Message')
    .type('Text')
    .required(true);

  promoBanner.createField('backgroundColor')
    .name('Background color')
    .type('Symbol')
    .validations([{ regexp: { pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' } }]);

  promoBanner.createField('link')
    .name('Link')
    .type('Symbol');

  promoBanner.createField('isActive')
    .name('Active')
    .type('Boolean')
    .defaultValue({ 'en-US': false });

  promoBanner.createField('startDate')
    .name('Start date')
    .type('Date');

  promoBanner.createField('endDate')
    .name('End date')
    .type('Date');

  // 10. TARGET GROUP Content Type
  const targetGroup = migration.createContentType('targetGroup')
    .name('Target Group')
    .displayField('name')
    .description('Gruppi target per gli autori');

  targetGroup.createField('name')
    .name('Name')
    .type('Symbol')
    .required(true);

  targetGroup.createField('targetingMethod')
    .name('Targeting Method')
    .type('Symbol');
};
