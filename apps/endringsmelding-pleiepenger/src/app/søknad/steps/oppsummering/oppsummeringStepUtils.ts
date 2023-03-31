import {
    getDatesInDateRange,
    ISODateRange,
    ISODateRangeToDateRange,
    ISODurationToDuration,
} from '@navikt/sif-common-utils/lib';
import { ArbeidstidUkeTabellItem } from '../../../components/arbeidstid-uke-tabell/ArbeidstidUkeTabell';
import {
    ArbeidstidApiData,
    ArbeidstidPeriodeApiData,
    ArbeidstidPeriodeApiDataMap,
    LovbestemtFerieApiData,
} from '../../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { erKortArbeidsuke } from '../../../utils/arbeidsukeUtils';
import { getTimerPerUkeFraTimerPerDag } from '../../../utils/beregnUtils';
import { OppsummeringFormValues } from './OppsummeringStep';

export const getOppsummeringStepInitialValues = (søknadsdata: Søknadsdata): OppsummeringFormValues => {
    return {
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger || false,
    };
};

const harEndringerIArbeidstid = (arbeidstid?: ArbeidstidApiData): boolean => {
    if (!arbeidstid) {
        return false;
    }
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    return (
        (arbeidstakerList !== undefined && arbeidstakerList.length > 0) ||
        frilanserArbeidstidInfo !== undefined ||
        selvstendigNæringsdrivendeArbeidstidInfo !== undefined
    );
};

const harEndringerILovbestemtFerieApiData = (lovbestemtFerie?: LovbestemtFerieApiData): boolean => {
    if (!lovbestemtFerie) {
        return false;
    }
    return Object.keys(lovbestemtFerie.perioder).length > 0;
};

const getArbeidsukeListItemFromArbeidstidPeriodeApiData = (
    {
        faktiskArbeidTimerPerDag,
        _opprinneligFaktiskPerDag,
        _opprinneligNormaltPerDag,
        _endretProsent,
    }: ArbeidstidPeriodeApiData,
    isoDateRange: ISODateRange
): ArbeidstidUkeTabellItem => {
    const periode = ISODateRangeToDateRange(isoDateRange);
    const antallDagerMedArbeidstid = getDatesInDateRange(periode).length;

    const arbeidsuke: ArbeidstidUkeTabellItem = {
        kanEndres: false,
        kanVelges: false,
        isoDateRange,
        periode,
        antallDagerMedArbeidstid,
        erKortUke: erKortArbeidsuke(periode),
        opprinnelig: {
            normalt: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(_opprinneligNormaltPerDag),
                antallDagerMedArbeidstid
            ),
            faktisk: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(_opprinneligFaktiskPerDag),
                antallDagerMedArbeidstid
            ),
        },
        endret: {
            faktisk: getTimerPerUkeFraTimerPerDag(
                ISODurationToDuration(faktiskArbeidTimerPerDag),
                antallDagerMedArbeidstid
            ),
            endretProsent: _endretProsent,
        },
    };
    return arbeidsuke;
};

const getArbeidstidUkeTabellItems = (perioder: ArbeidstidPeriodeApiDataMap): ArbeidstidUkeTabellItem[] => {
    const arbeidsuker: ArbeidstidUkeTabellItem[] = [];
    Object.keys(perioder)
        .sort()
        .forEach((isoDateRange) => {
            arbeidsuker.push(getArbeidsukeListItemFromArbeidstidPeriodeApiData(perioder[isoDateRange], isoDateRange));
        });
    return arbeidsuker;
};

export const oppsummeringStepUtils = {
    getArbeidstidUkeTabellItems,
    harEndringerILovbestemtFerieApiData,
    harEndringerIArbeidstid,
    getOppsummeringStepInitialValues,
};
