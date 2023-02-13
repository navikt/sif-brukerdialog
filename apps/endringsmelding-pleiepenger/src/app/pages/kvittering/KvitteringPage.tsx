import React from 'react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import Kvittering from '@navikt/sif-common-core-ds/lib/components/kvittering/Kvittering';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { Button } from '@navikt/ds-react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';

const KvitteringPage = () => {
    useLogSidevisning(SIFCommonPageKey.kvittering);
    return (
        <Page title="Endringsmelding er mottatt">
            <Kvittering tittel="Melding om endring er mottatt">
                <p>Når vi har behandlet meldingen fra deg, får du svar fra oss på Ditt NAV.</p>
                <p>Hvis du har registrert deg mot å motta digital post, får du svaret tilsendt i posten.</p>
                <Block margin="xl">
                    <Button as="a" type="button" variant="primary" href={getEnvironmentVariable('INNSYN_URL')}>
                        Gå til dine pleiepenger
                    </Button>
                </Block>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
