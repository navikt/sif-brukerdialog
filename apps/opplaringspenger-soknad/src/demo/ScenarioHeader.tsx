import { OpplæringspengerApp } from '@navikt/sif-app-register';
import { ScenarioSelectorHeader } from '@sif/soknad-ui';


/**
 * Har foreløpig ingen scenarioer å velge mellom. Scenariogrupper legges til her
 * når appen får støtte for å bytte mellom ulike demo-scenarioer.
 */
export const ScenarioHeader = () => (
    <ScenarioSelectorHeader isGitHubPages={__IS_GITHUB_PAGES__} appTitle={OpplæringspengerApp.tittel.nb} />
);
