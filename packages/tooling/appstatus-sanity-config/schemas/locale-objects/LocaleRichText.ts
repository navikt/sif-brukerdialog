import { defineArrayMember, defineField, defineType } from 'sanity';

import supportedLocales from '../locales';

const LocaleRichText = defineType({
    name: 'localeRichText',
    type: 'object',
    fieldsets: [
        {
            name: 'translations',
            title: 'Translations',
            options: { collapsible: true },
        },
    ],
    fields: supportedLocales.map((lang) =>
        defineField({
            title: lang.title,
            name: lang.id,
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'Tittel', value: 'title' },
                        { title: 'Ingress', value: 'ingress' },
                        { title: 'Checklist', value: 'checklist' },
                        { title: 'Knapp', value: 'button' },
                    ],
                }),
            ],
            fieldset: lang.isDefault ? undefined : 'translations',
        }),
    ),
});

export default LocaleRichText;
