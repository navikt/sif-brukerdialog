import { VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype, SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { SøkYtelseOppgavePanel } from './SokYtelseOppgavePanel';

export const mockSøkYtelseOppgave: SøkYtelseOppgave = {
    oppgaveReferanse: 'e632b20a-b0c9-4953-97ec-851ebd1a0e91',
    oppgavetype: OppgaveType.SØK_YTELSE,
    parsedOppgavetype: ParsedOppgavetype.SØK_YTELSE,
    oppgavetypeData: { fomDato: '2025-05-01' as ISODate },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs.utc('2025-05-31T03:58:01.779214Z').toDate(),
    frist: dateToISODate(dayjs.utc('2025-06-14T03:58:01.779214Z')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};

const besvartOppgave: SøkYtelseOppgave = {
    ...mockSøkYtelseOppgave,
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const renderSøkYtelseAlleStater = () => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[mockSøkYtelseOppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">
            <SøkYtelseOppgavePanel oppgave={mockSøkYtelseOppgave} dokumentarkivUrl="https://example.com/docs" />
        </StoryBox>
        <StoryBox title="Besvart oppgave">
            <SøkYtelseOppgavePanel oppgave={besvartOppgave} dokumentarkivUrl="https://example.com/docs" />
        </StoryBox>
        <StoryBox title="Forside — løst oppgave">
            <OppgaverList visBeskrivelse={false} oppgaveStatusTagVariant="text" oppgaver={[{ ...mockSøkYtelseOppgave, status: OppgaveStatus.LØST }]} />
        </StoryBox>
    </VStack>
);
