import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { StønadGodtgjørelseSøknadsdata } from '../../types/søknadsdata/StønadGodtgjørelseSøknadsdata';
import { DateRange, YesOrNo } from '@navikt/sif-common-formik-ds/src';
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

    switch (stønadGodtgjørelse?.type) {
        case 'mottarIkke':
            return {
                stønadGodtgjørelse: {
                    mottarStønadGodtgjørelse: false,
                },
            };

        case 'mottarIHelePeroden':
            return {
                stønadGodtgjørelse: {
                    mottarStønadGodtgjørelse: true,
                    _mottarStønadGodtgjørelseIHelePeroden: true,
                    startdato: fraOgMed,
                    sluttdato: tilOgMed,
                },
            };

        case 'mottarIDelerAvPeroden':
            return {
                stønadGodtgjørelse: {
                    mottarStønadGodtgjørelse: true,
                    _mottarStønadGodtgjørelseIHelePeroden: false,

                    _starterUndeveis: stønadGodtgjørelse.starterUndeveis === YesOrNo.YES ? true : false,
                    startdato:
                        stønadGodtgjørelse.starterUndeveis === YesOrNo.YES ? stønadGodtgjørelse.startdato : fraOgMed,

                    _slutterUnderveis: stønadGodtgjørelse.slutterUnderveis === YesOrNo.YES ? true : false,
                    sluttdato:
                        stønadGodtgjørelse.slutterUnderveis === YesOrNo.YES ? stønadGodtgjørelse.sluttdato : tilOgMed,
                },
            };
    }
};
