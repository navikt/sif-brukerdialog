import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { Ferieuttak, Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib';
import { guid, ISODateToDate } from '@navikt/sif-common-utils/lib';
import {
    FerieuttakIPeriodenApiData,
    PeriodeApiData,
    SøknadApiData,
    isUtenlandsoppholdUtenforEØSApiData,
    UtenlandsoppholdIPeriodenApiData,
    UtenlandsoppholdUtenforEøsIPeriodenApiData,
    UtenlandsoppholdIPeriodenSøknadApiData,
} from '../../types/søknad-api-data/SøknadApiData';
import { SøknadFormField, SøknadFormValues } from '../../types/SøknadFormValues';
import { booleanToYesOrNo } from '../booleanToYesOrNo';

type FerieIPeriodenFormValues = Pick<
    SøknadFormValues,
    SøknadFormField.skalTaUtFerieIPerioden | SøknadFormField.ferieuttakIPerioden
>;
type UtenlandsoppholdIPeriodenFormValues = Pick<
    SøknadFormValues,
    SøknadFormField.skalOppholdeSegIUtlandetIPerioden | SøknadFormField.utenlandsoppholdIPerioden
>;
type TidsromFormValues = UtenlandsoppholdIPeriodenFormValues & FerieIPeriodenFormValues;

const mapPeriodeApiDataToFerieuttak = (ferieuttak: PeriodeApiData): Ferieuttak => ({
    id: guid(),
    from: ISODateToDate(ferieuttak.fraOgMed),
    to: ISODateToDate(ferieuttak.tilOgMed),
});

export const extractFerieIPeriodenFormValues = (
    ferieuttakIPerioden?: FerieuttakIPeriodenApiData
): FerieIPeriodenFormValues => {
    if (!ferieuttakIPerioden || ferieuttakIPerioden.skalTaUtFerieIPerioden === false) {
        return {
            skalTaUtFerieIPerioden: YesOrNo.NO,
        };
    }
    return {
        [SøknadFormField.skalTaUtFerieIPerioden]: YesOrNo.YES,
        [SøknadFormField.ferieuttakIPerioden]: ferieuttakIPerioden.ferieuttak.map(mapPeriodeApiDataToFerieuttak),
    };
};

export const mapUtenlandsoppholdApiDataToUtenlandsopphold = (
    utenlandsopphold: UtenlandsoppholdIPeriodenApiData | UtenlandsoppholdUtenforEøsIPeriodenApiData
): Utenlandsopphold => {
    const { fraOgMed, tilOgMed, landkode } = utenlandsopphold;
    if (isUtenlandsoppholdUtenforEØSApiData(utenlandsopphold)) {
        const { årsak, erBarnetInnlagt, perioderBarnetErInnlagt } = utenlandsopphold;
        return {
            fom: ISODateToDate(fraOgMed),
            tom: ISODateToDate(tilOgMed),
            landkode,
            erBarnetInnlagt: booleanToYesOrNo(erBarnetInnlagt),
            årsak: årsak && årsak !== null ? årsak : undefined,
            barnInnlagtPerioder: perioderBarnetErInnlagt.map((p) => ({
                fom: ISODateToDate(p.fraOgMed),
                tom: ISODateToDate(p.tilOgMed),
            })),
        };
    }
    return {
        fom: ISODateToDate(fraOgMed),
        tom: ISODateToDate(tilOgMed),
        landkode,
    };
};

export const extractUtenlandsoppholdIPeriodenFormValues = (
    utenlandsopphold?: UtenlandsoppholdIPeriodenSøknadApiData
): UtenlandsoppholdIPeriodenFormValues => {
    if (
        !utenlandsopphold ||
        utenlandsopphold.skalOppholdeSegIUtlandetIPerioden === false ||
        utenlandsopphold.opphold === undefined
    ) {
        return {
            skalOppholdeSegIUtlandetIPerioden: YesOrNo.NO,
        };
    }
    const utenlandsoppholdIPerioden: Utenlandsopphold[] = utenlandsopphold.opphold.map(
        mapUtenlandsoppholdApiDataToUtenlandsopphold
    );
    return {
        skalOppholdeSegIUtlandetIPerioden: YesOrNo.YES,
        utenlandsoppholdIPerioden,
    };
};

export const extractTidsromFormValues = (søknad: SøknadApiData): Partial<TidsromFormValues> | undefined => {
    return {
        ...extractFerieIPeriodenFormValues(søknad.ferieuttakIPerioden),
        ...extractUtenlandsoppholdIPeriodenFormValues(søknad.utenlandsoppholdIPerioden),
    };
};
