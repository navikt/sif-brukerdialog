import { prettifyDate } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import dayjs from 'dayjs';
import { SøknadContextState, TempFormValues } from '../../../types/SøknadContextState';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { DineBarnFormValues } from './DineBarnStep';
import { DineBarnSøknadsdata } from '../../../types/søknadsdata/DineBarnSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { dateToday } from '@navikt/sif-common-utils';
import { StepId } from '../../../types/StepId';
import './dineBarn.css';

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

export const getBarnOptions = (registrertBarn: RegistrertBarn[] = [], andreBarn: AnnetBarn[] = []) => {
    return [
        ...registrertBarn.map((barnet) => ({
            label: `${formatName(barnet.fornavn, barnet.etternavn)} ${prettifyDate(barnet.fødselsdato)}`,
            value: barnet.aktørId,
            'data-testid': `harUtvidetRettFor-${barnet.aktørId}`,
        })),
        ...andreBarn.map((barnet) => ({
            label: `${barnet.navn} ${prettifyDate(barnet.fødselsdato)} `,
            value: barnet.fnr,
            'data-testid': `harUtvidetRettFor-${barnet.fnr}`,
        })),
    ];
};

export const getDineBarnSøknadsdataFromFormValues = (
    values: DineBarnFormValues,
    { registrerteBarn = [] }: Partial<SøknadContextState>,
): DineBarnSøknadsdata | undefined => {
    const { andreBarn = [], harDekketTiFørsteDagerSelv, harSyktBarn, harUtvidetRettFor } = values;

    if (minstEtBarn12årIårellerYngre(registrerteBarn, andreBarn)) {
        if (!harDekketTiFørsteDagerSelv) {
            return undefined;
        }
        return {
            type: 'minstEtt12årEllerYngre',
            andreBarn,
            harDekketTiFørsteDagerSelv,
        };
    }

    const cleanedharUtvidetRettFor = harUtvidetRettFor
        ? cleanHarUtvidetRettFor(harUtvidetRettFor, andreBarn, registrerteBarn)
        : harUtvidetRettFor;
    if (harSyktBarn !== YesOrNo.YES || !cleanedharUtvidetRettFor || cleanedharUtvidetRettFor.length === 0) {
        return undefined;
    }
    return {
        type: 'alleBarnEldre12år',
        andreBarn,
        harSyktBarn: harSyktBarn,
        harUtvidetRettFor: cleanedharUtvidetRettFor,
    };
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
        harDekketTiFørsteDagerSelv: undefined,
        harSyktBarn: YesOrNo.UNANSWERED,
        harAleneomsorg: YesOrNo.UNANSWERED,
        harUtvidetRettFor: [],
    };

    if (tempFormValues && tempFormValues.stepId === StepId.DINE_BARN) {
        const { values } = tempFormValues;
        return {
            andreBarn: values.andreBarn,
            harDekketTiFørsteDagerSelv: values.harDekketTiFørsteDagerSelv,
            harSyktBarn: values.harSyktBarn ? values.harSyktBarn : YesOrNo.UNANSWERED,
            harAleneomsorg: values.harAleneomsorg ? values.harAleneomsorg : YesOrNo.UNANSWERED,
            harUtvidetRettFor: values.harUtvidetRettFor ? values.harUtvidetRettFor : [],
        };
    }

    const { dineBarn } = søknadsdata;
    if (dineBarn) {
        switch (dineBarn.type) {
            case 'minstEtt12årEllerYngre':
                return {
                    ...defaultValues,
                    andreBarn: dineBarn.andreBarn,
                    harDekketTiFørsteDagerSelv: dineBarn.harDekketTiFørsteDagerSelv,
                };
            case 'alleBarnEldre12år':
                return {
                    ...defaultValues,
                    andreBarn: dineBarn.andreBarn,
                    harSyktBarn: dineBarn.harSyktBarn,
                    harUtvidetRettFor: dineBarn.harUtvidetRettFor,
                };
        }
    }
    return defaultValues;
};

export const cleanHarUtvidetRettFor = (
    harUtvidetRettFor: string[],
    andreBarn: AnnetBarn[],
    registrerteBarn: RegistrertBarn[],
): string[] => {
    const alleBarnFnr = [...andreBarn.map((b) => b.fnr), ...registrerteBarn.map((b) => b.aktørId)];
    return harUtvidetRettFor.filter((fnr) => alleBarnFnr.includes(fnr));
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

export const getVisHarSyktBarnSpørsmål = (barnAlderInfo: BarnAlderInfo): boolean => {
    const { over13, under13, totalt } = barnAlderInfo;
    /**
     * Skjules hvis:
     * - Ingen barn
     * - 3 eller flere barn som alle er under 13 år
     */
    if (totalt === 0 || (under13 >= 3 && over13 === 0)) {
        return false;
    }
    return true;
};

export const getVisHarAleneomsorgSpørsmål = (barnAlderInfo: BarnAlderInfo, harSyktBarn?: YesOrNo): boolean => {
    /**
     * Vises dersom bruker har kun 1 eller 2 barn under 13 år og har svart nei på spørsmålet om utvidet rett ved sykdom
     */
    return (
        barnAlderInfo.totalt > 0 &&
        barnAlderInfo.under13 <= 2 &&
        barnAlderInfo.over13 === 0 &&
        harSyktBarn === YesOrNo.NO
    );
};

export const getVisHarUtvidetRettForSpørsmål = (barnAlderInfo: BarnAlderInfo, harSyktBarn?: YesOrNo): boolean => {
    const { under13, over13, totalt } = barnAlderInfo;
    if (totalt === 0) {
        return false;
    }
    if (under13 === 1 && over13 === 1 && harSyktBarn === YesOrNo.YES) {
        return true;
    }
    return false;
};

/** Faktorer
 * 1. Har utvidet rett vs har ikke utvidet rett
 * 2. Må dekke 10 dager vs. må ikke dekke 10 dager
 */
