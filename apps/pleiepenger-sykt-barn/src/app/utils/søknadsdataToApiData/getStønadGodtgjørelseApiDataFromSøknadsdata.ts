import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { MottarStønadGodtgjørelseVariant } from '../../types/søknad-form-values/StønadGodtgjørelseFormValues';
import { StønadGodtgjørelseSøknadsdata } from '../../types/søknadsdata/StønadGodtgjørelseSøknadsdata';
import { DateRange } from '@navikt/sif-common-formik-ds/src';
import { dateToISODate } from '@navikt/sif-common-utils';

type StønadGodtgjørelseApiData = Pick<SøknadApiData, 'stønadGodtgjørelse'>;

export const getStønadGodtgjørelseApiDataFromSøknadsdata = (
    søknadsperiode: DateRange,
    stønadGodtgjørelse?: StønadGodtgjørelseSøknadsdata,
): StønadGodtgjørelseApiData => {
    if (stønadGodtgjørelse === undefined) {
        throw Error('stønadGodtgjørelse undefined');
    }
    const fraOgMed = dateToISODate(søknadsperiode.from);
    const tilOgMed = dateToISODate(søknadsperiode.to);

    if (stønadGodtgjørelse.mottarStønadGodtgjørelse === false) {
        return {
            stønadGodtgjørelse: {
                mottarStønadGodtgjørelse: false,
            },
        };
    }

    switch (stønadGodtgjørelse.mottarStønadGodtgjørelseVariant) {
        case MottarStønadGodtgjørelseVariant.somVanlig:
            return {
                stønadGodtgjørelse: {
                    mottarStønadGodtgjørelse: true,
                    startdato: fraOgMed,
                    sluttdato: tilOgMed,
                },
            };
        case MottarStønadGodtgjørelseVariant.starterIPerioden:
            return {
                stønadGodtgjørelse: {
                    mottarStønadGodtgjørelse: true,
                    startdato: stønadGodtgjørelse.startdato,
                    sluttdato: tilOgMed,
                    _variant: stønadGodtgjørelse.mottarStønadGodtgjørelseVariant,
                },
            };
        case MottarStønadGodtgjørelseVariant.slutterIPerioden:
            return {
                stønadGodtgjørelse: {
                    mottarStønadGodtgjørelse: true,
                    startdato: fraOgMed,
                    sluttdato: stønadGodtgjørelse.sluttdato,
                    _variant: stønadGodtgjørelse.mottarStønadGodtgjørelseVariant,
                },
            };
        case MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden:
            return {
                stønadGodtgjørelse: {
                    mottarStønadGodtgjørelse: true,
                    startdato: stønadGodtgjørelse.startdato,
                    sluttdato: stønadGodtgjørelse.sluttdato,
                    _variant: stønadGodtgjørelse.mottarStønadGodtgjørelseVariant,
                },
            };
    }
};
