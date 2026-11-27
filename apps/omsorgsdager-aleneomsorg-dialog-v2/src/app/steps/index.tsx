import { SøknadStepId } from '@app/types/SoknadStepId';

import { MockSteg } from './mock/MockSteg';
import { OppsummeringSteg } from './oppsummering/OppsummeringSteg';

export const OmOmsorgenForBarnSteg = () => <MockSteg stepId={SøknadStepId.OM_OMSORGEN_FOR_BARN} />;

export const TidspunktForAleneomsorgSteg = () => <MockSteg stepId={SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG} />;

export { OppsummeringSteg };
