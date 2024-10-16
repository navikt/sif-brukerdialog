import supportedLocales from '../locales';

const LocaleString = {
    name: 'localeString',
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
        fieldset: lang.isDefault ? null : 'translations',
    })),
};

export default LocaleString;
