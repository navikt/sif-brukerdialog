import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import FormattedHtmlMessage from '../../components/formatted-html-message/FormattedHtmlMessage';

const ÅrsakInfo: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'info.årsak.tittel')}>
            <p style={{ marginTop: '0' }}>
                <FormattedHtmlMessage id="info.årsak.info.1" />
            </p>
            <Heading level="3" size="xsmall">
                <FormattedHtmlMessage id="info.årsak.info.2" />
            </Heading>
            <FormattedHtmlMessage id="info.årsak.info.3" />
        </ExpandableInfo>
    );
};

export default ÅrsakInfo;
