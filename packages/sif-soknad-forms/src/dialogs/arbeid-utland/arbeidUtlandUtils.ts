import { datePickerUtils } from '@sif/rhf';
import { ArbeidUtland, ArbeidUtlandVariant } from '.';
import { ArbeidUtlandFormValues } from './ArbeidUtlandDialogForm';
import { countryIsMemberOfEøsOrEfta, dateToISODate, getCountryName, getYesOrNoFromBoolean, YesOrNo } from '@sif/utils';

const formValuesToArbeidUtland = (
    values: ArbeidUtlandFormValues,
    variant: ArbeidUtlandVariant,
    locale: string,
    arbeidsstedId?: string,
): ArbeidUtland => {
    const from = datePickerUtils.parseDatePickerValueToISODate(values.fom);
    const to = datePickerUtils.parseDatePickerValueToISODate(values.tom);

    if (!from || !to) {
        throw new Error('Invalid date values');
    }

    const jobbetIPerioden = variant === 'periodeMedJobb' || values.jobbetIPerioden === YesOrNo.YES;

    return {
        id: arbeidsstedId || crypto.randomUUID(),
        periode: { from, to },
        landkode: values.landkode,
        landnavn: getCountryName(values.landkode, locale),
        jobbetIPerioden,
        utenlandskNasjonalId:
            jobbetIPerioden && countryIsMemberOfEøsOrEfta(values.landkode) ? values.utenlandskNasjonalId : undefined,
    };
};

const arbeidUtlandToFormValues = (arbeidssted: ArbeidUtland): ArbeidUtlandFormValues => {
    return {
        fom: dateToISODate(arbeidssted.periode.from),
        tom: dateToISODate(arbeidssted.periode.to),
        landkode: arbeidssted.landkode,
        utenlandskNasjonalId: arbeidssted.utenlandskNasjonalId,
        jobbetIPerioden: getYesOrNoFromBoolean(arbeidssted.jobbetIPerioden),
    };
};

export const arbeidUtlandUtils = {
    formValuesToArbeidUtland,
    arbeidUtlandToFormValues,
};
