import { defineField, defineType } from 'sanity';

import { MESSAGE_TYPE } from '../../types';
import { getLocaleContent } from '../../utils/getLocaleContent';
import { shortenText, toPlainText } from '../../utils/previewUtils';

const StatusMessage = defineType({
    title: 'Status message',
    name: 'statusMessage',
    type: 'object',
    fields: [
        defineField({
            title: 'Message content',
            name: 'message',
            type: 'localeRichText',
            validation: (rule) => rule.required(),
        }),
        defineField({
            title: 'Message type',
            name: 'messageType',
            type: 'string',
            options: {
                layout: 'radio',
                list: [
                    { title: 'Information (default)', value: MESSAGE_TYPE.info },
                    { title: 'Warning', value: MESSAGE_TYPE.warning },
                    { title: 'Error', value: MESSAGE_TYPE.error },
                ],
            },
        }),
    ],
    preview: {
        select: {
            message: 'message',
            messageType: 'messageType',
        },
        prepare({ message, messageType }) {
            return {
                title: shortenText(toPlainText(getLocaleContent(message))),
                subtitle: `Message type: ${messageType}`,
            };
        },
    },
});

export default StatusMessage;
