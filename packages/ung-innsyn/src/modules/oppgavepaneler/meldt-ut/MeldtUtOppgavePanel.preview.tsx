import { VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { MeldtUtOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { MeldtUtOppgavePanel } from './MeldtUtOppgavePanel';

export const mockMeldtUtOppgave: MeldtUtOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_MELDT_UT,
    oppgavetypeData: { sluttdato: '2025-05-01' as ISODate },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

const besvartOppgave: MeldtUtOppgave = {
    ...mockMeldtUtOppgave,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const renderMeldtUtAlleStater = () => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[mockMeldtUtOppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">
            <MeldtUtOppgavePanel oppgave={mockMeldtUtOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Kvittering">
            <MeldtUtOppgavePanel oppgave={mockMeldtUtOppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
        </StoryBox>
        <StoryBox title="Besvart oppgave">
            <MeldtUtOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Forside — løst oppgave">
            <OppgaverList visBeskrivelse={false} oppgaveStatusTagVariant="text" oppgaver={[{ ...mockMeldtUtOppgave, status: OppgaveStatus.LØST }]} />
        </StoryBox>
    </VStack>
);
