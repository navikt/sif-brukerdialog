import { defineField, defineType } from 'sanity';

import { MESSAGE_TYPE } from '../../types';
import { validateLocaleString } from '../../utils/contentValidation';
import { getLocaleContent } from '../../utils/getLocaleContent';
import { shortenText, toPlainText } from '../../utils/previewUtils';
import { defaultLocale } from '../locales';

const SystemMessage = defineType({
    title: 'System message',
    name: 'systemMessage',
    type: 'document',
    fieldsets: [
        {
            name: 'internal',
            title: 'Setup',
            options: {
                collapsible: false,
            },
        },
        {
            name: 'public',
            title: 'Content',
            options: {
                collapsible: false,
            },
        },
    ],
    fields: [
        defineField({
            title: 'Name',
            name: 'name',
            type: 'string',
            validation: (rule) => rule.required(),
            fieldset: 'internal',
        }),
        defineField({
            title: 'Message type',
            name: 'messageType',
            type: 'string',
            fieldset: 'internal',
            options: {
                layout: 'radio',
                list: [
                    { title: 'Information', value: MESSAGE_TYPE.info },
                    { title: 'Warning', value: MESSAGE_TYPE.warning },
                    { title: 'Error', value: MESSAGE_TYPE.error },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Where to include the message?',
            name: 'application',
            type: 'array',
            fieldset: 'internal',
            of: [{ type: 'reference', to: [{ type: 'application' }] }],
        }),
        defineField({
            title: 'Show in all applications',
            name: 'isGlobal',
            type: 'boolean',
            fieldset: 'internal',
        }),
        defineField({
            title: 'Visible from',
            name: 'starts',
            type: 'datetime',
            fieldset: 'internal',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Visible until',
            name: 'stops',
            type: 'datetime',
            fieldset: 'internal',
        }),
        defineField({
            title: 'Message',
            name: 'content',
            type: 'localeRichText',
            validation: (rule) => rule.custom((value) => validateLocaleString(value as Record<string, unknown>)),
        }),
    ],
    preview: {
        select: {
            name: 'name',
            messageType: 'messageType',
            content: 'content',
        },
        prepare({ name, messageType, content }) {
            const subtitle = toPlainText(getLocaleContent(content, defaultLocale));
            return {
                title: `${name}`,
                subtitle: `[${messageType}] ${shortenText(subtitle) || 'No tittel'}`,
            };
        },
    },
});

export default SystemMessage;
