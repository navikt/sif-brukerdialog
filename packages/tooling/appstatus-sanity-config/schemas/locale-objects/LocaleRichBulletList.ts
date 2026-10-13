import { defineArrayMember, defineField, defineType } from 'sanity';

import supportedLocales from '../locales';

const LocaleRichBulletList = defineType({
    name: 'localeRichBulletList',
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
                    styles: [],
                    marks: {
                        decorators: [{ title: 'Strong', value: 'strong' }],
                        annotations: [
                            defineArrayMember({
                                name: 'link',
                                type: 'object',
                                title: 'link',
                                fields: [
                                    defineField({
                                        name: 'url',
                                        type: 'url',
                                    }),
                                ],
                            }),
                        ],
                    },
                    lists: [{ title: 'Bullet', value: 'bullet' }],
                }),
            ],
            fieldset: lang.isDefault ? undefined : 'translations',
        }),
    ),
});

export default LocaleRichBulletList;
