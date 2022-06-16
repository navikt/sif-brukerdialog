import { LocaleRichTextObject, SanityMessageType } from '.';

export interface SanityStatusMessage {
    _type: 'statusMessage';
    message: LocaleRichTextObject;
    messageType?: SanityMessageType;
}
