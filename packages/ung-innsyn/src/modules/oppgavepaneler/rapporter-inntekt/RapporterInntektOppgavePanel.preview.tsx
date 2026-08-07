import { VStack } from '@navikt/ds-react';
import { OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { ParsedOppgavetype, RapporterInntektOppgave } from '@sif/api/ung-brukerdialog';
import { dateToISODate, ISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { RapporterInntektOppgavePanel } from './RapporterInntektOppgavePanel';

export const mockRapporterInntektOppgave: RapporterInntektOppgave = {
    oppgaveYtelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.RAPPORTER_INNTEKT,
    parsedOppgavetype: ParsedOppgavetype.RAPPORTER_INNTEKT,
    oppgavetypeData: { fraOgMed: '2025-05-01' as ISODate, tilOgMed: '2025-05-31' as ISODate, gjelderDelerAvMåned: false },
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs('2025-06-01').toDate(),
    frist: dateToISODate(dayjs('2025-06-06').startOf('day')),
    ytelsetype: OppgaveYtelsetype.UNGDOMSYTELSE,
};

export const mockRapporterInntektOppgaveAKT: RapporterInntektOppgave = {
    ...mockRapporterInntektOppgave,
    oppgaveYtelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
};

const renderAlleStater = (oppgave: RapporterInntektOppgave) => {
    const besvart: RapporterInntektOppgave = {
        ...oppgave,
        respons: {
            type: 'RAPPORTERT_INNTEKT',
            fraOgMed: '2025-05-01' as ISODate,
            tilOgMed: '2025-05-31' as ISODate,
            arbeidstakerOgFrilansInntekt: 10000,
        },
        status: OppgaveStatus.LØST,
        løstDato: dayjs().subtract(1, 'days').toDate(),
    };
    return (
        <VStack gap="space-24">
            <StoryBox title="Forside — uløst">
                <OppgaverList oppgaver={[oppgave]} />
            </StoryBox>
            <StoryBox title="Ubesvart oppgave">
                <RapporterInntektOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" />
            </StoryBox>
            <StoryBox title="Kvittering — har inntekt">
                <RapporterInntektOppgavePanel oppgave={besvart} navn="SNODIG VAFFEL" initialKvitteringData={{ harHattInntektOver0: true }} />
            </StoryBox>
            <StoryBox title="Besvart oppgave">
                <RapporterInntektOppgavePanel oppgave={besvart} navn="SNODIG VAFFEL" />
            </StoryBox>
            <StoryBox title="Forside — løst oppgave">
                <OppgaverList visBeskrivelse={false} oppgaveStatusTagVariant="text" oppgaver={[{ ...oppgave, status: OppgaveStatus.LØST }]} />
            </StoryBox>
        </VStack>
    );
};

export const renderRapporterInntektAlleStater = () => renderAlleStater(mockRapporterInntektOppgave);
export const renderRapporterInntektAKTAlleStater = () => renderAlleStater(mockRapporterInntektOppgaveAKT);
