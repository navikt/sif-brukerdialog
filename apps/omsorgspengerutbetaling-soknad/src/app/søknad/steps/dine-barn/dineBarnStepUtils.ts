import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import dayjs from 'dayjs';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { DineBarnFormValues } from './DineBarnStep';
import { DineBarnSøknadsdata } from '../../../types/søknadsdata/DineBarnSøknadsdata';
import { dateToday } from '@navikt/sif-common-utils';
import './dineBarn.css';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { SøknadContextState, TempFormValues } from '../../../types/SøknadContextState';
import { StepId } from '../../../types/StepId';

export const nYearsAgo = (years: number): Date => {
    return dayjs(dateToday).subtract(years, 'y').startOf('year').toDate();
};

export const minstEtBarn12årIårellerYngre = (
    registrertBarn: RegistrertBarn[],
    andreBarn: AnnetBarn[],
): boolean | undefined => {
    if (registrertBarn.length > 0 || andreBarn.length > 0) {
        const barn12ellerYngre = registrertBarn.some((barn) => dayjs().year() - dayjs(barn.fødselsdato).year() <= 12);
        const andreBarn12ellerYngre = andreBarn.some((barn) => dayjs().year() - dayjs(barn.fødselsdato).year() <= 12);
        return barn12ellerYngre || andreBarn12ellerYngre;
    }
    return undefined;
};

export const getDineBarnSøknadsdataFromFormValues = (
    values: DineBarnFormValues,
    { registrerteBarn = [] }: Partial<SøknadContextState>,
): DineBarnSøknadsdata | undefined => {
    const { andreBarn = [], harAleneomsorg, harDekketTiFørsteDagerSelv, harSyktBarn } = values;
    const scenario = getDineBarnScenario(registrerteBarn, andreBarn);
    const harUtvidetRett = getHarUtvidetRett(registrerteBarn, andreBarn, harSyktBarn, harAleneomsorg);

    switch (scenario) {
        case DineBarnScenario.ETT_ELLER_TO_UNDER_13:
            return {
                scenario,
                andreBarn,
                harUtvidetRett,
                harSyktBarn: harSyktBarn === YesOrNo.YES,
                harAleneomsorg: harAleneomsorg === YesOrNo.YES,
                harDekketTiFørsteDagerSelv: harDekketTiFørsteDagerSelv === YesOrNo.YES,
            };

        case DineBarnScenario.INGEN_BARN:
            return undefined;
    }

    return undefined;
};

export const getDineBarnStepInitialValues = (
    søknadsdata: Søknadsdata,
    tempFormValues?: TempFormValues,
    formValues?: DineBarnFormValues,
): DineBarnFormValues => {
    if (formValues) {
        // Trenges det?
        return formValues;
    }

    const defaultValues: DineBarnFormValues = {
        andreBarn: undefined,
        harSyktBarn: YesOrNo.UNANSWERED,
        harAleneomsorg: YesOrNo.UNANSWERED,
        harDekketTiFørsteDagerSelv: undefined,
    };

    if (tempFormValues && tempFormValues.stepId === StepId.DINE_BARN) {
        const { values } = tempFormValues;
        return {
            andreBarn: values.andreBarn,
            harDekketTiFørsteDagerSelv: values.harDekketTiFørsteDagerSelv,
            harSyktBarn: values.harSyktBarn ? values.harSyktBarn : YesOrNo.UNANSWERED,
            harAleneomsorg: values.harAleneomsorg ? values.harAleneomsorg : YesOrNo.UNANSWERED,
        };
    }

    const { dineBarn } = søknadsdata;
    if (dineBarn) {
        return {
            andreBarn: dineBarn.andreBarn,
            harSyktBarn: dineBarn.harSyktBarn ? YesOrNo.YES : YesOrNo.NO,
            harAleneomsorg: dineBarn.harAleneomsorg ? YesOrNo.YES : YesOrNo.NO,
            harDekketTiFørsteDagerSelv: dineBarn.harDekketTiFørsteDagerSelv ? YesOrNo.YES : YesOrNo.NO,
        };
    }
    return defaultValues;
};

/** Spørsmålslogikk */

export const getHarUtvidetRett = (
    registrerteBarn: RegistrertBarn[],
    andreBarn: AnnetBarn[],
    harSyktBarn?: YesOrNo,
    harAleneomsorg?: YesOrNo,
): boolean => {
    const info = getBarnAlderInfo(registrerteBarn, andreBarn);
    const { under13, kunBarnUnder13, kunBarnOver13, over13 } = info;
    if (harSyktBarn === YesOrNo.YES) {
        return true;
    }
    if (harAleneomsorg === YesOrNo.YES) {
        if (kunBarnOver13) {
            return over13 > 1;
        }
        return true;
    }
    if (kunBarnUnder13) {
        return under13 > 2;
    }
    return false;
};

export const getMåDekkeFørste10DagerSelv = (
    registrerteBarn: RegistrertBarn[],
    andreBarn: AnnetBarn[],
    harSyktBarn?: YesOrNo,
): boolean => {
    const { kunBarnOver13 } = getBarnAlderInfo(registrerteBarn, andreBarn);
    if (kunBarnOver13 && harSyktBarn === YesOrNo.YES) {
        return false;
    }
    return true;
};

export enum DineBarnScenario {
    INGEN_BARN = 'INGEN_BARN',
    ETT_ELLER_TO_UNDER_13 = 'ETT_ELLER_TO_UNDER_13',
    TRE_ELLER_FLERE_UNDER_13 = 'TRE_ELLER_FLERE_UNDER_13',
    KUN_OVER_13 = 'KUN_OVER_13',
    OVER_OG_UNDER_13 = 'OVER_OG_UNDER_13',
}

export const getDineBarnScenario = (registrerteBarn: RegistrertBarn[], andreBarn: AnnetBarn[]): DineBarnScenario => {
    const { over13, under13 } = getBarnAlderInfo(registrerteBarn, andreBarn);

    /** Ingen barn */
    if (over13 === 0 && under13 === 0) {
        return DineBarnScenario.INGEN_BARN;
    }
    /** Kun barn under 13 */
    if (over13 === 0 && under13 <= 2) {
        return DineBarnScenario.ETT_ELLER_TO_UNDER_13;
    }
    if (over13 === 0 && under13 >= 3) {
        return DineBarnScenario.TRE_ELLER_FLERE_UNDER_13;
    }
    /** Kun barn over 13 */
    if (over13 > 0 && under13 === 0) {
        return DineBarnScenario.KUN_OVER_13;
    }
    /** Barn over og under 13 */
    if (over13 >= 1 && under13 >= 1) {
        return DineBarnScenario.OVER_OG_UNDER_13;
    }
    throw 'Ukjent barnScenario';
};

export interface BarnAlderInfo {
    under13: number;
    over13: number;
    totalt: number;
    kunBarnUnder13: boolean;
    kunBarnOver13: boolean;
}

export const getBarnAlderInfo = (registrertebarn: RegistrertBarn[], andreBarn: AnnetBarn[]): BarnAlderInfo => {
    const barn = [...registrertebarn, ...andreBarn];
    const under13 = barn.filter((barn) => dayjs().year() - dayjs(barn.fødselsdato).year() <= 12).length;
    const over13 = barn.length - under13;
    return {
        under13,
        over13,
        totalt: barn.length,
        kunBarnUnder13: under13 === barn.length,
        kunBarnOver13: over13 === barn.length,
    };
};
