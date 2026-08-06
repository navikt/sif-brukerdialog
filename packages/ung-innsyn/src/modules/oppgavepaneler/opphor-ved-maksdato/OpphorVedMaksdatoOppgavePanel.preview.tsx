import { VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { OpphorVedMaksdatoOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { OpphorVedMaksdatoOppgavePanel } from './OpphorVedMaksdatoOppgavePanel';

export const mockOpphorVedMaksdatoOppgave: OpphorVedMaksdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO,
    oppgavetypeData: { maksdato: '2025-05-01' as ISODate, sluttdato: '2025-05-01' as ISODate },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

const besvartOppgave: OpphorVedMaksdatoOppgave = {
    ...mockOpphorVedMaksdatoOppgave,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const renderOpphorVedMaksdatoAlleStater = () => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[mockOpphorVedMaksdatoOppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">
            <OpphorVedMaksdatoOppgavePanel oppgave={mockOpphorVedMaksdatoOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Kvittering">
            <OpphorVedMaksdatoOppgavePanel oppgave={mockOpphorVedMaksdatoOppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
        </StoryBox>
        <StoryBox title="Besvart oppgave">
            <OpphorVedMaksdatoOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Forside — løst oppgave">
            <OppgaverList visBeskrivelse={false} oppgaveStatusTagVariant="text" oppgaver={[{ ...mockOpphorVedMaksdatoOppgave, status: OppgaveStatus.LØST }]} />
        </StoryBox>
    </VStack>
);
