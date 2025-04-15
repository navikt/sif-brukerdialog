import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { FosterhjemsgodtgjørelseSøknadsdata } from '../../types/søknadsdata/FosterhjemsgodtgjørelseSøknadsdata';

type FosterhjemsgodtgjørelseApiDataPart = Pick<SøknadApiData, 'fosterhjemsgodtgjørelse'>;

export const getFosterhjemsgodtgjørelseApiDataFromSøknadsdata = (
    fosterhjemsgodtgjørelse?: FosterhjemsgodtgjørelseSøknadsdata,
): FosterhjemsgodtgjørelseApiDataPart => {
    if (fosterhjemsgodtgjørelse === undefined) {
        throw Error('fosterhjemsgodtgjørelse undefined');
    }
    switch (fosterhjemsgodtgjørelse?.type) {
        case 'mottarIkke':
            return {
                fosterhjemsgodtgjørelse: {
                    mottarFosterhjemsgodtgjørelse: false,
                },
            };

        case 'mottarFrikjøpt':
            return {
                fosterhjemsgodtgjørelse: {
                    mottarFosterhjemsgodtgjørelse: true,
                    erFrikjøptFraJobb: true,
                    frikjøptBeskrivelse: fosterhjemsgodtgjørelse.frikjøptBeskrivelse,
                },
            };

        case 'mottarIHelePeroden':
            return {
                fosterhjemsgodtgjørelse: {
                    mottarFosterhjemsgodtgjørelse: true,
                    erFrikjøptFraJobb: false,
                    _mottarFosterhjemsgodtgjørelseIHelePerioden: true,
                },
            };

        case 'mottarIDelerAvPeroden':
            return {
                fosterhjemsgodtgjørelse: {
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
