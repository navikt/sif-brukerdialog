import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { intlHelper } from '../../utils/intlHelper';

const Info = () => {
    const intl = useIntl();

    return (
        <div className="p-4">
            <Heading level="2" size="large" spacing>
                <FormattedMessage id="info.title" />
            </Heading>
            <BodyLong as="div">
                <FormattedMessage id="info.avsnitt1" />
            </BodyLong>
            <ReadMore header={intlHelper(intl, 'info.readMore.tittel')} className="flex flex-col pt-4 pb-4">
                <BodyLong as="div" spacing>
                    <FormattedMessage id="info.readMore.avsnitt1" />
                </BodyLong>
                <BodyLong as="div">
                    <FormattedMessage id="info.readMore.avsnitt2" />
                </BodyLong>
            </ReadMore>
            <BodyLong as="div" spacing>
                <FormattedMessage id="info.avsnitt2" />
            </BodyLong>
            <BodyLong as="div" spacing>
                <FormattedMessage id="info.avsnitt3" />
            </BodyLong>
        </div>
    );
};

export default Info;
