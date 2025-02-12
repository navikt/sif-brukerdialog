import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import {
    DateRange,
    getCountryName,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ISOStringToDate,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import {
    getDateRangeValidator,
    getListValidator,
    getRequiredFieldValidator,
    getYesOrNoValidator,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateListError,
    ValidateRequiredFieldError,
    ValidateYesOrNoError,
} from '@navikt/sif-common-validation';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { handleDateRangeValidationError, mapFomTomToDateRange } from '../../utils';
import TidsperiodeListAndDialog from '../tidsperiode/TidsperiodeListAndDialog';
import { Utenlandsopphold, UtenlandsoppholdFormValues, UtenlandsoppholdVariant, UtenlandsoppholdÅrsak } from './types';
import { useUtenlandsoppholdIntl, UtenlandsoppholdMessageKeys } from './utenlandsoppholdMessages';
import {
    getUtenlandsoppholdQuestionVisibility,
    mapFormValuesToUtenlandsopphold,
    mapUtenlandsoppholdToFormValues,
} from './utenlandsoppholdUtils';

interface Props {
    variant: UtenlandsoppholdVariant;
    minDate: Date;
    maxDate: Date;
    opphold?: Utenlandsopphold; // Ved redigering av utenlandsopphold
    alleOpphold?: Utenlandsopphold[];
    onSubmit: (values: Utenlandsopphold) => void;
    onCancel: () => void;
}

enum UtenlandsoppholdFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
    årsak = 'årsak',
    erBarnetInnlagt = 'erBarnetInnlagt',
    barnInnlagtPerioder = 'barnInnlagtPerioder',
    erSammenMedBarnet = 'erSammenMedBarnet',
}

export const UtlandsoppholdFormErrors: Record<
    UtenlandsoppholdFormFields,
    { [key: string]: UtenlandsoppholdMessageKeys }
> = {
    [UtenlandsoppholdFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: '@forms.utenlandsoppholdForm.fom.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: '@forms.utenlandsoppholdForm.fom.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.utenlandsoppholdForm.fom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: '@forms.utenlandsoppholdForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.utenlandsoppholdForm.fom.dateIsAfterMax',
    },
    [UtenlandsoppholdFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: '@forms.utenlandsoppholdForm.tom.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: '@forms.utenlandsoppholdForm.tom.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: '@forms.utenlandsoppholdForm.tom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: '@forms.utenlandsoppholdForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: '@forms.utenlandsoppholdForm.tom.dateIsAfterMax',
    },
    [UtenlandsoppholdFormFields.landkode]: {
        [ValidateRequiredFieldError.noValue]: '@forms.utenlandsoppholdForm.landkode.noValue',
    },
    [UtenlandsoppholdFormFields.årsak]: {
        [ValidateRequiredFieldError.noValue]: '@forms.utenlandsoppholdForm.årsak.noValue',
    },
    [UtenlandsoppholdFormFields.erBarnetInnlagt]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: '@forms.utenlandsoppholdForm.erBarnetInnlagt.yesOrNoIsUnanswered',
    },
    [UtenlandsoppholdFormFields.barnInnlagtPerioder]: {
        [ValidateListError.listIsEmpty]: '@forms.utenlandsoppholdForm.barnInnlagtPerioder.listIsEmpty',
    },
    [UtenlandsoppholdFormFields.erSammenMedBarnet]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: '@forms.utenlandsoppholdForm.erSammenMedBarnet.yesOrNoIsUnanswered',
    },
};

const defaultFormValues: UtenlandsoppholdFormValues = {
    fom: undefined,
    tom: undefined,
    landkode: undefined,
    erBarnetInnlagt: YesOrNo.UNANSWERED,
    barnInnlagtPerioder: [],
    årsak: undefined,
    erSammenMedBarnet: YesOrNo.UNANSWERED,
};

const Form = getTypedFormComponents<UtenlandsoppholdFormFields, UtenlandsoppholdFormValues, ValidationError>();

const UtenlandsoppholdForm = ({ variant, maxDate, minDate, opphold, alleOpphold = [], onSubmit, onCancel }: Props) => {
    const intl = useIntl();
    const { text } = useUtenlandsoppholdIntl();

    const onFormikSubmit = (formValues: Partial<UtenlandsoppholdFormValues>) => {
        const utenlandsoppholdToSubmit = mapFormValuesToUtenlandsopphold(formValues, variant, opphold?.id);
        onSubmit(utenlandsoppholdToSubmit);
    };

    const registrerteTidsperioder: DateRange[] | undefined =
        opphold === undefined
            ? alleOpphold.map(mapFomTomToDateRange)
            : alleOpphold.filter((o) => o.id !== opphold.id).map(mapFomTomToDateRange);

    if (variant === 'enkel') {
        defaultFormValues.erBarnetInnlagt = undefined;
    }

    const initialValues = opphold ? mapUtenlandsoppholdToFormValues(opphold, variant) : defaultFormValues;

    return (
        <Form.FormikWrapper
            initialValues={initialValues}
            onSubmit={onFormikSubmit}
            renderForm={(formik) => {
                const {
                    values: { fom, tom, landkode },
                } = formik;

                const { showInnlagtPerioderQuestion, showInnlagtQuestion, showÅrsakQuestion } =
                    getUtenlandsoppholdQuestionVisibility(formik.values, variant);

                return (
                    <Form.Form
                        includeButtons={true}
                        onCancel={onCancel}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}
                        formErrorHandler={getIntlFormErrorHandler(intl, '@forms.utenlandsoppholdForm')}>
                        <Form.DateRangePicker
                            legend={text('@forms.utenlandsopphold.form.tidsperiode.spm')}
                            disabledDateRanges={registrerteTidsperioder}
                            minDate={minDate}
                            maxDate={maxDate}
                            fromInputProps={{
                                name: UtenlandsoppholdFormFields.fom,
                                label: text('@forms.utenlandsopphold.form.tidsperiode.fraDato'),
                                validate: (value) => {
                                    const error = getDateRangeValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                        toDate: ISOStringToDate(tom),
                                    }).validateFromDate(value);
                                    return handleDateRangeValidationError(error, minDate, maxDate);
                                },
                            }}
                            toInputProps={{
                                name: UtenlandsoppholdFormFields.tom,
                                label: text('@forms.utenlandsopphold.form.tidsperiode.tilDato'),
                                validate: (value) => {
                                    const error = getDateRangeValidator({
                                        required: true,
                                        min: minDate,
                                        max: maxDate,
                                        fromDate: ISOStringToDate(fom),
                                    }).validateToDate(value);
                                    return handleDateRangeValidationError(error, minDate, maxDate);
                                },
                            }}
                        />

                        <FormBlock>
                            <Form.CountrySelect
                                name={UtenlandsoppholdFormFields.landkode}
                                label={text('@forms.utenlandsopphold.form.land.spm')}
                                validate={getRequiredFieldValidator()}
                            />
                        </FormBlock>

                        {landkode && variant === 'utvidet' && (
                            <>
                                <FormBlock>
                                    <Form.YesOrNoQuestion
                                        name={UtenlandsoppholdFormFields.erSammenMedBarnet}
                                        legend={text('@forms.utenlandsopphold.form.erSammenMedBarnet.spm', {
                                            land: getCountryName(landkode, intl.locale),
                                        })}
                                        validate={(value) => {
                                            const error = getYesOrNoValidator()(value);
                                            return error
                                                ? {
                                                      key: error,
                                                      values: { land: getCountryName(landkode, intl.locale) },
                                                  }
                                                : undefined;
                                        }}
                                    />
                                </FormBlock>

                                {showInnlagtQuestion && (
                                    <FormBlock>
                                        <Form.YesOrNoQuestion
                                            name={UtenlandsoppholdFormFields.erBarnetInnlagt}
                                            legend={text('@forms.utenlandsopphold.form.erBarnetInnlagt.spm', {
                                                land: getCountryName(landkode, intl.locale),
                                            })}
                                            validate={(value) => {
                                                const error = getYesOrNoValidator()(value);
                                                return error
                                                    ? {
                                                          key: error,
                                                          values: { land: getCountryName(landkode, intl.locale) },
                                                      }
                                                    : undefined;
                                            }}
                                        />
                                    </FormBlock>
                                )}
                                {showInnlagtPerioderQuestion && (
                                    <FormBlock margin="l">
                                        <TidsperiodeListAndDialog
                                            name={UtenlandsoppholdFormFields.barnInnlagtPerioder}
                                            minDate={ISOStringToDate(fom)}
                                            maxDate={ISOStringToDate(tom)}
                                            validate={getListValidator({ required: true })}
                                            labels={{
                                                addLabel: text(
                                                    '@forms.utenlandsopphold.form.perioderBarnetErInnlag.addLabel',
                                                ),
                                                modalTitle: text(
                                                    '@forms.utenlandsopphold.form.perioderBarnetErInnlag.formTitle',
                                                ),
                                                listTitle: text(
                                                    '@forms.utenlandsopphold.form.perioderBarnetErInnlag.listTitle',
                                                ),
                                            }}
                                        />
                                    </FormBlock>
                                )}
                                {showÅrsakQuestion && (
                                    <>
                                        <FormBlock>
                                            <Form.RadioGroup
                                                legend={text('@forms.utenlandsopphold.form.årsak.spm', {
                                                    land: getCountryName(landkode, intl.locale),
                                                })}
                                                name={UtenlandsoppholdFormFields.årsak}
                                                validate={getRequiredFieldValidator()}
                                                radios={[
                                                    {
                                                        value: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE,
                                                        label: text(
                                                            `@forms.utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE}`,
                                                        ),
                                                    },
                                                    {
                                                        value: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_ANNET_LAND,
                                                        label: text(
                                                            `@forms.utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.INNLAGT_DEKKET_ANNET_LAND}`,
                                                            { land: getCountryName(landkode, intl.locale) },
                                                        ),
                                                    },
                                                    {
                                                        value: UtenlandsoppholdÅrsak.ANNET,
                                                        label: text(
                                                            `@forms.utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.ANNET}`,
                                                        ),
                                                    },
                                                ]}
                                            />
                                        </FormBlock>
                                    </>
                                )}
                            </>
                        )}
                    </Form.Form>
                );
            }}
        />
    );
};

export default UtenlandsoppholdForm;
