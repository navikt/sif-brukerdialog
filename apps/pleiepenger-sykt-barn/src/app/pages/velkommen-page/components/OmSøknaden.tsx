import { Heading, Link } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText } from '../../../i18n';
import getLenker from '../../../lenker';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';

const OmSøknaden = () => {
    const { text } = useAppIntl();
    return (
        <Block margin="xl">
            <Heading level="2" size="medium">
                <AppText id="page.velkommen.omSøknaden.tittel" />
            </Heading>

            <p>
                <AppText id="page.velkommen.omSøknaden.1" />
            </p>
            <p>
                <AppText id="page.velkommen.omSøknaden.fremoverITid" />
            </p>
            <ExpandableInfo title={text('page.velkommen.omSøknaden.endringer.tittel')}>
                <p>
                    <AppText id="page.velkommen.omSøknaden.endringer.tekst.1.a" />{' '}
                    <Link href={getLenker('nb').endringsmelding} target="_blank">
                        <AppText id="page.velkommen.omSøknaden.endringer.tekst.1.b" />
                    </Link>
                    <AppText id="page.velkommen.omSøknaden.endringer.tekst.1.c" />
                </p>
                <p>
                    <AppText id="page.velkommen.omSøknaden.endringer.tekst.2.a" />{' '}
                    <Link href={getLenker('nb').skrivTilOss} target="_blank">
                        <AppText id="page.velkommen.omSøknaden.endringer.tekst.2.b" />
                    </Link>
                    <AppText id="page.velkommen.omSøknaden.endringer.tekst.2.c" />
                </p>
            </ExpandableInfo>

            <p>
                <AppText id="page.velkommen.omSøknaden.2" />
            </p>
            <p>
                <AppText id="page.velkommen.omSøknaden.3" />
            </p>
            <ExpandableInfo title={text('page.velkommen.omSøknaden.4')}>
                <BehandlingAvPersonopplysningerContent />
            </ExpandableInfo>
        </Block>
    );
};

export default OmSøknaden;
