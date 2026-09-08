import { Søker } from '@sif/api/k9-prosessering';
import { Oppgave } from '@sif/api/ung-brukerdialog';
import { Navigate, Route, Routes } from 'react-router-dom';

import { InnsynContextProvider } from './context/InnsynContext';
import { ForsidePage } from './pages/ForsidePage';
import OppgavePage from './pages/OppgavePage';
import { TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';
import { UngInnsynPage } from '@sif/ung-innsyn/pages';
import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';
import { InnsynForsideHeader } from '@sif/ung-innsyn/components';
import { SifGuidePanel } from '@sif/soknad-ui';

interface Props {
    søker: Søker;
    oppgaver: Oppgave[];
    tilgjengeligSøknad: TilgjengeligSøknadResponse;
}

const IGNORE_TILGJENGELIG_SJEKK = true;

export const Innsyn = ({ søker, oppgaver, tilgjengeligSøknad }: Props) => {
    if (tilgjengeligSøknad.harInnsyn || IGNORE_TILGJENGELIG_SJEKK) {
        return (
            <InnsynContextProvider søker={søker} oppgaver={oppgaver} refetchOppgaver={() => Promise.resolve()}>
                <Routes>
                    <Route path="/" element={<ForsidePage oppgaver={oppgaver} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
                    <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
                </Routes>
            </InnsynContextProvider>
        );
    }
    if (tilgjengeligSøknad.harUbehandletSøknad) {
        return (
            <UngInnsynPage documentTitle="Dine aktivitetspenger">
                <VStack gap="space-40">
                    <InnsynForsideHeader title="Dine aktivitetspenger" />

                    <SifGuidePanel poster={true}>
                        <Heading level="1" size="medium" spacing>
                            Hei {søker.fornavn}
                        </Heading>
                        <VStack gap="space-16">
                            <BodyLong>
                                Vi har mottatt din søknad og den vil bli behandlet snart. Du vil få beskjed når
                                behandlingen er ferdig.
                            </BodyLong>
                            <BodyLong>
                                Du kan lese mer om aktivitetspenger på{' '}
                                <Link href="https://www.nav.no/aktivitetspenger">nav.no/aktivitetspenger</Link>.
                            </BodyLong>
                        </VStack>
                    </SifGuidePanel>
                </VStack>
            </UngInnsynPage>
        );
    }
    return (
        <UngInnsynPage documentTitle="Aktivitetspenger">
            <VStack gap="space-40">
                <SifGuidePanel poster={true}>
                    <Heading level="1" size="medium" spacing>
                        Du har ikke tilgang til denne siden
                    </Heading>
                    <VStack gap="space-16">
                        <BodyLong>
                            Denne siden er for dem som har søkt og fått innvilget aktivitetspenger. Hvis du akkurat har
                            sendt inn søknad, kan du komme tilbake til denne siden litt senere.
                        </BodyLong>
                        <BodyLong>
                            Du kan lese mer om aktivitetspenger på{' '}
                            <Link href="https://www.nav.no/aktivitetspenger">nav.no/aktivitetspenger</Link>.
                        </BodyLong>
                    </VStack>
                </SifGuidePanel>
            </VStack>
        </UngInnsynPage>
    );
};
