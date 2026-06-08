import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { LegeerklæringForm } from './LegeerklæringForm';

export const LegeerklæringSteg = () => (
    <SøknadStep stepId={SøknadStepId.LEGEERKLÆRING}>
        <LegeerklæringForm />
    </SøknadStep>
);
