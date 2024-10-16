import supportedLocales from '../locales';

const LocaleRichText = {
    name: 'localeRichText',
    type: 'object',
    fieldsets: [
        {
            name: 'translations',
            title: 'Translations',
            options: { collapsible: true },
        },
    ],
    fields: supportedLocales.map((lang) => ({
        title: lang.title,
        name: lang.id,
        type: 'array',
        of: [
            {
                type: 'block',
                styles: [
                    {
                        title: 'Normal',
                        value: 'normal',
                    },
                    {
                        title: 'Tittel',
                        value: 'title',
                    },
                    {
                        title: 'Ingress',
                        value: 'ingress',
                    },
                    {
                        title: 'Checklist',
                        value: 'checklist',
                    },
                    {
                        title: 'Knapp',
                        value: 'button',
                    },
                ],
            },
        ],
        fieldset: lang.isDefault ? null : 'translations',
    })),
};

export default LocaleRichText;
