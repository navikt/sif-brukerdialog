import { VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { EndretSluttdatoOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { EndretSluttdatoOppgavePanel } from './EndretSluttdatoOppgavePanel';

export const mockEndretSluttdatoOppgave: EndretSluttdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_SLUTTDATO,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO,
    oppgavetypeData: { nySluttdato: '2025-05-01' as ISODate, forrigeSluttdato: '2025-04-01' as ISODate },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};

const besvartOppgave: EndretSluttdatoOppgave = {
    ...mockEndretSluttdatoOppgave,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const renderEndretSluttdatoAlleStater = () => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[mockEndretSluttdatoOppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">
            <EndretSluttdatoOppgavePanel oppgave={mockEndretSluttdatoOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Kvittering">
            <EndretSluttdatoOppgavePanel oppgave={mockEndretSluttdatoOppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
        </StoryBox>
        <StoryBox title="Besvart oppgave">
            <EndretSluttdatoOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Forside — løst oppgave">
            <OppgaverList visBeskrivelse={false} oppgaveStatusTagVariant="text" oppgaver={[{ ...mockEndretSluttdatoOppgave, status: OppgaveStatus.LØST }]} />
        </StoryBox>
    </VStack>
);
