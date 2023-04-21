import { Link } from '@navikt/ds-react';
import React from 'react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import Kvittering from '@navikt/sif-common-soknad-ds/lib/components/kvittering/Kvittering';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';

const KvitteringPage = () => {
    useLogSidevisning(SIFCommonPageKey.kvittering);
    return (
        <Page title="Endringsmelding er mottatt">
            <Kvittering tittel="Melding om endring er lagt til saken din">
                <p>
                    Når vi har behandlet meldingen fra deg, får du et svarbrev i DigiPost. Hvis du har registrert deg
                    mot å motta digital post, får du svaret tilsendt i posten.
                </p>
                <Block margin="xl">
                    Du kan se hva du har sendt inn på{' '}
                    <Link href={getEnvironmentVariable('INNSYN_URL')}>dine pleiepenger</Link>.
                </Block>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
