import { Box, Heading, LinkPanel, VStack } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import Link from 'next/link';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import DineInnsendteSøknader from '../components/dine-innsendte-søknader/DineInnsendteSøknader';
import HvaSkjer from '../components/hva-skjer/HvaSkjer';
import DefaultPageLayout from '../components/page-layout/default-page-layout/DefaultPageLayout';
import Snarveier from '../components/snarveier/Snarveier';
import StatusTag from '../components/status-tag/StatusTag';
import Svarfrist from '../components/svarfrist/Svarfrist';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';
import { useLogBrukerprofil } from '../hooks/useLogBrukerprofil';
import { useMessages } from '../i18n';
import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { InnsendtSøknad, InnsendtSøknadstype } from '../types/Søknad';
import { personaliaUtils } from '../utils/personaliaUtils';
import { getBehandlingsstatusISak } from '../utils/sakUtils';
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
        innsynsdata: { innsendteSøknader, saker, saksbehandlingstidUker },
    } = useInnsynsdataContext();

    useLogBrukerprofil(innsendteSøknader, saker, saksbehandlingstidUker);

    const { text } = useMessages();

    if (saker.length === 1) {
        return (
            <SakPage
                sak={saker[0].sak}
                harFlereSaker={false}
                pleietrengende={saker[0].pleietrengende}
                saksbehandlingstidUker={saksbehandlingstidUker}
            />
        );
    }

    if (saker.length > 1) {
        return (
            <DefaultPageLayout>
                <Head>
                    <title>{text('velgSak.dokumentTittel')}</title>
                </Head>
                <Box>
                    <Heading size="medium" level="1" spacing={true} className="text-deepblue-800">
                        {text('velgSak.tittel')}
                    </Heading>

                    <VStack gap="5" className="max-w-2xl mb-10">
                        {saker.map((sak) => (
                            <LinkPanel
                                as={Link}
                                border={false}
                                href={`/sak/${sak.sak.saksnummer}`}
                                key={sak.sak.saksnummer}>
                                <LinkPanel.Title className="w-full">
                                    <Heading as="span" size="small">
                                        {personaliaUtils.navn(sak.pleietrengende)}
                                    </Heading>
                                </LinkPanel.Title>
                                <LinkPanel.Description>
                                    <p>
                                        {text('velgSak.barn.fdato', {
                                            dato: dateFormatter.full(sak.pleietrengende.fødselsdato),
                                        })}
                                    </p>
                                    <StatusTag {...getBehandlingsstatusISak(sak.sak)} />
                                </LinkPanel.Description>
                            </LinkPanel>
                        ))}
                    </VStack>
                </Box>
            </DefaultPageLayout>
        );
    }

    return (
        <DefaultPageLayout>
            <Head>
                <title>{text('forside.dokumentTittel')}</title>
            </Head>
            <VStack gap="12">
                <Box>
                    <Snarveier />
                </Box>
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        <DineInnsendteSøknader søknader={innsendteSøknader} />
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <Svarfrist
                            frist={getSaksbehandlingsfrist(innsendteSøknader, saker)}
                            saksbehandlingstidUker={saksbehandlingstidUker}
                        />
                    </div>
                </Box>
                <Box>
                    <HvaSkjer />
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
