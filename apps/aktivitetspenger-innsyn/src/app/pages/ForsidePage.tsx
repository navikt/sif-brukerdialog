import { BodyLong, Heading, List, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { InnsynForsideHeader, OppgaverList } from '@sif/ung-innsyn/components';
import { UngInnsynPage } from '@sif/ung-innsyn/pages';

import { useInnsynBreadcrumbs } from '../hooks/useInnsynBreadcrumbs';
import { AppText } from '../i18n';
import { sortDateTimes } from '@sif/utils';
import { Oppgave } from '@sif/api/ung-brukerdialog';
import { Todo } from '@sif/soknad-ui';

interface Props {
    oppgaver: Oppgave[];
}

export const ForsidePage = ({ oppgaver }: Props) => {
    useInnsynBreadcrumbs();

    const uløsteOppgaver = oppgaver
        .filter((oppgave) => oppgave.status === OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDateTimes(o2.opprettetDato, o1.opprettetDato));

    const tidligereOppgaver = oppgaver
        .filter((oppgave) => oppgave.status !== OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDateTimes(o2.løstDato || o2.opprettetDato, o1.løstDato || o1.opprettetDato));

    return (
        <UngInnsynPage documentTitle="Dine aktivitetspenger">
            <VStack gap="space-40">
                <InnsynForsideHeader title="Dine aktivitetspenger" />
                <Todo>
                    <Heading level="2" size="small" spacing>
                        Hvilken informasjon skal være på denne siden.
                    </Heading>
                    <List>
                        <List.Item>Identifisere bruker</List.Item>
                        <List.Item>Informere om ubehandletsøknad (førstegangs og forlengelse)</List.Item>
                        <List.Item>Informere om en har eller ikke har aktivitetspenger</List.Item>
                        <List.Item>Informere om hva denne siden er/hva er oppgaver f.eks.</List.Item>
                        <List.Item>Informere om hvordan og når en kan/må søke om forlengelse?</List.Item>
                        <List.Item>Egen infoboks når en er innenfor vinduet for å søke forlengelse?</List.Item>
                        <List.Item>
                            Informasjon om aktivitetspenger - f.eks. footer som på innsyn for ungdomsprogramytelsen som
                            raskt forteller hva aktivitetspenger er + lenker til mer informasjon og spørsmål og svar.
                        </List.Item>
                    </List>
                </Todo>
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
    );
};
