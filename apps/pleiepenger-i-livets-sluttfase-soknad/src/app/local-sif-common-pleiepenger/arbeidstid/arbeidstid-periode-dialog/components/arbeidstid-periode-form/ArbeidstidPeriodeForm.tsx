import React from 'react';
import { useIntl } from 'react-intl';
import {
    DateRange,
    dateToISODate,
    DurationWeekdays,
    ensureCompleteDurationWeekdays,
    getWeekdayDOW,
    Weekday,
} from '@navikt/sif-common-utils';
import { InputDateString } from 'nav-datovelger/lib/types';
import { TidFasteUkedagerInput } from '../../../../tid';
import { ArbeiderIPeriodenSvar, ArbeidIPeriodeIntlValues } from '../../../../types';
import { getArbeidstidPeriodeIntl } from '../../i18n/arbeidstidPeriodeMessages';
import { ArbeidstidPeriodeData } from '../../types';
import { getArbeidstimerFastDagValidator, validateFasteArbeidstimerIUke } from './arbeidstidPeriodeFormValidation';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { getDateRangeValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

export interface ArbeidstidPeriodeFormProps {
    arbeidsstedNavn: string;
    periode: DateRange;
    intlValues: ArbeidIPeriodeIntlValues;
    utilgjengeligeUkedager?: Weekday[];
    skjulUtilgjengeligeUkedager?: boolean;
    visAlleSpørsmål?: boolean;
    tekst?: {
        tittel?: JSX.Element;
        introduksjon?: JSX.Element;
        okButton?: string;
        cancelButton?: string;
    };
    onSubmit: (data: ArbeidstidPeriodeData) => void;
    onCancel: () => void;
}

enum FormFields {
    'fom' = 'fom',
    'tom' = 'tom',
    'heleSøknadsperioden' = 'heleSøknadsperioden',
    'arbeiderHvordan' = 'arbeiderHvordan',
    'tidFasteDager' = 'tidFasteDager',
}

interface FormValues {
    [FormFields.fom]: InputDateString;
    [FormFields.tom]: InputDateString;
    [FormFields.heleSøknadsperioden]?: boolean;
    [FormFields.arbeiderHvordan]?: ArbeiderIPeriodenSvar;
    [FormFields.tidFasteDager]?: DurationWeekdays;
}

const initialFormValues: Partial<FormValues> = {};

const FormComponents = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const ArbeidstidPeriodeForm: React.FunctionComponent<ArbeidstidPeriodeFormProps> = ({
    arbeidsstedNavn,
    periode,
    intlValues,
    utilgjengeligeUkedager,
    skjulUtilgjengeligeUkedager,
    tekst,
    visAlleSpørsmål,
    onSubmit,
    onCancel,
}) => {
    const intl = useIntl();
    const arbIntl = getArbeidstidPeriodeIntl(intl);

    const onValidSubmit = (values: Partial<FormValues>) => {
        const fom = datepickerUtils.getDateFromDateString(values.fom);
        const tom = datepickerUtils.getDateFromDateString(values.tom);

        if (!fom || !tom) {
            throw new Error('ArbeidstidPeriodeForm. Ugyldig fom/tom ');
        }

        switch (values.arbeiderHvordan) {
            case ArbeiderIPeriodenSvar.heltFravær:
            case ArbeiderIPeriodenSvar.somVanlig:
                onSubmit({ fom, tom, arbeiderHvordan: values.arbeiderHvordan });
                break;
            case ArbeiderIPeriodenSvar.redusert:
                if (values.tidFasteDager) {
                    onSubmit({
                        fom,
                        tom,
                        arbeiderHvordan: values.arbeiderHvordan,
                        tidFasteDager: ensureCompleteDurationWeekdays(values.tidFasteDager),
                    });
                } else {
                    throw new Error('ArbeidstidPeriodeForm. Ugyldig tidFasteDager ');
                }
                break;
        }
    };

    const disabledDaysOfWeekDayNumber = utilgjengeligeUkedager
        ? utilgjengeligeUkedager.map((dag) => getWeekdayDOW(dag))
        : [];

    return (
        <div>
            <Heading level="1" size="large" className="dialogFormTitle">
                {tekst?.tittel || arbIntl.intlText('arbeidstidPeriodeForm.tittel', { arbeidsstedNavn })}
            </Heading>
            {tekst?.introduksjon ? <Block margin="l">{tekst.introduksjon}</Block> : undefined}
            <FormBlock margin="xl">
                <FormComponents.FormikWrapper
                    initialValues={initialFormValues}
                    onSubmit={onValidSubmit}
                    renderForm={({
                        values: { fom, tom, tidFasteDager, arbeiderHvordan, heleSøknadsperioden },
                        setFieldValue,
                    }) => {
                        const from = datepickerUtils.getDateFromDateString(fom);
                        const to = datepickerUtils.getDateFromDateString(tom);

                        const handleHeleSøknadsperiodenChange = (velgHeleSøknadsperioden?: boolean) => {
                            if (velgHeleSøknadsperioden) {
                                setFieldValue(FormFields.fom, dateToISODate(periode.from));
                                setFieldValue(FormFields.tom, dateToISODate(periode.to));
                            }
                        };

                        return (
                            <FormComponents.Form
                                onCancel={onCancel}
                                formErrorHandler={getIntlFormErrorHandler(intl, 'arbeidstidPeriodeForm.validation')}
                                includeValidationSummary={true}
                                includeButtons={true}
                                submitButtonLabel={
                                    tekst?.okButton || arbIntl.intlText('arbeidstidPeriodeForm.submitButtonLabel')
                                }
                                cancelButtonLabel={
                                    tekst?.cancelButton || arbIntl.intlText('arbeidstidPeriodeForm.cancelButtonLabel')
                                }>
                                <div style={{ maxWidth: '20rem' }}>
                                    <FormBlock>
                                        <FormComponents.DateRangePicker
                                            legend=""
                                            disabledDaysOfWeek={{ dayOfWeek: disabledDaysOfWeekDayNumber }}
                                            minDate={periode.from}
                                            maxDate={periode.to}
                                            disableWeekends={true}
                                            fromInputProps={{
                                                label: arbIntl.intlText('arbeidstidPeriodeForm.fraOgMed.label'),
                                                name: FormFields.fom,
                                                inputDisabled: heleSøknadsperioden === true,
                                                validate: getDateRangeValidator({
                                                    required: true,
                                                    onlyWeekdays: false,
                                                    toDate: to,
                                                    fromDate: from,
                                                    min: periode.from,
                                                    max: to || periode.to,
                                                }).validateFromDate,
                                            }}
                                            toInputProps={{
                                                label: arbIntl.intlText('arbeidstidPeriodeForm.tilOgMed.label'),
                                                name: FormFields.tom,
                                                inputDisabled: heleSøknadsperioden === true,
                                                validate: getDateRangeValidator({
                                                    required: true,
                                                    onlyWeekdays: false,
                                                    toDate: to,
                                                    fromDate: from,
                                                    min: from || periode.from,
                                                    max: periode.to,
                                                }).validateToDate,
                                            }}
                                        />
                                        <Block>
                                            <FormComponents.Checkbox
                                                label={intlHelper(intl, 'arbeidstidPeriodeForm.velgHelePerioden')}
                                                name={FormFields.heleSøknadsperioden}
                                                afterOnChange={handleHeleSøknadsperiodenChange}
                                            />
                                        </Block>
                                    </FormBlock>
                                </div>

                                {((fom && tom) || visAlleSpørsmål) && (
                                    <>
                                        <FormBlock>
                                            <FormComponents.RadioGroup
                                                name={FormFields.arbeiderHvordan}
                                                legend={intlHelper(
                                                    intl,
                                                    'arbeidstidPeriodeForm.arbeiderIPerioden.spm',
                                                    intlValues,
                                                )}
                                                radios={[
                                                    {
                                                        label: intlHelper(
                                                            intl,
                                                            'arbeidstidPeriodeForm.arbeiderIPerioden.svar.jobberIkke',
                                                        ),
                                                        value: ArbeiderIPeriodenSvar.heltFravær,
                                                        'data-testid': 'helt-fravær',
                                                    },
                                                    {
                                                        label: intlHelper(
                                                            intl,
                                                            'arbeidstidPeriodeForm.arbeiderIPerioden.svar.jobberRedusert',
                                                        ),
                                                        value: ArbeiderIPeriodenSvar.redusert,
                                                        'data-testid': 'jobber-redusert',
                                                    },
                                                    {
                                                        label: intlHelper(
                                                            intl,
                                                            'arbeidstidPeriodeForm.arbeiderIPerioden.svar.jobberVanlig',
                                                        ),
                                                        value: ArbeiderIPeriodenSvar.somVanlig,
                                                        'data-testid': 'som-vanlig',
                                                    },
                                                ]}
                                                validate={(value) => {
                                                    const error = getRequiredFieldValidator()(value);
                                                    return error
                                                        ? {
                                                              key: error,
                                                              values: intlValues,
                                                          }
                                                        : undefined;
                                                }}
                                            />
                                        </FormBlock>
                                        {arbeiderHvordan === ArbeiderIPeriodenSvar.redusert && (
                                            <FormBlock>
                                                <FormComponents.InputGroup
                                                    legend={arbIntl.intlText(
                                                        'arbeidstidPeriodeForm.tidFasteUkedager.label',
                                                        intlValues,
                                                    )}
                                                    validate={() => {
                                                        const error = validateFasteArbeidstimerIUke(tidFasteDager);
                                                        return error
                                                            ? {
                                                                  key: error.key,
                                                                  values: intlValues,
                                                              }
                                                            : undefined;
                                                    }}
                                                    name={'fasteDager.gruppe' as any}>
                                                    <TidFasteUkedagerInput
                                                        name={FormFields.tidFasteDager}
                                                        disabledDays={utilgjengeligeUkedager}
                                                        hideDisabledDays={skjulUtilgjengeligeUkedager}
                                                        data-testid="tid-ukedager"
                                                        validateDag={(dag, value) => {
                                                            const error = getArbeidstimerFastDagValidator()(value);
                                                            return error
                                                                ? {
                                                                      key: `arbeidstidPeriodeForm.validation.tidFasteDager.tid.${error}`,
                                                                      keepKeyUnaltered: true,
                                                                      values: { ...intlValues, dag },
                                                                  }
                                                                : undefined;
                                                        }}
                                                    />
                                                </FormComponents.InputGroup>
                                            </FormBlock>
                                        )}
                                    </>
                                )}
                            </FormComponents.Form>
                        );
                    }}
                />
            </FormBlock>
        </div>
    );
};

export default ArbeidstidPeriodeForm;
