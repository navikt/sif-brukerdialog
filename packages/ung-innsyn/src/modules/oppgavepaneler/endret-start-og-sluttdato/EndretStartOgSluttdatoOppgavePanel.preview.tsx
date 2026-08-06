import { VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { EndretStartOgSluttdatoOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { EndretStartOgSluttdatoOppgavePanel } from './EndretStartOgSluttdatoOppgavePanel';

export const mockEndretStartOgSluttdatoOppgave: EndretStartOgSluttdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_PERIODE,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO,
    oppgavetypeData: {
        forrigePeriode: { from: '2025-05-04' as ISODate },
        nyPeriode: { from: '2025-05-01' as ISODate, to: '2025-08-01' as ISODate },
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

const besvartOppgave: EndretStartOgSluttdatoOppgave = {
    ...mockEndretStartOgSluttdatoOppgave,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const renderEndretStartOgSluttdatoAlleStater = () => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[mockEndretStartOgSluttdatoOppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">
            <EndretStartOgSluttdatoOppgavePanel oppgave={mockEndretStartOgSluttdatoOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Kvittering">
            <EndretStartOgSluttdatoOppgavePanel oppgave={mockEndretStartOgSluttdatoOppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
        </StoryBox>
        <StoryBox title="Besvart oppgave">
            <EndretStartOgSluttdatoOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Forside — løst oppgave">
            <OppgaverList visBeskrivelse={false} oppgaveStatusTagVariant="text" oppgaver={[{ ...mockEndretStartOgSluttdatoOppgave, status: OppgaveStatus.LØST }]} />
        </StoryBox>
    </VStack>
);
