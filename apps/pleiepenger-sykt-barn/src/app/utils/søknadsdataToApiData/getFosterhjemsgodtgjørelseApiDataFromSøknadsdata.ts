import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import {
    FosterhjemsgodtgjørelseSøknadsdata,
    FosterhjemsgodtgjørelseType,
} from '../../types/søknadsdata/FosterhjemsgodtgjørelseSøknadsdata';

type FosterhjemsgodtgjørelseApiDataPart = Pick<SøknadApiData, 'fosterhjemsgodtgjørelse'>;

export const getFosterhjemsgodtgjørelseApiDataFromSøknadsdata = (
    fosterhjemsgodtgjørelse?: FosterhjemsgodtgjørelseSøknadsdata,
): FosterhjemsgodtgjørelseApiDataPart => {
    if (fosterhjemsgodtgjørelse === undefined) {
        throw Error('fosterhjemsgodtgjørelse undefined');
    }
    const { type } = fosterhjemsgodtgjørelse;
    switch (type) {
        case FosterhjemsgodtgjørelseType.mottarIkke:
            return {
                fosterhjemsgodtgjørelse: {
                    type,
                    mottarFosterhjemsgodtgjørelse: false,
                },
            };

        case FosterhjemsgodtgjørelseType.mottarFrikjøpt:
            return {
                fosterhjemsgodtgjørelse: {
                    type,
                    mottarFosterhjemsgodtgjørelse: true,
                    erFrikjøptFraJobb: true,
                    frikjøptBeskrivelse: fosterhjemsgodtgjørelse.frikjøptBeskrivelse,
                },
            };

        case FosterhjemsgodtgjørelseType.mottarIHelePerioden:
            return {
                fosterhjemsgodtgjørelse: {
                    type,
                    mottarFosterhjemsgodtgjørelse: true,
                    erFrikjøptFraJobb: false,
                    _mottarFosterhjemsgodtgjørelseIHelePerioden: true,
                },
            };

        case FosterhjemsgodtgjørelseType.mottarIDelerAvPerioden:
            return {
                fosterhjemsgodtgjørelse: {
                    type,
                    mottarFosterhjemsgodtgjørelse: true,
                    erFrikjøptFraJobb: false,
                    _mottarFosterhjemsgodtgjørelseIHelePerioden: false,
                    _starterUndeveis: fosterhjemsgodtgjørelse.starterUndeveis === YesOrNo.YES ? true : false,
                    startdato:
                        fosterhjemsgodtgjørelse.starterUndeveis === YesOrNo.YES
                            ? fosterhjemsgodtgjørelse.startdato
                            : undefined,

                    _slutterUnderveis: fosterhjemsgodtgjørelse.slutterUnderveis === YesOrNo.YES ? true : false,
                    sluttdato:
                        fosterhjemsgodtgjørelse.slutterUnderveis === YesOrNo.YES
                            ? fosterhjemsgodtgjørelse.sluttdato
                            : undefined,
                },
            };
    }
};
