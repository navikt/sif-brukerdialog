import './demo.css';

import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { ScenarioSelectorHeader } from '@sif/soknad-ui';

import { isGitHubPages } from '../../utils/isGitHubPages';

/**
 * Demo-header for gh-pages. Har foreløpig ingen scenarioer å velge mellom,
 * kun lenke tilbake til forsiden på gh-pages. Scenariogrupper legges til her
 * når appen får støtte for å bytte mellom ulike demo-scenarioer.
 */
const ScenarioHeader = () => (
    <ScenarioSelectorHeader isGitHubPages={isGitHubPages()} title={`Demo - ${EndringsmeldingPsbApp.tittel.nb}`} />
);

export default ScenarioHeader;
