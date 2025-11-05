import { OppgaveDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import dayjs from 'dayjs';

import { dateToISODate } from '../utils/dateUtils';
import { getMockToday } from '../utils/mockDate';
import { deltakerBaseScenarioData } from './data/deltakerBaseScenarioData';
import { getMockOppgaver } from './data/oppgaver';
import { ScenarioData, ScenarioType } from './types';

export interface Scenario {
    name: string;
    type: ScenarioType;
    description?: string;
    data: ScenarioData;
}

const getMockDatoer = () => {
    const deltakelseFraOgMed = dayjs(getMockToday()).subtract(46, 'days').startOf('week');
    const søkDeltakelseFrist = deltakelseFraOgMed.add(3, 'months');

    return {
        deltakelseFraOgMed: deltakelseFraOgMed.toDate(),
        søkDeltakelseFrist: søkDeltakelseFrist.toDate(),
    };
};

const getSøknadDeltakelseData = (): ScenarioData => ({
    ...deltakerBaseScenarioData,
    deltakelser: [
        {
            id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
            fraOgMed: dateToISODate(getMockDatoer().deltakelseFraOgMed),
            tilOgMed: undefined,
            deltaker: {
                id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
                deltakerIdent: '234',
            },
            oppgaver: [getMockOppgaver().søkYtelseOppgave],
        },
    ],
});

const createSøktDeltakelse = (oppgaver: OppgaveDto[]): ScenarioData => ({
    ...deltakerBaseScenarioData,
    deltakelser: [
        {
            id: '8c21972b-f23d-4193-8851-b2fa6c6b2f63',
            fraOgMed: dateToISODate(getMockDatoer().deltakelseFraOgMed),
            tilOgMed: undefined,
            søktTidspunkt: dayjs(getMockDatoer().deltakelseFraOgMed).add(17, 'days').toDate().toISOString(),
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
            fraOgMed: dateToISODate(getMockDatoer().deltakelseFraOgMed),
            tilOgMed: dateToISODate(dayjs(getMockDatoer().deltakelseFraOgMed).add(6, 'months').toDate()),
            søktTidspunkt: dayjs(getMockDatoer().deltakelseFraOgMed).add(17, 'days').toDate().toISOString(),
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
            fraOgMed: dateToISODate(getMockDatoer().deltakelseFraOgMed),
            søktTidspunkt: dayjs(getMockDatoer().deltakelseFraOgMed).add(17, 'days').toDate().toISOString(),
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
        data: getSøknadDeltakelseData(),
    },
    [ScenarioType.søknadSendt]: {
        type: ScenarioType.søknadSendt,
        name: 'Søknad sendt',
        data: createSøktDeltakelse([getMockOppgaver().søkYtelseOppgaveLøst]),
    },
    [ScenarioType.endretStartdato]: {
        type: ScenarioType.endretStartdato,
        name: 'Oppgave med endret startdato',
        data: createSøktDeltakelse([getMockOppgaver().søkYtelseOppgaveLøst, getMockOppgaver().endretStartdatoOppgave]),
    },
    [ScenarioType.meldtUt]: {
        type: ScenarioType.meldtUt,
        name: 'Oppgave med hvor bruker er meldt ut',
        data: createSøktDeltakelse([
            getMockOppgaver().søkYtelseOppgaveLøst,
            getMockOppgaver().endretStartdatoOppgaveLøst,
            getMockOppgaver().meldtUtOppgave,
        ]),
    },
    [ScenarioType.endretSluttdato]: {
        type: ScenarioType.endretSluttdato,
        name: 'Oppgave med sluttdato er endret',
        data: createSøktDeltakelse([
            getMockOppgaver().søkYtelseOppgaveLøst,
            getMockOppgaver().endretStartdatoOppgaveLøst,
            getMockOppgaver().meldtUtOppgaveLøst,
            getMockOppgaver().endretSluttdatoOppgave,
        ]),
    },
    [ScenarioType.rapporterInntekt]: {
        type: ScenarioType.rapporterInntekt,
        name: 'Oppgave for å melde fra om inntekt',
        data: createSøktDeltakelse([getMockOppgaver().søkYtelseOppgaveLøst, getMockOppgaver().rapporterInntektOppgave]),
    },
    [ScenarioType.avvikInntekt]: {
        type: ScenarioType.avvikInntekt,
        name: 'Oppgave for å sjekke inntekt (avvik)',
        data: createSøktDeltakelse([
            getMockOppgaver().søkYtelseOppgaveLøst,
            getMockOppgaver().rapporterInntektOppgaveLøst,
            getMockOppgaver().bekreftAvvikOppgave,
        ]),
    },
    [ScenarioType.avvikInntektSisteMåned]: {
        type: ScenarioType.avvikInntektSisteMåned,
        name: 'Oppgave for å sjekke inntekt (avvik). Siste måned',
        data: createSøktDeltakelse([
            getMockOppgaver().søkYtelseOppgaveLøst,
            getMockOppgaver().rapporterInntektOppgaveLøst,
            getMockOppgaver().bekreftAvvikOppgaveSisteMåned,
        ]),
    },
    [ScenarioType.avsluttet]: {
        type: ScenarioType.avvikInntekt,
        name: 'Avsluttet deltakelse',
        data: createAvsluttetDeltakelse([
            getMockOppgaver().søkYtelseOppgaveLøst,
            getMockOppgaver().rapporterInntektOppgaveLøst,
            getMockOppgaver().bekreftAvvikOppgaveLøst,
        ]),
    },
    [ScenarioType.ikkeStartet]: {
        type: ScenarioType.ikkeStartet,
        name: 'Ikke startet deltakelse',
        data: createIkkeStartetDeltakelse([getMockOppgaver().søkYtelseOppgaveLøst]),
    },
};

export const defaultScenario = scenarioer[ScenarioType.søknad];

export const getScenarioMockData = (scenario: ScenarioType) => {
    return scenarioer[scenario].data;
};
