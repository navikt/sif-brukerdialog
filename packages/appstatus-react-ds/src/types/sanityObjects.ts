import { ISODate } from '@sif/utils';

import { LocaleRichTextObject, SanityMessageType } from './';

export interface SanityStatusMessage {
    _type: 'statusMessage';
    message: LocaleRichTextObject;
    messageType?: SanityMessageType;
}

export interface SanityPlannedDowntimeNotice {
    _type: 'plannedDowntimeNotice';
    date: ISODate;
    /** HH:mm */
    from: string;
    /** HH:mm */
    to: string;
}

export type SanityNotice = SanityPlannedDowntimeNotice;
