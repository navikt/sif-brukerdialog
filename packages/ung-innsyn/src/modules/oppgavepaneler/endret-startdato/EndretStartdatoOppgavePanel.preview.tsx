import { VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { EndretStartdatoOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { EndretStartdatoOppgavePanel } from './EndretStartdatoOppgavePanel';

export const mockEndretStartdatoOppgave: EndretStartdatoOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_ENDRET_STARTDATO,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO,
    oppgavetypeData: {
        nyStartdato: '2025-05-01' as ISODate,
        forrigeStartdato: '2025-05-05' as ISODate,
    },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};

const besvartOppgave: EndretStartdatoOppgave = {
    ...mockEndretStartdatoOppgave,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const renderEndretStartdatoAlleStater = () => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[mockEndretStartdatoOppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">
            <EndretStartdatoOppgavePanel oppgave={mockEndretStartdatoOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Kvittering">
            <EndretStartdatoOppgavePanel oppgave={mockEndretStartdatoOppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
        </StoryBox>
        <StoryBox title="Besvart oppgave">
            <EndretStartdatoOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Forside — løst oppgave">
            <OppgaverList
                visBeskrivelse={false}
                oppgaveStatusTagVariant="text"
                oppgaver={[{ ...mockEndretStartdatoOppgave, status: OppgaveStatus.LØST }]}
            />
        </StoryBox>
    </VStack>
);
