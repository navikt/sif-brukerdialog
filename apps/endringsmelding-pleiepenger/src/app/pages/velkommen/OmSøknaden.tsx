import { BodyLong, Heading } from '@navikt/ds-react';

import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';
import { AppText, useAppIntl } from '../../i18n';

const OmSøknaden = () => {
    const { text } = useAppIntl();
    return (
        <Block margin="xl">
            <Heading level="2" size="small" spacing={true}>
                <AppText id="velkommenPage.merInformasjon.tittel" />
            </Heading>
            <ExpandableInfo title={text('velkommenPage.omSøknaden.tittel')}>
                <BodyLong as="div">
                    <p>
                        <AppText id="velkommenPage.omSøknaden.1" />
                    </p>
                    <p>
                        <AppText id="velkommenPage.omSøknaden.2" />
                    </p>
                    <p>
                        <AppText id="velkommenPage.omSøknaden.3" />
                    </p>
                </BodyLong>
            </ExpandableInfo>
            <ExpandableInfo title={text('velkommenPage.personopplysninger.tittel')}>
                <BehandlingAvPersonopplysningerContent />
            </ExpandableInfo>
        </Block>
    );
};

export default OmSøknaden;
