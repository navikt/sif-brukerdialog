import { BodyLong, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText } from '../../i18n';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';

const OmSøknaden = () => {
    return (
        <Block margin="xl">
            <Heading level="2" size="medium">
                <AppText id="page.velkommen.omSøknaden.tittel" />
            </Heading>
            <BodyLong as="div">
                <p>
                    <AppText id="page.velkommen.omSøknaden.1" />
                </p>
                <p>
                    <AppText id="page.velkommen.omSøknaden.2" />
                </p>
                <p>
                    <AppText id="page.velkommen.omSøknaden.3" />
                </p>
                <ExpandableInfo title="Om hvordan vi innhenter opplysninger om deg">
                    <BehandlingAvPersonopplysningerContent />
                </ExpandableInfo>
            </BodyLong>
        </Block>
    );
};

export default OmSøknaden;
