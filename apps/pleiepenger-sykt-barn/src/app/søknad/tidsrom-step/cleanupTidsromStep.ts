import { DateRange } from '@navikt/sif-common-utils';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { søkerKunFortid, søkerKunFremtid } from '../../utils/søknadsperiodeUtils';

export const cleanupTidsromStep = (values: SøknadFormValues, søknadsperiode: DateRange): SøknadFormValues => {
    const cleanedValues = { ...values };

    if (cleanedValues.omsorgstilbud && søkerKunFortid(søknadsperiode)) {
        cleanedValues.omsorgstilbud.erIOmsorgstilbudFremtid = undefined;
    }
    if (cleanedValues.omsorgstilbud && søkerKunFremtid(søknadsperiode)) {
        cleanedValues.omsorgstilbud.erIOmsorgstilbudFortid = undefined;
    }
    return cleanedValues;
};
