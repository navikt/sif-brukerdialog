import { YesOrNo } from '@navikt/sif-common-core-ds';

import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { getFeatureToggles } from '../../../utils/featureToggleUtils';
import { harFrilansoppdrag } from '../../../utils/frilanserUtils';

export const skalSpørreOmNormalarbeidstidForIkkeFrilanser = (values: SøknadFormValues): boolean => {
    return (
        getFeatureToggles().visNormalarbeidstidForIkkeFrilanser &&
        harFrilansoppdrag(values.frilansoppdrag) &&
        values.omsorgsstønad.mottarOmsorgsstønad === YesOrNo.NO &&
        values.frilans.harHattInntektSomFrilanser === YesOrNo.NO
    );
};
