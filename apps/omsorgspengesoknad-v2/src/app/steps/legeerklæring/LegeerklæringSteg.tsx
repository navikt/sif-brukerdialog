import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStep } from '@sif/soknad-app';

import { LegeerklæringForm } from './LegeerklæringForm';

export const LegeerklæringSteg = () => (
    <SøknadStep stepId={SøknadStepId.LEGEERKLÆRING}>
        <LegeerklæringForm />
    </SøknadStep>
);
