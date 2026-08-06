import { VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { FjernetPeriodeOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { FjernetPeriodeOppgavePanel } from './FjernetPeriodeOppgavePanel';

export const mockFjernetPeriodeOppgave: FjernetPeriodeOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_FJERNET_PERIODE,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

const besvartOppgave: FjernetPeriodeOppgave = {
    ...mockFjernetPeriodeOppgave,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const renderFjernetPeriodeAlleStater = () => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[mockFjernetPeriodeOppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">
            <FjernetPeriodeOppgavePanel oppgave={mockFjernetPeriodeOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Kvittering">
            <FjernetPeriodeOppgavePanel oppgave={mockFjernetPeriodeOppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
        </StoryBox>
        <StoryBox title="Besvart oppgave">
            <FjernetPeriodeOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Forside — løst oppgave">
            <OppgaverList visBeskrivelse={false} oppgaveStatusTagVariant="text" oppgaver={[{ ...mockFjernetPeriodeOppgave, status: OppgaveStatus.LØST }]} />
        </StoryBox>
    </VStack>
);
