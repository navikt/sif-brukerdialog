import { dateFormatter, prettifyDate } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import dayjs from 'dayjs';
import { SøknadContextState, TempFormValues } from '../../../types/SøknadContextState';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { DineBarnFormValues } from './DineBarnStep';
import { DineBarnSøknadsdata } from '../../../types/søknadsdata/DineBarnSøknadsdata';
import { FormattedMessage } from 'react-intl';
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

export const barnItemLabelRenderer = (registrertBarn: RegistrertBarn) => {
    return (
        <span className="dineBarn">
            <FormattedMessage
                id="step.dineBarn.født"
                values={{ dato: dateFormatter.compact(registrertBarn.fødselsdato) }}
            />

            <span className="dineBarn__navn">
                {formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn)}
            </span>
        </span>
    );
};

export const getDineBarnSøknadsdataFromFormValues = (
    values: DineBarnFormValues,
    { registrerteBarn = [] }: Partial<SøknadContextState>,
): DineBarnSøknadsdata | undefined => {
    const { andreBarn = [], harDekketTiFørsteDagerSelv, harUtvidetRett, harUtvidetRettFor } = values;

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
    if (harUtvidetRett !== YesOrNo.YES || !cleanedharUtvidetRettFor || cleanedharUtvidetRettFor.length === 0) {
        return undefined;
    }
    return {
        type: 'alleBarnEldre12år',
        andreBarn,
        harUtvidetRett,
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
        harUtvidetRett: YesOrNo.UNANSWERED,
        harUtvidetRettFor: [],
    };

    if (tempFormValues && tempFormValues.stepId === StepId.DINE_BARN) {
        const { values } = tempFormValues;
        return {
            andreBarn: values.andreBarn,
            harDekketTiFørsteDagerSelv: values.harDekketTiFørsteDagerSelv,
            harUtvidetRett: values.harUtvidetRett ? values.harUtvidetRett : YesOrNo.UNANSWERED,
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
                    harUtvidetRett: dineBarn.harUtvidetRett,
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
