import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { StønadGodtgjørelseSøknadsdata } from '../../types/søknadsdata/StønadGodtgjørelseSøknadsdata';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

type StønadGodtgjørelseApiData = Pick<SøknadApiData, 'omsorgsstønad'>;

export const getStønadGodtgjørelseApiDataFromSøknadsdata = (
    omsorgsstønad?: StønadGodtgjørelseSøknadsdata,
): StønadGodtgjørelseApiData => {
    if (omsorgsstønad === undefined) {
        throw Error('omsorgsstønad undefined');
    }
    switch (omsorgsstønad?.type) {
        case 'mottarIkke':
            return {
                omsorgsstønad: {
                    mottarOmsorgsstønad: false,
                },
            };

        case 'mottarIHelePeroden':
            return {
                omsorgsstønad: {
                    mottarOmsorgsstønad: true,
                    _mottarStønadGodtgjørelseIHelePeroden: true,
                },
            };

        case 'mottarIDelerAvPeroden':
            return {
                omsorgsstønad: {
                    mottarOmsorgsstønad: true,
                    _mottarStønadGodtgjørelseIHelePeroden: false,

                    _starterUndeveis: omsorgsstønad.starterUndeveis === YesOrNo.YES ? true : false,
                    startdato: omsorgsstønad.starterUndeveis === YesOrNo.YES ? omsorgsstønad.startdato : undefined,

                    _slutterUnderveis: omsorgsstønad.slutterUnderveis === YesOrNo.YES ? true : false,
                    sluttdato: omsorgsstønad.slutterUnderveis === YesOrNo.YES ? omsorgsstønad.sluttdato : undefined,
                },
            };
    }
};
