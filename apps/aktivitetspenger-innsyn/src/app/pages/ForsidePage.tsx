import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { sortDates } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { InnsynForsideHeader, InnsynPage, OppgaverList } from '@sif/ung-innsyn/components';

import { AppText } from '../i18n';

interface Props {
    oppgaver: any[];
}

export const ForsidePage = ({ oppgaver }: Props) => {
    const uløsteOppgaver = oppgaver
        .filter((oppgave) => oppgave.status === OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.opprettetDato, o1.opprettetDato));

    const tidligereOppgaver = oppgaver
        .filter((oppgave) => oppgave.status !== OppgaveStatus.ULØST)
        .sort((o1, o2) => sortDates(o2.løstDato || o2.opprettetDato, o1.løstDato || o1.opprettetDato));

    return (
        <InnsynPage documentTitle="Dine aktivitetspenger">
            <VStack gap="space-40">
                <InnsynForsideHeader title="Dine aktivitetspenger" />
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
        </InnsynPage>
    );
};
