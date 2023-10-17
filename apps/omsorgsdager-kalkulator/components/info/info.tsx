import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';
import { FormattedMessage } from 'react-intl';

const Info = () => {
    const { formatMessage } = useFeatureToggleIntl();
    return (
        <div className="p-4">
            <Heading level="2" size="large" spacing>
                <FormattedMessage id="info.title" />
            </Heading>
            <BodyLong as="div">
                <FormattedMessage id="info.avsnitt1" />
            </BodyLong>
            <ReadMore header={formatMessage('info.readMore.tittel')} className="flex flex-col pt-4 pb-4">
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
