import { defineField, defineType } from 'sanity';

import supportedLocales from '../locales';

const OptionalLocaleTitle = defineType({
    name: 'optionalLocaleTitle',
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
            fieldset: 'translations',
        }),
    ),
});

export default OptionalLocaleTitle;
