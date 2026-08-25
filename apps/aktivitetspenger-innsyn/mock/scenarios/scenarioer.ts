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
        data: createScenarioData([]),
    },
    [ScenarioType.rapporterInntekt]: {
        type: ScenarioType.rapporterInntekt,
        name: 'Oppgave for å melde fra om inntekt',
        data: createScenarioData([getMockOppgaver().rapporterInntektOppgave]),
    },
    [ScenarioType.rapporterInntektDelerAvMåned]: {
        type: ScenarioType.rapporterInntektDelerAvMåned,
        name: 'Oppgave for å melde fra om inntekt (deler av måned)',
        data: createScenarioData([getMockOppgaver().rapporterInntektDelerAvMånedOppgave]),
    },
    [ScenarioType.avvikInntekt]: {
        type: ScenarioType.avvikInntekt,
        name: 'Oppgave for å sjekke inntekt (avvik)',
        data: createScenarioData([
            getMockOppgaver().rapporterInntektOppgaveLøst,
            getMockOppgaver().bekreftAvvikOppgave,
        ]),
    },
    [ScenarioType.avvikInntektDelerAvMåned]: {
        type: ScenarioType.avvikInntektDelerAvMåned,
        name: 'Oppgave for å sjekke inntekt (avvik - deler av måned)',
        data: createScenarioData([
            getMockOppgaver().rapporterInntektOppgaveLøst,
            getMockOppgaver().bekreftAvvikOppgaveDelerAvMÅned,
        ]),
    },
    [ScenarioType.bekreftBosted]: {
        type: ScenarioType.bekreftBosted,
        name: 'Oppgave for å bekrefte bosted',
        data: createScenarioData([getMockOppgaver().bekreftBostedOppgave]),
    },
};

export const defaultScenario = scenarioer[ScenarioType.default];

export const getScenarioMockData = (scenario: ScenarioType) => {
    return scenarioer[scenario].data;
};
