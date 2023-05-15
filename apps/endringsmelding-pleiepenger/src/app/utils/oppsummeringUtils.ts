import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { oppsummeringStepUtils } from '../søknad/steps/oppsummering/oppsummeringStepUtils';
import { LovbestemtFeriePeriode } from '../types/LovbestemtFeriePeriode';
import {
    ArbeidstakerApiData,
    ArbeidstidApiData,
    LovbestemtFerieApiData,
    SøknadApiData,
} from '../types/søknadApiData/SøknadApiData';
import { getValgteEndringer } from './endringTypeUtils';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { ArbeiderIPeriodenSvar } from '../søknad/steps/arbeidssituasjon/components/ArbeidsforholdForm';

interface ArbeidssituasjonMetadata {
    antallUkjentArbeidsforhold: number;
    erAnsatt?: boolean;
    heltFravær?: boolean;
    redusert?: boolean;
    somVanlig?: boolean;
}
interface ArbeidstidMetadata {
    endretArbeidstid?: boolean;
}

interface LovbestemtFerieMetadata {
    endretFerie?: boolean;
    lagtTilFerie?: boolean;
    fjernetFerie?: boolean;
}

export type SøknadApiDataMetadata = LovbestemtFerieMetadata &
    ArbeidstidMetadata &
    ArbeidssituasjonMetadata & {
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
const getArbeidssituasjonMetadata = (søknadsdata: Søknadsdata): ArbeidssituasjonMetadata => {
    const ukjentArbeidsforhold = søknadsdata.arbeidssituasjon?.arbeidsforhold || [];
    return {
        antallUkjentArbeidsforhold: ukjentArbeidsforhold.length,
        erAnsatt: ukjentArbeidsforhold.some((a) => a.erAnsatt),
        heltFravær: ukjentArbeidsforhold.some(
            (a) => a.erAnsatt && a.arbeiderIPerioden === ArbeiderIPeriodenSvar.heltFravær
        ),
        redusert: ukjentArbeidsforhold.some(
            (a) => a.erAnsatt && a.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert
        ),
        somVanlig: ukjentArbeidsforhold.some(
            (a) => a.erAnsatt && a.arbeiderIPerioden === ArbeiderIPeriodenSvar.somVanlig
        ),
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

export const getSøknadApiDataMetadata = (apiData: SøknadApiData, søknadsdata: Søknadsdata): SøknadApiDataMetadata => {
    const { arbeidstid, lovbestemtFerie, dataBruktTilUtledning } = apiData.ytelse;
    const endringer = getValgteEndringer(dataBruktTilUtledning.valgteEndringer);
    return {
        valgtEndreArbeidstid: endringer.arbeidstidSkalEndres,
        valgtEndreFerie: endringer.lovbestemtFerieSkalEndres,
        ...getArbeidssituasjonMetadata(søknadsdata),
        ...getFerieMetadata(lovbestemtFerie),
        ...getArbeidstidMetadata(arbeidstid),
    };
};

export const getLovbestemtFerieOppsummeringInfo = (lovbestemtFerie: LovbestemtFerieApiData) => {
    const perioder: LovbestemtFeriePeriode[] = Object.keys(lovbestemtFerie.perioder).map(
        (isoDateRange): LovbestemtFeriePeriode => {
            return {
                ...ISODateRangeToDateRange(isoDateRange),
                skalHaFerie: lovbestemtFerie.perioder[isoDateRange].skalHaFerie,
            };
        }
    );
    const perioderLagtTil = perioder.filter((p) => p.skalHaFerie === true);
    const perioderFjernet = perioder.filter((p) => p.skalHaFerie === false);
    return {
        perioderLagtTil,
        perioderFjernet,
    };
};

export const harEndretArbeidstidForArbeidsgiverIApiData = (
    arbeidsgiverId: string,
    endringer?: ArbeidstakerApiData[]
): boolean => {
    const arbeidsgiverEndring = endringer ? endringer.find((a) => a.organisasjonsnummer === arbeidsgiverId) : undefined;
    if (arbeidsgiverEndring) {
        return Object.keys(arbeidsgiverEndring.arbeidstidInfo.perioder).length > 0;
    }
    return false;
};
