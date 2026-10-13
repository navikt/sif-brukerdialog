import { defineField, defineType } from 'sanity';

import supportedLocales from '../locales';

const LocaleSimpleText = defineType({
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
    fields: supportedLocales.map((lang) =>
        defineField({
            title: lang.title,
            name: lang.id,
            type: 'text',
            rows: 5,
            fieldset: lang.isDefault ? undefined : 'translations',
        }),
    ),
});

export default LocaleSimpleText;
