import { SøknadStepId } from '@app/types/SoknadStepId';

import { MockSteg } from './mock/MockSteg';
import { OmOmsorgenForBarnSteg } from './om-omsorgen-for-barn/OmOmsorgenForBarnSteg';
import { OppsummeringSteg } from './oppsummering/OppsummeringSteg';

export const TidspunktForAleneomsorgSteg = () => <MockSteg stepId={SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG} />;

export { OmOmsorgenForBarnSteg, OppsummeringSteg };
