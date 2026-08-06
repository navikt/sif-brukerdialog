import { VStack } from '@navikt/ds-react';
import { BostedsvilkårIkkeOppfyltÅrsak, OppgaveStatus, OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOpphørOppgave, ParsedOppgavetype } from '@sif/api/ung-brukerdialog';
import { dateToISODate } from '@sif/utils';
import dayjs from 'dayjs';

import { OppgaverList } from '../../../components';
import { StoryBox } from '../../../storybook/storyUtils';
import { BostedVilkårOpphørOppgavePanel } from './BostedVilkarOpphorOppgavePanel';

export const mockBostedVilkårOpphørOppgave: BostedVilkårOpphørOppgave = {
    oppgaveReferanse: '3d3e98b5-48e7-42c6-9fc1-e0f78022307f',
    oppgavetype: OppgaveType.BEKREFT_BOSTED,
    parsedOppgavetype: ParsedOppgavetype.BEKREFT_BOSTED_OPPHØR,
    status: OppgaveStatus.ULØST,
    opprettetDato: dayjs().subtract(1, 'days').toDate(),
    frist: dateToISODate(dayjs().add(14, 'days')),
    ytelsetype: OppgaveYtelsetype.AKTIVITETSPENGER,
    oppgavetypeData: {
        ikkeOppfyltÅrsak: BostedsvilkårIkkeOppfyltÅrsak.ANNET,
        ikkeOppfyltÅrsakFritekstbeskrivelse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        erBosattITrondheim: false,
        fom: dateToISODate(dayjs().subtract(1, 'month')),
    },
};

const besvartOppgave: BostedVilkårOpphørOppgave = {
    ...mockBostedVilkårOpphørOppgave,
    respons: { type: 'VARSEL_SVAR', harUttalelse: false },
    status: OppgaveStatus.LØST,
    løstDato: dayjs().toDate(),
};

export const renderBostedVilkårOpphørAlleStater = () => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[mockBostedVilkårOpphørOppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">
            <BostedVilkårOpphørOppgavePanel oppgave={mockBostedVilkårOpphørOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Kvittering">
            <BostedVilkårOpphørOppgavePanel oppgave={mockBostedVilkårOpphørOppgave} navn="SNODIG VAFFEL" initialVisKvittering={true} />
        </StoryBox>
        <StoryBox title="Besvart oppgave">
            <BostedVilkårOpphørOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Forside — løst oppgave">
            <OppgaverList visBeskrivelse={false} oppgaveStatusTagVariant="text" oppgaver={[{ ...mockBostedVilkårOpphørOppgave, status: OppgaveStatus.LØST }]} />
        </StoryBox>
    </VStack>
);
