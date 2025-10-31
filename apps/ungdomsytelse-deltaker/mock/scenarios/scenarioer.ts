// import { dateToISODate } from '@navikt/sif-common-utils';
import { OppgaveDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';

import { dateToISODate } from '../utils/dateUtils';
import { deltakerBaseScenarioData } from './data/deltakerBaseScenarioData';
import { mockOppgaver } from './data/oppgaver';
import { ScenarioData, ScenarioType } from './types';

export interface Scenario {
    name: string;
    type: ScenarioType;
    description?: string;
    data: ScenarioData;
}

const søknadDeltakelseData: ScenarioData = {
    ...deltakerBaseScenarioData,
    deltakelser: [
        {
            id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
            fraOgMed: '2025-08-01',
            tilOgMed: undefined,
            deltaker: {
                id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
                deltakerIdent: '234',
            },
            oppgaver: [mockOppgaver.søkYtelseOppgave],
        },
    ],
};
const createSøktDeltakelse = (oppgaver: OppgaveDto[]): ScenarioData => ({
    ...deltakerBaseScenarioData,
    deltakelser: [
        {
            id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
            fraOgMed: '2025-08-01',
            tilOgMed: undefined,
            søktTidspunkt: '2025-08-03T05:05:01.714798Z',
            deltaker: {
                id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
                deltakerIdent: '234',
            },
            oppgaver,
        },
    ],
});
const createAvsluttetDeltakelse = (oppgaver: OppgaveDto[]): ScenarioData => ({
    ...deltakerBaseScenarioData,
    deltakelser: [
        {
            id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
            fraOgMed: '2025-08-01',
            tilOgMed: '2025-10-02',
            søktTidspunkt: '2025-08-03T05:05:01.714798Z',
            deltaker: {
                id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
                deltakerIdent: '234',
            },
            oppgaver,
        },
    ],
});
const createIkkeStartetDeltakelse = (oppgaver: OppgaveDto[]): ScenarioData => ({
    ...deltakerBaseScenarioData,
    deltakelser: [
        {
            id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
            fraOgMed: dateToISODate(dayjs().add(1, 'week').startOf('week').toDate()),

            søktTidspunkt: '2025-08-17T05:05:01.714798Z',
            deltaker: {
                id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
                deltakerIdent: '234',
            },
            oppgaver,
        },
    ],
});

export const scenarioer: Record<ScenarioType, Scenario> = {
    [ScenarioType.søknad]: {
        type: ScenarioType.søknad,
        name: 'Søknad',
        data: søknadDeltakelseData,
    },
    [ScenarioType.søknadSendt]: {
        type: ScenarioType.søknadSendt,
        name: 'Søknad sendt',
        data: createSøktDeltakelse([mockOppgaver.søkYtelseOppgaveLøst]),
    },
    [ScenarioType.endretStartdato]: {
        type: ScenarioType.endretStartdato,
        name: 'Oppgave med endret startdato',
        data: createSøktDeltakelse([mockOppgaver.søkYtelseOppgaveLøst, mockOppgaver.endretStartdatoOppgave]),
    },
    [ScenarioType.meldtUt]: {
        type: ScenarioType.meldtUt,
        name: 'Oppgave med hvor bruker er meldt ut',
        data: createSøktDeltakelse([
            mockOppgaver.søkYtelseOppgaveLøst,
            mockOppgaver.endretStartdatoOppgaveLøst,
            mockOppgaver.meldtUtOppgave,
        ]),
    },
    [ScenarioType.endretSluttdato]: {
        type: ScenarioType.endretSluttdato,
        name: 'Oppgave med sluttdato er endret',
        data: createSøktDeltakelse([
            mockOppgaver.søkYtelseOppgaveLøst,
            mockOppgaver.endretStartdatoOppgaveLøst,
            mockOppgaver.meldtUtOppgaveLøst,
            mockOppgaver.endretSluttdatoOppgave,
        ]),
    },
    [ScenarioType.rapporterInntekt]: {
        type: ScenarioType.rapporterInntekt,
        name: 'Oppgave for å melde fra om inntekt',
        data: createSøktDeltakelse([mockOppgaver.søkYtelseOppgaveLøst, mockOppgaver.rapporterInntektOppgave]),
    },
    [ScenarioType.avvikInntekt]: {
        type: ScenarioType.avvikInntekt,
        name: 'Oppgave for å sjekke inntekt (avvik)',
        data: createSøktDeltakelse([
            mockOppgaver.søkYtelseOppgaveLøst,
            mockOppgaver.rapporterInntektOppgaveLøst,
            mockOppgaver.bekreftAvvikOppgave,
        ]),
    },
    [ScenarioType.avvikInntektSisteMåned]: {
        type: ScenarioType.avvikInntektSisteMåned,
        name: 'Oppgave for å sjekke inntekt (avvik). Siste måned',
        data: createSøktDeltakelse([
            mockOppgaver.søkYtelseOppgaveLøst,
            mockOppgaver.rapporterInntektOppgaveLøst,
            mockOppgaver.bekreftAvvikOppgaveSisteMåned,
        ]),
    },
    [ScenarioType.avsluttet]: {
        type: ScenarioType.avvikInntekt,
        name: 'Avsluttet deltakelse',
        data: createAvsluttetDeltakelse([
            mockOppgaver.søkYtelseOppgaveLøst,
            mockOppgaver.rapporterInntektOppgaveLøst,
            mockOppgaver.bekreftAvvikOppgaveLøst,
        ]),
    },
    [ScenarioType.ikkeStartet]: {
        type: ScenarioType.ikkeStartet,
        name: 'Ikke startet deltakelse',
        data: createIkkeStartetDeltakelse([mockOppgaver.søkYtelseOppgaveLøst]),
    },
};

export const defaultScenario = scenarioer[ScenarioType.søknad];

export const getScenarioMockData = (scenario: ScenarioType) => {
    return scenarioer[scenario].data;
};
