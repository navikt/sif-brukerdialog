import supportedLocales from '../locales';

const LocaleSimpleText = {
    name: 'localeSimpleText',
    title: 'Locale simple text',
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
        type: 'text',
        rows: 5,
        fieldset: lang.isDefault ? null : 'translations',
    })),
};

export default LocaleSimpleText;
