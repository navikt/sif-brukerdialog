import { BrukerdialogOppgaveDto } from '@navikt/ung-brukerdialog-api';

import { getMockOppgaver } from '../data/oppgaver';
import { scenarioBaseData } from '../data/scenarioBaseData';
import { ScenarioData, ScenarioType } from './types';

export interface Scenario {
    name: string;
    type: ScenarioType;
    description?: string;
    data: ScenarioData;
}

const createScenarioData = (oppgaver: BrukerdialogOppgaveDto[] = []): ScenarioData => ({
    ...scenarioBaseData,
    oppgaver,
});

export const scenarioer: Record<ScenarioType, Scenario> = {
    [ScenarioType.default]: {
        type: ScenarioType.default,
        name: 'Søknad sendt',
        data: createScenarioData([getMockOppgaver().søkYtelseOppgaveLøst]),
    },
    [ScenarioType.rapporterInntekt]: {
        type: ScenarioType.rapporterInntekt,
        name: 'Oppgave for å melde fra om inntekt',
        data: createScenarioData([getMockOppgaver().søkYtelseOppgaveLøst, getMockOppgaver().rapporterInntektOppgave]),
    },
    [ScenarioType.rapporterInntektDelerAvMåned]: {
        type: ScenarioType.rapporterInntektDelerAvMåned,
        name: 'Oppgave for å melde fra om inntekt (deler av måned)',
        data: createScenarioData([
            getMockOppgaver().søkYtelseOppgaveLøst,
            getMockOppgaver().rapporterInntektDelerAvMånedOppgave,
        ]),
    },
    [ScenarioType.avvikInntekt]: {
        type: ScenarioType.avvikInntekt,
        name: 'Oppgave for å sjekke inntekt (avvik)',
        data: createScenarioData([
            getMockOppgaver().søkYtelseOppgaveLøst,
            getMockOppgaver().rapporterInntektOppgaveLøst,
            getMockOppgaver().bekreftAvvikOppgave,
        ]),
    },
    [ScenarioType.avvikInntektDelerAvMåned]: {
        type: ScenarioType.avvikInntektDelerAvMåned,
        name: 'Oppgave for å sjekke inntekt (avvik - deler av måned)',
        data: createScenarioData([
            getMockOppgaver().søkYtelseOppgaveLøst,
            getMockOppgaver().rapporterInntektOppgaveLøst,
            getMockOppgaver().bekreftAvvikOppgaveDelerAvMÅned,
        ]),
    },
};

export const defaultScenario = scenarioer[ScenarioType.default];

export const getScenarioMockData = (scenario: ScenarioType) => {
    return scenarioer[scenario].data;
};
