import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { Undertittel } from 'nav-frontend-typografi';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';

const OmSøknaden = () => {
    const intl = useIntl();
    return (
        <Box margin="xl">
            <Undertittel tag="h2">
                <FormattedMessage id="page.velkommen.omSøknaden.tittel" />
            </Undertittel>

            <FormattedMessage id="page.velkommen.omSøknaden.1" tagName="p" />
            <FormattedMessage id="page.velkommen.omSøknaden.2" tagName="p" />
            <FormattedMessage id="page.velkommen.omSøknaden.3" tagName="p" />

            <ExpandableInfo title={intlHelper(intl, 'page.velkommen.omSøknaden.4')}>
                <BehandlingAvPersonopplysningerContent />
            </ExpandableInfo>
        </Box>
    );
};

export default OmSøknaden;
