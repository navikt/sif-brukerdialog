import './statusMessage.css';

import { Alert } from '@navikt/ds-react';

import { SanityLocale, SanityMessageType } from '../../types';
import { SanityStatusMessage } from '../../types/sanityObjects';
import { getLocaleBlockContent } from '../../utils';
import SanityBlock from '../sanity-block/SanityBlock';

interface Props {
    message: SanityStatusMessage;
    wrapInAlertStripe?: boolean;
    locale?: SanityLocale;
}

const getAlertStripeTypeFromMessageType = (type?: SanityMessageType): 'info' | 'error' | 'warning' => {
    switch (type) {
        case SanityMessageType.info:
            return 'info';
        case SanityMessageType.warning:
            return 'warning';
        case SanityMessageType.error:
            return 'error';
        default:
            return 'info';
    }
};

const StatusMessage = ({ message, locale = 'nb', wrapInAlertStripe = true }: Props) => {
    const info = getLocaleBlockContent(message.message, locale);
    if (!info || info.length === 0) {
        return null;
    }
    const content = <SanityBlock content={info} />;
    return wrapInAlertStripe ? (
        <Alert variant={getAlertStripeTypeFromMessageType(message.messageType)} className="statusMessage">
            {content}
        </Alert>
    ) : (
        <>{content}</>
    );
};

export default StatusMessage;
