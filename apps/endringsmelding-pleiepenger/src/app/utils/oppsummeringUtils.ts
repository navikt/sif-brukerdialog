import { ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import {
    harEndringerIArbeidstid,
    harEndringerILovbestemtFerieApiData,
} from '../søknad/steps/oppsummering/oppsummeringStepUtils';
import { LovbestemtFeriePeriode } from '../types/LovbestemtFeriePeriode';
import { ArbeidstidApiData, LovbestemtFerieApiData, SøknadApiData } from '../types/søknadApiData/SøknadApiData';
import { getValgteEndringer } from './endringTypeUtils';

interface ArbeidstidMetadata {
    endretArbeidstid?: boolean;
}

interface LovbestemtFerieMetadata {
    endretFerie?: boolean;
    lagtTilFerie?: boolean;
    fjernetFerie?: boolean;
}

export type SøknadApiDataMetadata = LovbestemtFerieMetadata &
    ArbeidstidMetadata & {
        valgtEndreArbeidstid: boolean;
        valgtEndreFerie: boolean;
    };

const getArbeidstidMetadata = (arbeidstid?: ArbeidstidApiData): ArbeidstidMetadata | undefined => {
    return arbeidstid
        ? {
              endretArbeidstid: harEndringerIArbeidstid(arbeidstid),
          }
        : undefined;
};
const getFerieMetadata = (lovbestemtFerie?: LovbestemtFerieApiData): LovbestemtFerieMetadata | undefined => {
    if (!lovbestemtFerie) {
        return undefined;
    }
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieOppsummeringInfo(lovbestemtFerie);
    return {
        endretFerie: harEndringerILovbestemtFerieApiData(lovbestemtFerie),
        lagtTilFerie: perioderLagtTil.length > 0,
        fjernetFerie: perioderFjernet.length > 0,
    };
};

export const getSøknadApiDataMetadata = (apiData: SøknadApiData): SøknadApiDataMetadata => {
    const { arbeidstid, lovbestemtFerie, dataBruktTilUtledning } = apiData.ytelse;
    const endringer = getValgteEndringer(dataBruktTilUtledning.valgteEndringer);
    return {
        valgtEndreArbeidstid: endringer.arbeidstidSkalEndres,
        valgtEndreFerie: endringer.lovbestemtFerieSkalEndres,
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
