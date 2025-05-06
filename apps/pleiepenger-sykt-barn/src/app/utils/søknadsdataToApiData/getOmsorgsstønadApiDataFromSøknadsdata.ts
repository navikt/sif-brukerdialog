import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';

import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { OmsorgsstønadSøknadsdata, OmsorgsstønadType } from '../../types/søknadsdata/OmsorgsstønadSøknadsdata';
import { decimalDurationToISODuration } from '@navikt/sif-common-utils';

type OmsorgsstønadApiData = Pick<SøknadApiData, 'omsorgsstønad'>;

export const getOmsorgsstønadApiDataFromSøknadsdata = (
    omsorgsstønad?: OmsorgsstønadSøknadsdata,
): OmsorgsstønadApiData => {
    if (omsorgsstønad === undefined) {
        throw Error('omsorgsstønad undefined');
    }
    const { type } = omsorgsstønad;
    switch (type) {
        case OmsorgsstønadType.mottarIkke:
            return {
                omsorgsstønad: { type, mottarOmsorgsstønad: false },
            };

        case OmsorgsstønadType.mottarIHelePerioden:
            return {
                omsorgsstønad: {
                    type,
                    mottarOmsorgsstønad: true,
                    antallTimerIUken: decimalDurationToISODuration(omsorgsstønad.antallTimer),
                    _mottarOmsorgsstønadIHelePeroden: true,
                },
            };

        case OmsorgsstønadType.mottarIDelerAvPerioden:
            return {
                omsorgsstønad: {
                    type,
                    mottarOmsorgsstønad: true,
                    antallTimerIUken: decimalDurationToISODuration(omsorgsstønad.antallTimer),
                    _mottarOmsorgsstønadIHelePeroden: false,

                    _starterUndeveis: omsorgsstønad.starterUndeveis === YesOrNo.YES ? true : false,
                    startdato: omsorgsstønad.starterUndeveis === YesOrNo.YES ? omsorgsstønad.startdato : undefined,

                    _slutterUnderveis: omsorgsstønad.slutterUnderveis === YesOrNo.YES ? true : false,
                    sluttdato: omsorgsstønad.slutterUnderveis === YesOrNo.YES ? omsorgsstønad.sluttdato : undefined,
                },
            };
    }
};
