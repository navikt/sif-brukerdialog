import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { BodyLong, Heading } from '@navikt/ds-react';
import BehandlingAvPersonopplysningerContent from './personalopplysninger/BehandlingAvPersonopplysningerContent';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

const OmSøknaden = () => {
    const intl = useIntl();
    return (
        <Block margin="xl">
            <Heading level="2" size="small" spacing={true}>
                Mer om skjemaet
            </Heading>
            <ExpandableInfo title={intlHelper(intl, 'page.velkommen.omSøknaden.tittel')}>
                <BodyLong as="div">
                    <FormattedMessage id="page.velkommen.omSøknaden.1" tagName="p" />
                    <FormattedMessage id="page.velkommen.omSøknaden.2" tagName="p" />
                    <FormattedMessage id="page.velkommen.omSøknaden.3" tagName="p" />
                </BodyLong>
            </ExpandableInfo>
            <ExpandableInfo title="Om hvordan vi innhenter opplysninger om deg">
                <BehandlingAvPersonopplysningerContent />
            </ExpandableInfo>
        </Block>
    );
};

export default OmSøknaden;
