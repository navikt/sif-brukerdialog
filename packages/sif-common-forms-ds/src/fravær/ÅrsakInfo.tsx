import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { useIntl } from 'react-intl';
import FormattedHtmlMessage from '../components/formatted-html-message/FormattedHtmlMessage';

const ÅrsakInfo: React.FunctionComponent = () => {
    const intl = useIntl();
    return (
        <ExpandableInfo title={intlHelper(intl, 'info.årsak.tittel')}>
            <p style={{ marginTop: '0' }}>
                <FormattedHtmlMessage id="info.årsak.info.1" />
            </p>
            <Element tag="h3">
                <FormattedHtmlMessage id="info.årsak.info.2" />
            </Element>
            <FormattedHtmlMessage id="info.årsak.info.3" />
        </ExpandableInfo>
    );
};

export default ÅrsakInfo;
