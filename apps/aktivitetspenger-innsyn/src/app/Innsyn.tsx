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
import { getMaybeEnv } from '@navikt/sif-common-env';
import { AppText, useAppIntl } from './i18n';
import { formatName } from '@sif/utils';
import { SøknadMottattInfo } from './components/soknad-mottatt-info/SoknadMottattInfo';

interface Props {
    søker: Søker;
    oppgaver: Oppgave[];
    tilgangsinfo: TilgjengeligSøknadResponse;
}

export const Innsyn = ({ søker, oppgaver, tilgangsinfo: tilgjengeligSøknad }: Props) => {
    const { text } = useAppIntl();

    /** Har innsyn, så viser vi standard innsyn-forside med undersider  */
    if (tilgjengeligSøknad.harInnsyn || getMaybeEnv('SIF_PUBLIC_IGNORE_TILGJENGELIG_SJEKK') === 'true') {
        return (
            <InnsynContextProvider søker={søker} oppgaver={oppgaver} refetchOppgaver={() => Promise.resolve()}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ForsidePage
                                oppgaver={oppgaver}
                                søker={søker}
                                harUbehandletSøknad={tilgjengeligSøknad.harUbehandletSøknad === true}
                            />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="oppgave" element={<Navigate to="/" replace={true} />} />
                    <Route path="oppgave/:oppgaveReferanse/:kvittering?" element={<OppgavePage />} />
                </Routes>
            </InnsynContextProvider>
        );
    }
    /** Har ikke innsyn, så dette betyr ubehandlet førstegangssøknad */
    if (tilgjengeligSøknad.harUbehandletSøknad) {
        return (
            <UngInnsynPage documentTitle={text('page.ubehandletSøknad.tittel')}>
                <VStack gap="space-40">
                    <InnsynForsideHeader title={text('page.ubehandletSøknad.tittel')} subtitle={formatName(søker)} />
                    <SøknadMottattInfo erFørstegangssøknad={true} />
                </VStack>
            </UngInnsynPage>
        );
    }
    /** Har ikke tilgang */
    return (
        <UngInnsynPage documentTitle={text('page.ikkeTilgang.tittel')}>
            <VStack gap="space-40">
                <SifGuidePanel poster={true}>
                    <Heading level="1" size="medium" spacing>
                        <AppText id="page.ikkeTilgang.heading" />
                    </Heading>
                    <VStack gap="space-16">
                        <BodyLong>
                            <AppText id="page.ikkeTilgang.info.1" />
                        </BodyLong>
                        <BodyLong>
                            <AppText
                                id="page.ikkeTilgang.info.2"
                                values={{
                                    Lenke: (chunks: React.ReactNode) => (
                                        <Link href="https://www.nav.no/aktivitetspenger">{chunks}</Link>
                                    ),
                                }}
                            />
                        </BodyLong>
                    </VStack>
                </SifGuidePanel>
            </VStack>
        </UngInnsynPage>
    );
};
