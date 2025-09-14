import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import {
    ArbeidstidApiData,
    LovbestemtFerieApiData,
    LovbestemtFeriePeriode,
    Sak,
    SøknadApiData,
    Søknadsdata,
    ValgteEndringer,
} from '@types';

import { oppsummeringStepUtils } from '../søknad/steps/oppsummering/oppsummeringStepUtils';

interface UkjentArbeidsforholdMetadata {
    antallUkjentArbeidsforhold: number;
    antallUkjentAnsatt?: number;
    antallUkjentIkkeAnsatt?: number;
}
interface ArbeidstidMetadata {
    endretArbeidstid?: boolean;
    harEndretFrilans?: boolean;
    harOmsorgsstønad?: boolean;
}

interface ArbeidsgiverIkkeIAaregMetadata {
    antallArbeidsgivereIkkeIAareg: number;
}

interface LovbestemtFerieMetadata {
    endretFerie?: boolean;
    lagtTilFerie?: boolean;
    fjernetFerie?: boolean;
}

export type SøknadApiDataMetadata = {
    antallAktiviteterSomKanEndres: number;
} & LovbestemtFerieMetadata &
    ArbeidstidMetadata &
    UkjentArbeidsforholdMetadata &
    ArbeidsgiverIkkeIAaregMetadata & {
        valgtEndreArbeidstid: boolean;
        valgtEndreFerie: boolean;
    };

const getArbeidstidMetadata = (arbeidstid?: ArbeidstidApiData): ArbeidstidMetadata | undefined => {
    return arbeidstid
        ? {
              endretArbeidstid: oppsummeringStepUtils.harEndringerIArbeidstid(arbeidstid),
          }
        : {
              endretArbeidstid: false,
          };
};

const getUkjentArbeidsforholdMetadata = (søknadsdata: Søknadsdata): UkjentArbeidsforholdMetadata => {
    const ukjentArbeidsforhold = søknadsdata.ukjentArbeidsforhold?.arbeidsforhold || [];
    return {
        antallUkjentArbeidsforhold: ukjentArbeidsforhold.length,
        antallUkjentAnsatt: ukjentArbeidsforhold.filter((a) => a.erAnsatt).length,
        antallUkjentIkkeAnsatt: ukjentArbeidsforhold.filter((a) => a.erAnsatt === false).length,
    };
};

const getFerieMetadata = (lovbestemtFerie?: LovbestemtFerieApiData): LovbestemtFerieMetadata | undefined => {
    if (!lovbestemtFerie) {
        return {
            endretFerie: false,
            lagtTilFerie: false,
            fjernetFerie: false,
        };
    }
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return {
        endretFerie: oppsummeringStepUtils.harEndringerILovbestemtFerieApiData(lovbestemtFerie),
        lagtTilFerie: perioderLagtTil.length > 0,
        fjernetFerie: perioderFjernet.length > 0,
    };
};

const getArbeidsgiverIkkeIAaregMetadata = (sak: Sak): ArbeidsgiverIkkeIAaregMetadata => {
    return {
        antallArbeidsgivereIkkeIAareg: sak.arbeidsaktivitetMedUkjentArbeidsgiver.length,
    };
};

export const getSøknadApiDataMetadata = (
    apiData: SøknadApiData,
    søknadsdata: Søknadsdata,
    valgteEndringer: ValgteEndringer,
    sak: Sak,
): SøknadApiDataMetadata => {
    const { arbeidstid, lovbestemtFerie } = apiData.ytelse;

    return {
        valgtEndreArbeidstid: valgteEndringer?.arbeidstid || false,
        valgtEndreFerie: valgteEndringer?.lovbestemtFerie || false,
        antallAktiviteterSomKanEndres: sak.utledet.aktiviteterSomKanEndres.length,
        ...getUkjentArbeidsforholdMetadata(søknadsdata),
        ...getFerieMetadata(lovbestemtFerie),
        ...getArbeidstidMetadata(arbeidstid),
        ...getArbeidsgiverIkkeIAaregMetadata(sak),
    };
};

export const getLovbestemtFerieOppsummeringInfo = (lovbestemtFerie: LovbestemtFerieApiData) => {
    const perioder: LovbestemtFeriePeriode[] = Object.keys(lovbestemtFerie.perioder).map(
        (isoDateRange): LovbestemtFeriePeriode => {
            return {
                ...ISODateRangeToDateRange(isoDateRange),
                skalHaFerie: lovbestemtFerie.perioder[isoDateRange].skalHaFerie,
            };
        },
    );
    const perioderLagtTil = perioder.filter((p) => p.skalHaFerie === true);
    const perioderFjernet = perioder.filter((p) => p.skalHaFerie === false);
    return {
        perioderLagtTil,
        perioderFjernet,
    };
};
