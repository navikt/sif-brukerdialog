import supportedLocales from '../locales';

const OptionalLocaleTitle = {
    name: 'optionalLocaleTitle',
    type: 'object',
    fieldsets: [
        {
            title: 'Translations',
            name: 'translations',
            options: { collapsible: true },
        },
    ],
    fields: supportedLocales.map((lang) => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        fieldset: 'translations',
    })),
};

export default OptionalLocaleTitle;
