/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MESSAGE_TYPE } from '../../types';
import { toPlainText, shortenText } from '../../utils/previewUtils';
import { getLocaleContent } from '../../utils/getLocaleContent';

const Message = {
    title: 'Status message',
    name: 'statusMessage',
    type: 'object',
    fields: [
        {
            title: 'Message content',
            name: 'message',
            type: 'localeRichText',
            validation: (Rule: { required: () => any }) => Rule.required(),
        },
        {
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
        },
    ],
    preview: {
        select: {
            message: 'message',
            messageType: 'messageType',
        },
        prepare(props: any) {
            const title = shortenText(toPlainText(getLocaleContent(props.message)));
            const subtitle = `Message type: ${props.messageType}`;
            return {
                title,
                subtitle,
            };
        },
    },
};

export default Message;
