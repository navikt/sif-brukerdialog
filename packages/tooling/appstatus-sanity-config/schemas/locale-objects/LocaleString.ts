import { defineField, defineType } from 'sanity';

import supportedLocales from '../locales';

const LocaleString = defineType({
    name: 'localeString',
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
            type: 'string',
            fieldset: lang.isDefault ? undefined : 'translations',
        }),
    ),
});

export default LocaleString;
