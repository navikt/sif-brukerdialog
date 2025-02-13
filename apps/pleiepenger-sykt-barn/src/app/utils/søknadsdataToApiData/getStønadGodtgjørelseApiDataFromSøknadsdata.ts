import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { StønadGodtgjørelseSøknadsdata } from '../../types/søknadsdata/StønadGodtgjørelseSøknadsdata';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

type StønadGodtgjørelseApiData = Pick<SøknadApiData, 'stønadGodtgjørelse'>;

export const getStønadGodtgjørelseApiDataFromSøknadsdata = (
    stønadGodtgjørelse?: StønadGodtgjørelseSøknadsdata,
): StønadGodtgjørelseApiData => {
    if (stønadGodtgjørelse === undefined) {
        throw Error('stønadGodtgjørelse undefined');
    }
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
                },
            };

        case 'mottarIDelerAvPeroden':
            return {
                stønadGodtgjørelse: {
                    mottarStønadGodtgjørelse: true,
                    _mottarStønadGodtgjørelseIHelePeroden: false,

                    _starterUndeveis: stønadGodtgjørelse.starterUndeveis === YesOrNo.YES ? true : false,
                    startdato:
                        stønadGodtgjørelse.starterUndeveis === YesOrNo.YES ? stønadGodtgjørelse.startdato : undefined,

                    _slutterUnderveis: stønadGodtgjørelse.slutterUnderveis === YesOrNo.YES ? true : false,
                    sluttdato:
                        stønadGodtgjørelse.slutterUnderveis === YesOrNo.YES ? stønadGodtgjørelse.sluttdato : undefined,
                },
            };
    }
};
