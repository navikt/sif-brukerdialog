import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    DateRange,
    getCountryName,
    countryIsMemberOfEøsOrEfta,
    ISOStringToDate,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
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
} from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { hasValue } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { handleDateRangeValidationError, mapFomTomToDateRange } from '../../utils';
import TidsperiodeListAndDialog from '../tidsperiode/TidsperiodeListAndDialog';
import { Utenlandsopphold, UtenlandsoppholdFormValues, UtenlandsoppholdÅrsak } from './types';
import utils from './utenlandsoppholdUtils';

interface Props {
    minDate: Date;
    maxDate: Date;
    opphold?: Utenlandsopphold;
    alleOpphold?: Utenlandsopphold[];
    excludeInnlagtQuestion: boolean;
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
}

export const UtlandsoppholdFormErrors = {
    [UtenlandsoppholdFormFields.fom]: {
        [ValidateDateError.dateHasNoValue]: 'utenlandsoppholdForm.fom.dateHasNoValue',
        [ValidateDateRangeError.fromDateIsAfterToDate]: 'utenlandsoppholdForm.fom.fromDateIsAfterToDate',
        [ValidateDateError.dateHasInvalidFormat]: 'utenlandsoppholdForm.fom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'utenlandsoppholdForm.fom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'utenlandsoppholdForm.fom.dateIsAfterMax',
    },
    [UtenlandsoppholdFormFields.tom]: {
        [ValidateDateError.dateHasNoValue]: 'utenlandsoppholdForm.tom.dateHasNoValue',
        [ValidateDateRangeError.toDateIsBeforeFromDate]: 'utenlandsoppholdForm.tom.toDateIsBeforeFromDate',
        [ValidateDateError.dateHasInvalidFormat]: 'utenlandsoppholdForm.tom.dateHasInvalidFormat',
        [ValidateDateError.dateIsBeforeMin]: 'utenlandsoppholdForm.tom.dateIsBeforeMin',
        [ValidateDateError.dateIsAfterMax]: 'utenlandsoppholdForm.tom.dateIsAfterMax',
    },
    [UtenlandsoppholdFormFields.landkode]: {
        [ValidateRequiredFieldError.noValue]: 'utenlandsoppholdForm.landkode.noValue',
    },
    [UtenlandsoppholdFormFields.årsak]: { [ValidateRequiredFieldError.noValue]: 'utenlandsoppholdForm.årsak.noValue' },
    [UtenlandsoppholdFormFields.erBarnetInnlagt]: {
        [ValidateYesOrNoError.yesOrNoIsUnanswered]: 'utenlandsoppholdForm.erBarnetInnlagt.yesOrNoIsUnanswered',
    },
    [UtenlandsoppholdFormFields.barnInnlagtPerioder]: {
        [ValidateListError.listIsEmpty]: 'utenlandsoppholdForm.barnInnlagtPerioder.listIsEmpty',
    },
};

const defaultFormValues: UtenlandsoppholdFormValues = {
    fom: undefined,
    tom: undefined,
    landkode: undefined,
    erBarnetInnlagt: YesOrNo.UNANSWERED,
    barnInnlagtPerioder: [],
    årsak: undefined,
};

const Form = getTypedFormComponents<UtenlandsoppholdFormFields, UtenlandsoppholdFormValues, ValidationError>();

const UtenlandsoppholdForm = ({
    maxDate,
    minDate,
    opphold,
    excludeInnlagtQuestion,
    alleOpphold = [],
    onSubmit,
    onCancel,
}: Props) => {
    const intl = useIntl();

    const onFormikSubmit = (formValues: Partial<UtenlandsoppholdFormValues>) => {
        const utenlandsoppholdToSubmit = utils.mapFormValuesToUtenlandsopphold(
            formValues,
            excludeInnlagtQuestion,
            opphold?.id,
        );
        if (utils.isValidUtenlandsopphold(utenlandsoppholdToSubmit)) {
            onSubmit({
                ...utenlandsoppholdToSubmit,
                årsak: countryIsMemberOfEøsOrEfta(utenlandsoppholdToSubmit.landkode) ? undefined : formValues.årsak,
            });
        } else {
            throw new Error('UtenlandsoppholdForm: Formvalues is not a valid Utenlandsopphold on submit.');
        }
    };

    const registrerteTidsperioder: DateRange[] | undefined =
        opphold === undefined
            ? alleOpphold.map(mapFomTomToDateRange)
            : alleOpphold.filter((o) => o.id !== opphold.id).map(mapFomTomToDateRange);

    if (excludeInnlagtQuestion) {
        defaultFormValues.erBarnetInnlagt = undefined;
    }

    const initialValues = opphold
        ? utils.mapUtenlandsoppholdToFormValues(opphold, excludeInnlagtQuestion)
        : defaultFormValues;
    return (
        <Form.FormikWrapper
            initialValues={initialValues}
            onSubmit={onFormikSubmit}
            renderForm={(formik) => {
                const {
                    values: { fom, tom, landkode, erBarnetInnlagt, barnInnlagtPerioder = [] },
                } = formik;

                const hasDateStringValues = hasValue(fom) && hasValue(tom);

                const includeInnlagtPerioderQuestion =
                    hasDateStringValues && landkode !== undefined && erBarnetInnlagt === YesOrNo.YES;

                const includeInnlagtQuestion: boolean =
                    landkode !== undefined &&
                    hasValue(landkode) &&
                    !countryIsMemberOfEøsOrEfta(landkode) &&
                    !excludeInnlagtQuestion;

                const showÅrsakQuestion = erBarnetInnlagt === YesOrNo.YES && barnInnlagtPerioder.length > 0;

                return (
                    <Form.Form
                        includeButtons={true}
                        onCancel={onCancel}
                        submitButtonLabel="Ok"
                        showButtonArrows={false}
                        formErrorHandler={getFormErrorHandler(intl, 'utenlandsoppholdForm')}>
                        <Form.DateRangePicker
                            legend={intlHelper(intl, 'utenlandsopphold.form.tidsperiode.spm')}
                            disabledDateRanges={registrerteTidsperioder}
                            minDate={minDate}
                            maxDate={maxDate}
                            fromInputProps={{
                                name: UtenlandsoppholdFormFields.fom,
                                label: intlHelper(intl, 'utenlandsopphold.form.tidsperiode.fraDato'),
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
                                label: intlHelper(intl, 'utenlandsopphold.form.tidsperiode.tilDato'),
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

                        {hasDateStringValues && (
                            <FormBlock>
                                <Form.CountrySelect
                                    name={UtenlandsoppholdFormFields.landkode}
                                    label={intlHelper(intl, 'utenlandsopphold.form.land.spm')}
                                    validate={getRequiredFieldValidator()}
                                />
                            </FormBlock>
                        )}

                        {includeInnlagtQuestion && landkode && hasDateStringValues && (
                            <>
                                <FormBlock>
                                    <Form.YesOrNoQuestion
                                        name={UtenlandsoppholdFormFields.erBarnetInnlagt}
                                        legend={intlHelper(intl, 'utenlandsopphold.form.erBarnetInnlagt.spm', {
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
                                {includeInnlagtPerioderQuestion && (
                                    <FormBlock margin="l">
                                        <TidsperiodeListAndDialog
                                            name={UtenlandsoppholdFormFields.barnInnlagtPerioder}
                                            minDate={ISOStringToDate(fom)}
                                            maxDate={ISOStringToDate(tom)}
                                            validate={getListValidator({ required: true })}
                                            labels={{
                                                addLabel: intlHelper(
                                                    intl,
                                                    'utenlandsopphold.form.perioderBarnetErInnlag.addLabel',
                                                ),
                                                modalTitle: intlHelper(
                                                    intl,
                                                    'utenlandsopphold.form.perioderBarnetErInnlag.formTitle',
                                                ),
                                                listTitle: intlHelper(
                                                    intl,
                                                    'utenlandsopphold.form.perioderBarnetErInnlag.listTitle',
                                                ),
                                            }}
                                        />
                                    </FormBlock>
                                )}
                                {showÅrsakQuestion && (
                                    <>
                                        <FormBlock>
                                            <Form.RadioGroup
                                                legend={intlHelper(intl, 'utenlandsopphold.form.årsak.spm', {
                                                    land: getCountryName(landkode, intl.locale),
                                                })}
                                                name={UtenlandsoppholdFormFields.årsak}
                                                validate={getRequiredFieldValidator()}
                                                radios={[
                                                    {
                                                        value: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE,
                                                        label: intlHelper(
                                                            intl,
                                                            `utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.INNLAGT_DEKKET_NORGE}`,
                                                        ),
                                                    },
                                                    {
                                                        value: UtenlandsoppholdÅrsak.INNLAGT_DEKKET_ANNET_LAND,
                                                        label: intlHelper(
                                                            intl,
                                                            `utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.INNLAGT_DEKKET_ANNET_LAND}`,
                                                            { land: getCountryName(landkode, intl.locale) },
                                                        ),
                                                    },
                                                    {
                                                        value: UtenlandsoppholdÅrsak.ANNET,
                                                        label: intlHelper(
                                                            intl,
                                                            `utenlandsopphold.form.årsak.${UtenlandsoppholdÅrsak.ANNET}`,
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
