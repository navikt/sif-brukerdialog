import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import BehandlingAvPersonopplysningerContent from './personalopplysninger/BehandlingAvPersonopplysningerContent';

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
