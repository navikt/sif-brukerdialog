import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import { sortDates } from '@navikt/sif-common-utils';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';

import { AppText } from '../i18n';
import ForsideHeader from '../ung-ui/components/forside-header/ForsideHeader';
import InnsynForsidePage from '../ung-ui/components/innsyn-forside/InnsynForsideLayout';
import OppgaverList from '../ung-ui/components/oppgaver-list/OppgaverList';

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
        <InnsynForsidePage documentTitle="Dine aktivitetspenger">
            <ForsideHeader title="Dine aktivitetspenger" />
            <VStack gap="space-40">
                <VStack gap="space-16">
                    <Heading level="2" size="medium">
                        <AppText id="@ung-ui.dineOppgaver" />
                    </Heading>

                    {uløsteOppgaver.length > 0 ? (
                        <OppgaverList oppgaver={uløsteOppgaver} />
                    ) : (
                        <BodyLong>
                            <AppText id="@ung-ui.ingenUløsteOppgaver" />
                        </BodyLong>
                    )}
                </VStack>
                <VStack gap="space-16">
                    <Heading level="2" size="medium">
                        <AppText id="@ung-ui.tidligereOppgaver" />
                    </Heading>
                    {tidligereOppgaver.length > 0 ? (
                        <OppgaverList
                            oppgaver={tidligereOppgaver}
                            oppgaveStatusTagVariant="text"
                            visBeskrivelse={false}
                        />
                    ) : (
                        <BodyLong>
                            <AppText id="@ung-ui.ingenTidligereOppgaver" />
                        </BodyLong>
                    )}
                </VStack>
            </VStack>
        </InnsynForsidePage>
    );
};
