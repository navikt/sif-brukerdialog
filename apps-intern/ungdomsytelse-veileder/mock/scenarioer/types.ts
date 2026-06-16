import { DeltakelseDto, DeltakelseHistorikkDto, DeltakerPersonalia } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import type { DeltakelseHandlinger } from '../../src/utils/deltakelseUtils';

export type ScenarioGruppe = 'grunnscenarioer' | 'handlinger' | 'tilgangsbegrensning';

export interface MockScenario {
    fnr: string;
    beskrivelse: string;
    gruppe: ScenarioGruppe;
    skjultPåGithubPages?: boolean;
    /** Forventede handlinger — til dokumentasjon og verifisering */
    forventedeHandlinger?: Partial<DeltakelseHandlinger>;
    deltakerPersonalia?: DeltakerPersonalia;
    deltakelse?: DeltakelseDto;
    historikk?: DeltakelseHistorikkDto[];
}
