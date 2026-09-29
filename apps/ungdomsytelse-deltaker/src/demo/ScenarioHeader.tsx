import { getRequiredEnv } from '@navikt/sif-common-env';
import { ScenarioSelectorHeader, type ScenarioSelectorHeaderGroup } from '@sif/soknad-ui';
import { useNavigate } from 'react-router-dom';

import { scenarioer } from '../../mock/scenarios/scenarioer';
import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const scenarioGroups: Array<ScenarioSelectorHeaderGroup<ScenarioType>> = [
    {
        label: 'Ny deltaker/søknad sendt',
        options: [
            { value: ScenarioType.søknad, label: 'Søknadsskjema' },
            { value: ScenarioType.søknadSendt, label: 'Søknad sendt' },
        ],
    },
    {
        label: 'Oppgaver for registrert deltaker',
        options: [
            { value: ScenarioType.endretStartdato, label: 'Endret startdato' },
            { value: ScenarioType.meldtUt, label: 'Meldt ut' },
            { value: ScenarioType.endretSluttdato, label: 'Endret sluttdato' },
            { value: ScenarioType.rapporterInntekt, label: 'Rapportere inntekt månedlig' },
            {
                value: ScenarioType.rapporterInntektDelerAvMåned,
                label: 'Rapportere inntekt månedlig (deler av måned)',
            },
            { value: ScenarioType.avvikInntekt, label: 'Inntektskontroll - sjekke avvik i inntekt' },
            {
                value: ScenarioType.avvikInntektDelerAvMåned,
                label: 'Inntektskontroll - sjekke avvik i inntekt (deler av måned)',
            },
        ],
    },
    {
        label: 'Før og etter deltakelse',
        options: [
            { value: ScenarioType.ikkeStartet, label: 'Deltakelse ikke startet' },
            { value: ScenarioType.avsluttet, label: 'Deltakelse avsluttet' },
            { value: ScenarioType.avsluttetVedMaksdato, label: 'Deltakelse avsluttet ved maksdato' },
            { value: ScenarioType.opphørt, label: 'Deltakelse slettet' },
        ],
    },
    {
        label: 'Oppgaver under utvikling (ikke implementert)',
        options: [
            { value: ScenarioType.bekreftOpphørVedMaksdato, label: 'Opphør ved maksdato' },
            { value: ScenarioType.endretStartOgSluttdato, label: 'Endret start og sluttdato' },
            { value: ScenarioType.fjernetPeriode, label: 'Slettet påbegynt deltakelse' },
        ],
    },
];

export const ScenarioHeader = () => {
    const navigate = useNavigate();

    const setScenario = (type: ScenarioType) => {
        const scenario = scenarioer[type];
        if (scenario) {
            store.setScenario(type);
            navigate(getRequiredEnv('PUBLIC_PATH'));
            globalThis.location.reload();
        }
    };

    return (
        <ScenarioSelectorHeader
            isGitHubPages={__IS_GITHUB_PAGES__}
            title="Demo av deltakersider - ungdomsprogramytelsen"
            buttonLabel="Velg deltakerscenario"
            groups={scenarioGroups}
            activeScenario={store.getScenario()}
            onSelectScenario={setScenario}
        />
    );
};
