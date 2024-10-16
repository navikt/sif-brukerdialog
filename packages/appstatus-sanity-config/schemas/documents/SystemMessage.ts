/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { localeContentValidation } from '../../utils/contentValidation';
import { toPlainText, shortenText } from '../../utils/previewUtils';
import { getLocaleContent } from '../../utils/getLocaleContent';
import { defaultLocale } from '../locales';
import { MESSAGE_TYPE } from '../../types';

const Message = {
    title: 'System message',
    name: 'systemMessage',
    type: 'document',
    id: 'systemMessage',
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
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            validation: (Rule: { required: () => any }) => Rule.required(),
            fieldset: 'internal',
        },
        {
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
            validation: (Rule: { required: () => any }) => Rule.required(),
        },
        {
            title: 'Where to include the message?',
            name: 'application',
            type: 'array',
            fieldset: 'internal',
            of: [{ type: 'reference', to: [{ type: 'application' }] }],
        },
        {
            title: 'Show in all applications',
            name: 'isGlobal',
            type: 'boolean',
            fieldset: 'internal',
        },
        {
            title: 'Visible from',
            name: 'starts',
            type: 'datetime',
            fieldset: 'internal',
            validation: (Rule: { required: () => any }) => Rule.required(),
        },
        {
            title: 'Visible until',
            name: 'stops',
            type: 'datetime',
            fieldset: 'internal',
        },
        {
            title: 'Message',
            name: 'content',
            type: 'localeRichText',
            validation: localeContentValidation,
        },
    ],
    preview: {
        select: {
            name: 'name',
            style: 'style',
            content: 'content',
        },
        prepare(props: { name: any; content: any; style: any }) {
            const title = `${props.name}`;
            const subtitle = toPlainText(getLocaleContent(props.content, defaultLocale));

            return {
                title,
                subtitle: `[${props.style}] ${shortenText(subtitle) || 'No tittel'}`,
            };
        },
    },
};
export default Message;
