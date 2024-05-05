import { BodyLong, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText, useAppIntl } from '../../i18n';
import BehandlingAvPersonopplysningerContent from './personalopplysninger/BehandlingAvPersonopplysningerContent';

const OmSøknaden = () => {
    const { text } = useAppIntl();
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
                <ExpandableInfo title={text('page.velkommen.omSøknaden.4')}>
                    <BehandlingAvPersonopplysningerContent />
                </ExpandableInfo>
            </BodyLong>
        </Block>
    );
};

export default OmSøknaden;
