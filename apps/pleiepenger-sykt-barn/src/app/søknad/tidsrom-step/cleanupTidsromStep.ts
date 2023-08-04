import { DateRange } from '@navikt/sif-common-utils/lib';
import { SøknadFormValues } from '../../types/SøknadFormValues';
import { søkerKunFortid, søkerKunFremtid } from '../../utils/søknadsperiodeUtils';

export const cleanupTidsromStep = (values: SøknadFormValues, søknadsperiode: DateRange): SøknadFormValues => {
    const cleanedValues = { ...values };

    if (cleanedValues.omsorgstilbud && søkerKunFortid(søknadsperiode)) {
        cleanedValues.omsorgstilbud.erIOmsorgstilbudFremtid = undefined;
        cleanedValues.omsorgstilbud.erLiktHverUke = undefined;
    }
    if (cleanedValues.omsorgstilbud && søkerKunFremtid(søknadsperiode)) {
        cleanedValues.omsorgstilbud.erIOmsorgstilbudFortid = undefined;
        cleanedValues.omsorgstilbud.erLiktHverUke = undefined;
    }
    return cleanedValues;
};
