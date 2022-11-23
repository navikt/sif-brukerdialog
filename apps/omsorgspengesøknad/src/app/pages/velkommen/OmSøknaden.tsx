import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { Heading } from '@navikt/ds-react';
import BehandlingAvPersonopplysningerContent from './personalopplysninger/BehandlingAvPersonopplysningerContent';

const OmSøknaden = () => {
    return (
        <Block margin="xl">
            <Heading level="3" size="medium">
                Om søknaden
            </Heading>
            <p>Du får veiledning underveis i søknaden om hva du skal fylle ut, og hvordan. </p>
            <p>
                Vi tar vare på svarene dine i 72 timer. Så, hvis du innenfor den tiden for eksempel vil ta en pause
                eller blir automatisk logget ut, fortsetter du der du var når du kommer tilbake.
            </p>
            <p>
                Du må svare på alle spørsmålene for å kunne gå videre. Hvis du mangler etterspurt dokumentasjon, kan du
                ettersende det så snart du kan.
            </p>
            <ExpandableInfo title="Om hvordan vi innhenter opplysninger om deg">
                <BehandlingAvPersonopplysningerContent />
            </ExpandableInfo>
        </Block>
    );
};

export default OmSøknaden;
