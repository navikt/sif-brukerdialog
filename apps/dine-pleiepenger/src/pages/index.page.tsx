import { Box, VStack } from '@navikt/ds-react';
import { ReactElement } from 'react';
import Head from 'next/head';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import DineInnsendteSøknader from '../components/dine-innsendte-søknader/DineInnsendteSøknader';
import HvaSkjer from '../components/hva-skjer/HvaSkjer';
import DefaultPageLayout from '../components/page-layout/default-page-layout/DefaultPageLayout';
import Saksbehandlingstid from '../components/saksbehandlingstid/Saksbehandlingstid';
import Snarveier from '../components/snarveier/Snarveier';
import VelgSakPage from '../components/velg-sak-page/VelgSakPage';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';
import { useLogBrukerprofil } from '../hooks/useLogBrukerprofil';
import { useAppIntl } from '../i18n';
import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { InnsendtSøknad, InnsendtSøknadstype } from '../types/InnsendtSøknad';
import SakPage from './sak/SakPage';

const harSendtInnSøknadEllerEndringsmelding = (søknader: InnsendtSøknad[]): boolean => {
    return søknader.some(
        (søknad) =>
            søknad.søknadstype === InnsendtSøknadstype.PP_SYKT_BARN ||
            søknad.søknadstype === InnsendtSøknadstype.PP_SYKT_BARN_ENDRINGSMELDING,
    );
};

const getSaksbehandlingsfrist = (søknader: InnsendtSøknad[], saker: PleietrengendeMedSak[]): Date | undefined => {
    if (saker.length === 1 && harSendtInnSøknadEllerEndringsmelding(søknader)) {
        return saker[0].sak.saksbehandlingsFrist;
    }
    return undefined;
};

function DinePleiepengerPage(): ReactElement {
    const {
        innsynsdata: { innsendteSøknader, saker, saksbehandlingstidUker, brukerprofil },
    } = useInnsynsdataContext();

    useLogBrukerprofil(brukerprofil);

    const { text } = useAppIntl();

    if (saker.length === 1) {
        return (
            <SakPage
                sak={saker[0].sak}
                antallSaker={1}
                pleietrengende={saker[0].pleietrengende}
                saksbehandlingstidUker={saksbehandlingstidUker}
            />
        );
    }

    if (saker.length > 1) {
        return <VelgSakPage saker={saker} />;
    }

    // if (innsendteSøknader.length === 0) {
    //     return <IngenSakEllerSøknadPage />;
    // }

    return (
        <DefaultPageLayout>
            <Head>
                <title>{text('forside.dokumentTittel')}</title>
            </Head>
            <VStack gap="8">
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        <DineInnsendteSøknader søknader={innsendteSøknader} />
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <Saksbehandlingstid
                            frist={getSaksbehandlingsfrist(innsendteSøknader, saker)}
                            saksbehandlingstidUker={saksbehandlingstidUker}
                        />
                    </div>
                </Box>
                <Box>
                    <Snarveier title="Trenger du å oppdatere saken din?" />
                </Box>
                <Box className="mt-4">
                    <HvaSkjer />
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
