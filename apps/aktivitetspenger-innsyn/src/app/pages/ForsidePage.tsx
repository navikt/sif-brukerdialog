import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { Søker } from '@sif/api/k9-prosessering';
import { Oppgave } from '@sif/api/ung-brukerdialog';
import { InnsynForsideHeader, OppgaverList } from '@sif/ung-innsyn/components';
import { UngInnsynPage } from '@sif/ung-innsyn/pages';
import { formatName, sortDateTimes } from '@sif/utils';

import { InnsynFooter } from '../components/innsyn-footer/InnsynFooter';
import { SøknadMottattInfo } from '../components/soknad-mottatt-info/SoknadMottattInfo';
import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { AppText, useAppIntl } from '../i18n';

interface Props {
    oppgaver: Oppgave[];
    søker: Søker;

    harUbehandletSøknad: boolean;
}

export const ForsidePage = ({ oppgaver, søker, harUbehandletSøknad }: Props) => {
    useInnsynBreadcrumbs();
    const { text } = useAppIntl();

    const uløsteOppgaver = oppgaver
        .filter((oppgave) => oppgave.status === OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDateTimes(o2.opprettetDato, o1.opprettetDato));

    const tidligereOppgaver = oppgaver
        .filter((oppgave) => oppgave.status !== OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDateTimes(o2.løstDato || o2.opprettetDato, o1.løstDato || o1.opprettetDato));

    return (
        <VStack gap="space-24">
            <UngInnsynPage documentTitle={text('page.forside.tittel')}>
                <VStack gap="space-40">
                    <InnsynForsideHeader title={text('page.forside.tittel')} subtitle={formatName(søker)} />

                    {harUbehandletSøknad && <SøknadMottattInfo />}

                    <VStack gap="space-40">
                        <VStack gap="space-16">
                            <Heading level="2" size="medium">
                                <AppText id="dineOppgaver" />
                            </Heading>

                            {uløsteOppgaver.length > 0 ? (
                                <OppgaverList oppgaver={uløsteOppgaver} />
                            ) : (
                                <BodyLong>
                                    <AppText id="ingenUløsteOppgaver" />
                                </BodyLong>
                            )}
                        </VStack>
                        <VStack gap="space-16">
                            <Heading level="2" size="medium">
                                <AppText id="tidligereOppgaver" />
                            </Heading>
                            {tidligereOppgaver.length > 0 ? (
                                <OppgaverList
                                    oppgaver={tidligereOppgaver}
                                    oppgaveStatusTagVariant="text"
                                    visBeskrivelse={false}
                                />
                            ) : (
                                <BodyLong>
                                    <AppText id="ingenTidligereOppgaver" />
                                </BodyLong>
                            )}
                        </VStack>
                    </VStack>
                </VStack>
            </UngInnsynPage>
            <InnsynFooter />
        </VStack>
    );
};
