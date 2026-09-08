import { BrukerdialogOppgaveDto, TilgjengeligSøknadType } from '@navikt/ung-brukerdialog-api';

import { getMockOppgaver } from '../data/oppgaver';
import { scenarioBaseData } from '../data/scenarioBaseData';
import { ScenarioData, ScenarioType } from './types';

export interface Scenario {
    name: string;
    type: ScenarioType;
    description?: string;
    data: ScenarioData;
}

const harInnsyn = {
    harInnsyn: true,
    harUbehandletSøknad: false,
    type: TilgjengeligSøknadType.INGEN,
} satisfies ScenarioData['tilgangsinfo'];

const harUbehandletFørstegangsøknad = {
    harInnsyn: false,
    harUbehandletSøknad: true,
    type: TilgjengeligSøknadType.INGEN,
} satisfies ScenarioData['tilgangsinfo'];

const harUbehandletAndregangssøknad = {
    harInnsyn: true,
    harUbehandletSøknad: true,
    type: TilgjengeligSøknadType.INGEN,
} satisfies ScenarioData['tilgangsinfo'];

const harIkkeTilgang = {
    harInnsyn: false,
    harUbehandletSøknad: false,
    type: TilgjengeligSøknadType.INGEN,
} satisfies ScenarioData['tilgangsinfo'];

const createScenarioData = (
    oppgaver: BrukerdialogOppgaveDto[] = [],
    tilgjengeligSøknad: ScenarioData['tilgangsinfo'] = harInnsyn,
): ScenarioData => ({
    ...scenarioBaseData,
    oppgaver,
    tilgangsinfo: tilgjengeligSøknad,
});

export const scenarioer: Record<ScenarioType, Scenario> = {
    [ScenarioType.default]: {
        type: ScenarioType.default,
        name: 'Søknad sendt',
        data: createScenarioData([]),
    },
    [ScenarioType.harUbehandletAndregangssøknad]: {
        type: ScenarioType.harUbehandletAndregangssøknad,
        name: 'Søknaden er under behandling (andregang)',
        data: createScenarioData([], harUbehandletAndregangssøknad),
    },
    [ScenarioType.harInnsyn]: {
        type: ScenarioType.harInnsyn,
        name: 'Har innsyn',
        data: createScenarioData([], harInnsyn),
    },
    [ScenarioType.harUbehandletFørstegangssøknad]: {
        type: ScenarioType.harUbehandletFørstegangssøknad,
        name: 'Søknaden er under behandling',
        data: createScenarioData([], harUbehandletFørstegangsøknad),
    },
    [ScenarioType.harIkkeTilgang]: {
        type: ScenarioType.harIkkeTilgang,
        name: 'Ikke tilgang',
        data: createScenarioData([], harIkkeTilgang),
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
