module.exports = function (migration) {
    const author = migration.editContentType('author');

    author.createField('bookingLink')
        .name('Booking Link')
        .type('Symbol')
        .validations([{ regexp: { pattern: '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$' } }]);
};
