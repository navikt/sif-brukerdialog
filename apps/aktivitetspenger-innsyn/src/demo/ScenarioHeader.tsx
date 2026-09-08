import { getRequiredEnv } from '@navikt/sif-common-env';
import { ScenarioSelectorHeader, type ScenarioSelectorHeaderGroup } from '@sif/soknad-ui';
import { useNavigate } from 'react-router-dom';

import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const groups: Array<ScenarioSelectorHeaderGroup<ScenarioType>> = [
    {
        label: 'Tilgang',
        options: [
            {
                value: ScenarioType.harIkkeTilgang,
                label: 'Har ikke tilgang',
            },
            {
                value: ScenarioType.harUbehandletFørstegangssøknad,
                label: 'Førstegangssøknad under behandling',
            },
            {
                value: ScenarioType.innsynUtenOppgaver,
                label: 'Innsyn uten oppgaver (søknad behandlet)',
            },
            {
                value: ScenarioType.innsynMedOppgaver,
                label: 'Innsyn med oppgaver',
            },
            {
                value: ScenarioType.harUbehandletAndregangssøknad,
                label: 'Andregangssøknad under behandling',
            },
        ],
    },
    {
        label: 'Oppgaver',
        options: [
            {
                value: ScenarioType.rapporterInntekt,
                label: 'Rapportere inntekt månedlig',
            },
            {
                value: ScenarioType.rapporterInntektDelerAvMåned,
                label: 'Rapportere inntekt månedlig (deler av måned)',
            },
            {
                value: ScenarioType.avvikInntekt,
                label: 'Inntektskontroll - sjekke avvik i inntekt',
            },
            {
                value: ScenarioType.avvikInntektDelerAvMåned,
                label: 'Inntektskontroll - sjekke avvik i inntekt (deler av måned)',
            },
            {
                value: ScenarioType.bekreftBosted,
                label: 'Bekreft bosted',
            },
        ],
    },
];

const ScenarioHeader = () => {
    const navigate = useNavigate();

    if (!__IS_GITHUB_PAGES__ && !__IS_DEMO__) {
        return null;
    }

    const setScenario = (type: ScenarioType) => {
        store.setScenario(type);
        navigate(getRequiredEnv('PUBLIC_PATH'));
        globalThis.location.reload();
    };

    return (
        <ScenarioSelectorHeader
            title='Demo av "Dine aktivitetspenger"'
            groups={groups}
            activeScenario={store.getScenario()}
            onSelectScenario={setScenario}
        />
    );
};

export default ScenarioHeader;
