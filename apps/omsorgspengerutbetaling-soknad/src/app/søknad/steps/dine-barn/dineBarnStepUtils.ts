import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import dayjs from 'dayjs';
import { BarnAlderInfo } from '../../../types/BarnAlderInfo';
import { DineBarnScenario } from '../../../types/DineBarnScenario';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { StepId } from '../../../types/StepId';
import { SøknadContextState, TempFormValues } from '../../../types/SøknadContextState';
import { DineBarnSøknadsdata, DineBarnSøknadsdataType } from '../../../types/søknadsdata/DineBarnSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { DineBarnFormValues } from './DineBarnStep';
import { getDateToday } from '@navikt/sif-common-utils';

export const nYearsAgo = (years: number): Date => {
    return dayjs(getDateToday()).subtract(years, 'y').startOf('year').toDate();
};

export const getYesOrNoFromBoolean = (value?: boolean): YesOrNo => {
    if (value == undefined) {
        return YesOrNo.UNANSWERED;
    }
    return value ? YesOrNo.YES : YesOrNo.NO;
};

export const getDineBarnSøknadsdataFromFormValues = (
    values: DineBarnFormValues,
    { registrerteBarn = [] }: Partial<SøknadContextState>,
): DineBarnSøknadsdata | undefined => {
    const { andreBarn = [] } = values;
    const barn = [...registrerteBarn, ...andreBarn];
    const scenario = getDineBarnScenario(barn);
    const harUtvidetRett = getHarUtvidetRett(barn, values.harSyktBarn, values.harAleneomsorg);

    const harSyktBarn = values.harSyktBarn === YesOrNo.YES;
    const harAleneomsorg = harSyktBarn === false ? values.harAleneomsorg === YesOrNo.YES : undefined;

    switch (scenario) {
        case DineBarnScenario.KUN_OVER_13:
            return harUtvidetRett
                ? {
                      type: DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKT_BARN_OVER_13,
                      andreBarn,
                      harUtvidetRett,
                  }
                : { type: DineBarnSøknadsdataType.HAR_IKKE_RETT_STOPPES, andreBarn, harUtvidetRett };
        case DineBarnScenario.ETT_ELLER_TO_UNDER_13:
            return {
                type: DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKDOM_ELLER_ALENEOMSORG,
                harUtvidetRett,
                andreBarn,
                harSyktBarn,
                harAleneomsorg: harSyktBarn ? undefined : harAleneomsorg,
                harDekketTiFørsteDagerSelv: harUtvidetRett
                    ? values.harDekketTiFørsteDagerSelv === YesOrNo.YES
                    : undefined,
            };
        case DineBarnScenario.TRE_ELLER_FLERE_UNDER_13:
            return {
                type: DineBarnSøknadsdataType.UTVIDET_RETT_PGA_ANTALL_BARN,
                harUtvidetRett,
                andreBarn,
                harDekketTiFørsteDagerSelv: harUtvidetRett && values.harDekketTiFørsteDagerSelv === YesOrNo.YES,
            };
    }
};

export const getDineBarnStepInitialValues = (
    søknadsdata: Søknadsdata,
    tempFormValues?: TempFormValues,
    formValues?: DineBarnFormValues,
): DineBarnFormValues => {
    if (formValues) {
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
        switch (dineBarn.type) {
            case DineBarnSøknadsdataType.HAR_IKKE_RETT_STOPPES:
                return { andreBarn: dineBarn.andreBarn };
            case DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKT_BARN_OVER_13:
                return { andreBarn: dineBarn.andreBarn, harSyktBarn: YesOrNo.YES };
            case DineBarnSøknadsdataType.UTVIDET_RETT_PGA_ANTALL_BARN:
                return {
                    andreBarn: dineBarn.andreBarn,
                    harDekketTiFørsteDagerSelv: getYesOrNoFromBoolean(dineBarn.harDekketTiFørsteDagerSelv),
                };
            case DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKDOM_ELLER_ALENEOMSORG: {
                const harSyktBarn = dineBarn.harSyktBarn ? YesOrNo.YES : YesOrNo.NO;
                return {
                    andreBarn: dineBarn.andreBarn,
                    harSyktBarn,
                    harAleneomsorg:
                        harSyktBarn === YesOrNo.YES ? undefined : dineBarn.harAleneomsorg ? YesOrNo.YES : YesOrNo.NO,
                    harDekketTiFørsteDagerSelv: dineBarn.harUtvidetRett
                        ? dineBarn.harDekketTiFørsteDagerSelv
                            ? YesOrNo.YES
                            : YesOrNo.NO
                        : undefined,
                };
            }
        }
    }
    return defaultValues;
};

/** Spørsmålslogikk */

export const getHarUtvidetRett = (
    barn: Array<RegistrertBarn | AnnetBarn>,
    harSyktBarn?: YesOrNo,
    harAleneomsorg?: YesOrNo,
): boolean => {
    const info = getBarnAlderInfo(barn);
    const { under13, kunBarnOver13, over13 } = info;
    if (harSyktBarn === YesOrNo.YES) {
        return true;
    }
    if (harAleneomsorg === YesOrNo.YES) {
        if (kunBarnOver13) {
            return over13 > 1;
        }
        return true;
    }
    return under13 > 2;
};

export const getMåDekkeFørsteTiDagerSelv = (
    barn: Array<RegistrertBarn | AnnetBarn> = [],
    harSyktBarn?: YesOrNo,
): boolean | undefined => {
    const { kunBarnOver13 } = getBarnAlderInfo(barn);
    if (kunBarnOver13 && harSyktBarn === YesOrNo.YES) {
        return false;
    }
    return true;
};

export const getDineBarnScenario = (barn: Array<RegistrertBarn | AnnetBarn>): DineBarnScenario => {
    const { over13, under13 } = getBarnAlderInfo(barn);

    /** Ingen barn */
    if (under13 === 0 && over13 === 0) {
        return DineBarnScenario.ETT_ELLER_TO_UNDER_13;
    }
    /** Barn under 13 */
    if (under13 > 0 && under13 <= 2) {
        return DineBarnScenario.ETT_ELLER_TO_UNDER_13;
    }
    if (under13 > 2) {
        return DineBarnScenario.TRE_ELLER_FLERE_UNDER_13;
    }
    /** Kun barn over 13 */
    if (under13 === 0 && over13 > 0) {
        return DineBarnScenario.KUN_OVER_13;
    }
    throw 'Ukjent barnScenario';
};

/** Returnerer hvilken alder en har ved slutten av året  */
export const getAlderILøpetAvÅr = (årstall: number, fødselsdato: Date) => {
    return årstall - dayjs(fødselsdato).year();
};

/** Sjekker om barn er under 13 år hele kalenderåret */
export const barnErUnder13HeleInneværendeÅr = (fødselsdato: Date) => {
    return getAlderILøpetAvÅr(new Date().getFullYear(), fødselsdato) < 13;
};

export const getBarnAlderInfo = (barn: Array<RegistrertBarn | AnnetBarn>): BarnAlderInfo => {
    const under13 = barn.filter(({ fødselsdato }) => barnErUnder13HeleInneværendeÅr(fødselsdato)).length;
    const over13 = barn.length - under13;
    return {
        under13,
        over13,
        totalt: barn.length,
        kunBarnUnder13: barn.length > 0 && under13 === barn.length,
        kunBarnOver13: barn.length > 0 && over13 === barn.length,
    };
};

export const kanFortsetteFraDineBarnStep = (registrerteBarn: RegistrertBarn[], values: DineBarnFormValues) => {
    const { kunBarnOver13 } = getBarnAlderInfo([...registrerteBarn, ...(values.andreBarn || [])]);
    if (kunBarnOver13 && values.harSyktBarn === YesOrNo.NO) {
        return false;
    }
    return true;
};
