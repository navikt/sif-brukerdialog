import { Link } from '@navikt/ds-react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import Kvittering from '@navikt/sif-common-soknad-ds/lib/components/kvittering/Kvittering';
import { useEffect } from 'react';

interface Props {
    onUnmount: () => void;
}

const KvitteringPage = ({ onUnmount }: Props) => {
    useLogSidevisning(SIFCommonPageKey.kvittering);
    useEffect(() => {
        return () => {
            onUnmount();
        };
    });
    return (
        <Page title="Endringsmelding er mottatt">
            <Kvittering tittel="Melding om endring er lagt til saken din">
                <p>
                    Når vi har behandlet meldingen fra deg, får du svar på din side på nav.no og i Digipost. Hvis du har
                    registrert deg mot å motta digital post, får du svaret tilsendt i posten.
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
