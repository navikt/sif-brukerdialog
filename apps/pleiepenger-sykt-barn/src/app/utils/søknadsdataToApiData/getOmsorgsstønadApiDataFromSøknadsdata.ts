import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';

import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { OmsorgsstønadSøknadsdata } from '../../types/søknadsdata/OmsorgsstønadSøknadsdata';

type OmsorgsstønadApiData = Pick<SøknadApiData, 'omsorgsstønad'>;

export const getOmsorgsstønadApiDataFromSøknadsdata = (
    omsorgsstønad?: OmsorgsstønadSøknadsdata,
): OmsorgsstønadApiData => {
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
                    antallTimer: omsorgsstønad.antallTimer,
                    _mottarOmsorgsstønadIHelePeroden: true,
                },
            };

        case 'mottarIDelerAvPeroden':
            return {
                omsorgsstønad: {
                    mottarOmsorgsstønad: true,
                    antallTimer: omsorgsstønad.antallTimer,
                    _mottarOmsorgsstønadIHelePeroden: false,

                    _starterUndeveis: omsorgsstønad.starterUndeveis === YesOrNo.YES ? true : false,
                    startdato: omsorgsstønad.starterUndeveis === YesOrNo.YES ? omsorgsstønad.startdato : undefined,

                    _slutterUnderveis: omsorgsstønad.slutterUnderveis === YesOrNo.YES ? true : false,
                    sluttdato: omsorgsstønad.slutterUnderveis === YesOrNo.YES ? omsorgsstønad.sluttdato : undefined,
                },
            };
    }
};
