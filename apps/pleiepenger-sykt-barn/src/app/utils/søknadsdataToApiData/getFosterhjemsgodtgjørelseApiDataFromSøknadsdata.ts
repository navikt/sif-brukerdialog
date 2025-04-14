import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { SøknadApiData } from '../../types/søknad-api-data/SøknadApiData';
import { FosterhjemsgodtgjørelseSøknadsdata } from '../../types/søknadsdata/FosterhjemsgodtgjørelseSøknadsdata';

type FosterhjemsgodtgjørelseApiData = Pick<SøknadApiData, 'fosterhjemsgodtgjørelse'>;

export const getFosterhjemsgodtgjørelseApiDataFromSøknadsdata = (
    fosterhjemsgodtgjørelse?: FosterhjemsgodtgjørelseSøknadsdata,
): FosterhjemsgodtgjørelseApiData => {
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

        case 'mottarMenIkkeFrikjøpt':
            return {
                fosterhjemsgodtgjørelse: {
                    mottarFosterhjemsgodtgjørelse: true,
                    erFrikjøptFraJobb: false,
                },
            };

        case 'mottarIHelePeroden':
            return {
                fosterhjemsgodtgjørelse: {
                    mottarFosterhjemsgodtgjørelse: true,
                    erFrikjøptFraJobb: true,
                    frikjøptArbeidsgiverNavn: fosterhjemsgodtgjørelse.frikjøptArbeidsgiverNavn,
                    _mottarFosterhjemsgodtgjørelseIHelePerioden: true,
                    antallTimer: fosterhjemsgodtgjørelse.frikjøptTimer,
                    prosent: fosterhjemsgodtgjørelse.frikjøptProsent,
                    timerEllerProsent: fosterhjemsgodtgjørelse.frikjøptTimerEllerProsent,
                },
            };

        case 'mottarIDelerAvPeroden':
            return {
                fosterhjemsgodtgjørelse: {
                    mottarFosterhjemsgodtgjørelse: true,
                    erFrikjøptFraJobb: true,
                    frikjøptArbeidsgiverNavn: fosterhjemsgodtgjørelse.frikjøptArbeidsgiverNavn,
                    _mottarFosterhjemsgodtgjørelseIHelePerioden: false,
                    antallTimer: fosterhjemsgodtgjørelse.frikjøptTimer,
                    prosent: fosterhjemsgodtgjørelse.frikjøptProsent,
                    timerEllerProsent: fosterhjemsgodtgjørelse.frikjøptTimerEllerProsent,
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
