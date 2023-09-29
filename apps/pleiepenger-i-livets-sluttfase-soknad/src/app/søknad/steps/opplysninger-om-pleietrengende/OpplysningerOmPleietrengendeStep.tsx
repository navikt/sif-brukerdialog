import { FormattedMessage, useIntl } from 'react-intl';
import { dateToday } from '@navikt/sif-common-utils/lib';
import { ÅrsakManglerIdentitetsnummer } from '../../../types/ÅrsakManglerIdentitetsnummer';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import {
    getTypedFormComponents,
    resetFieldValue,
    resetFieldValues,
    ValidationError,
} from '@navikt/sif-common-formik-ds/lib';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-common-formik-ds/lib/validation';
import IdPart from './form-parts/IdPart';
import { Heading } from '@navikt/ds-react';
import {
    getOpplysningerOmPleietrengendeStepInitialValues,
    getOpplysningerOmPleietrengendeSøknadsdataFromFormValues,
    opplysningerOmPleietrengendeDefaultValues,
} from './opplysningerOmPleietrengendeStepUtils';

export enum OpplysningerOmPleietrengendeFormFields {
    navn = 'navn',
    norskIdentitetsnummer = 'norskIdentitetsnummer',
    harIkkeFnr = 'harIkkeFnr',
    årsakManglerIdentitetsnummer = 'årsakManglerIdentitetsnummer',
    fødselsdato = 'fødselsdato',
    pleietrengendeId = 'pleietrengendeId',
}

export interface OpplysningerOmPleietrengendeFormValues {
    [OpplysningerOmPleietrengendeFormFields.navn]: string;
    [OpplysningerOmPleietrengendeFormFields.norskIdentitetsnummer]?: string;
    [OpplysningerOmPleietrengendeFormFields.harIkkeFnr]: boolean;
    [OpplysningerOmPleietrengendeFormFields.årsakManglerIdentitetsnummer]?: ÅrsakManglerIdentitetsnummer;
    [OpplysningerOmPleietrengendeFormFields.fødselsdato]?: string;
    [OpplysningerOmPleietrengendeFormFields.pleietrengendeId]: Attachment[];
}

const { FormikWrapper, Form, DatePicker, TextField, RadioGroup, Checkbox } = getTypedFormComponents<
    OpplysningerOmPleietrengendeFormFields,
    OpplysningerOmPleietrengendeFormValues,
    ValidationError
>();

const OpplysningerOmPleietrengendeStep = () => {
    const intl = useIntl();

    const {
        state: { søknadsdata, søker },
    } = useSøknadContext();

    const stepId = StepId.OPPLYSNINGER_OM_PLEIETRENGENDE;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OpplysningerOmPleietrengendeFormValues) => {
        const OpplysningerOmPleietrengendeSøknadsdata =
            getOpplysningerOmPleietrengendeSøknadsdataFromFormValues(values);
        if (OpplysningerOmPleietrengendeSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOpplysningerOmPleietrengende(OpplysningerOmPleietrengendeSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state });
        },
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getOpplysningerOmPleietrengendeStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values: { harIkkeFnr, pleietrengendeId }, setFieldValue }) => {
                    const hasPendingUploads: boolean =
                        (pleietrengendeId || []).find((a) => a.pending === true) !== undefined;
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={hasPendingUploads || isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <SifGuidePanel>
                                    <p>
                                        <FormattedMessage id="step.opplysningerOmPleietrengende.counsellorPanel.info" />
                                    </p>
                                </SifGuidePanel>
                                <FormBlock>
                                    <TextField
                                        name={OpplysningerOmPleietrengendeFormFields.navn}
                                        label={intlHelper(intl, 'step.opplysningerOmPleietrengende.spm.navn')}
                                        validate={getStringValidator({ required: true, maxLength: 50 })}
                                        style={{ maxWidth: '20rem' }}
                                        data-testid="opplysningerOmPleietrengende.spm.navn"
                                    />

                                    <FormBlock>
                                        <TextField
                                            name={OpplysningerOmPleietrengendeFormFields.norskIdentitetsnummer}
                                            label={intlHelper(intl, 'step.opplysningerOmPleietrengende.spm.fnr')}
                                            validate={
                                                harIkkeFnr
                                                    ? undefined
                                                    : getFødselsnummerValidator({
                                                          required: true,
                                                          disallowedValues: søker.fødselsnummer
                                                              ? [søker.fødselsnummer]
                                                              : [],
                                                      })
                                            }
                                            inputMode="numeric"
                                            maxLength={11}
                                            minLength={11}
                                            style={{ maxWidth: '20rem' }}
                                            disabled={harIkkeFnr}
                                            data-testid="opplysningerOmPleietrengende.spm.fnr"
                                        />
                                        <Block margin="m">
                                            <Checkbox
                                                label={intlHelper(
                                                    intl,
                                                    'step.opplysningerOmPleietrengende.fnr.harIkkeFnr',
                                                )}
                                                name={OpplysningerOmPleietrengendeFormFields.harIkkeFnr}
                                                afterOnChange={(newValue) => {
                                                    if (newValue) {
                                                        resetFieldValue(
                                                            OpplysningerOmPleietrengendeFormFields.norskIdentitetsnummer,
                                                            setFieldValue,
                                                            opplysningerOmPleietrengendeDefaultValues,
                                                        );
                                                    } else {
                                                        resetFieldValues(
                                                            [
                                                                OpplysningerOmPleietrengendeFormFields.årsakManglerIdentitetsnummer,
                                                                OpplysningerOmPleietrengendeFormFields.norskIdentitetsnummer,
                                                                OpplysningerOmPleietrengendeFormFields.fødselsdato,
                                                            ],
                                                            setFieldValue,
                                                            opplysningerOmPleietrengendeDefaultValues,
                                                        );
                                                    }
                                                }}
                                                data-testid="opplysningerOmPleietrengende.fnr.harIkkeFnr"
                                            />
                                        </Block>
                                    </FormBlock>
                                    {harIkkeFnr && (
                                        <>
                                            <FormBlock>
                                                <DatePicker
                                                    name={OpplysningerOmPleietrengendeFormFields.fødselsdato}
                                                    label={intlHelper(
                                                        intl,
                                                        'step.opplysningerOmPleietrengende.fødselsdato',
                                                    )}
                                                    validate={(value) => {
                                                        const dateError = getDateValidator({
                                                            required: true,
                                                            max: dateToday,
                                                        })(value);

                                                        return dateError;
                                                    }}
                                                    maxDate={dateToday}
                                                    minDate={new Date('01.01.1900')}
                                                    dropdownCaption={true}
                                                    data-testid="opplysningerOmPleietrengende.fødselsdato"
                                                />
                                            </FormBlock>
                                            <FormBlock>
                                                <RadioGroup
                                                    legend={intlHelper(
                                                        intl,
                                                        'step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.spm',
                                                    )}
                                                    name={
                                                        OpplysningerOmPleietrengendeFormFields.årsakManglerIdentitetsnummer
                                                    }
                                                    radios={Object.keys(ÅrsakManglerIdentitetsnummer).map((årsak) => ({
                                                        label: intlHelper(
                                                            intl,
                                                            `step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.${årsak}`,
                                                        ),
                                                        value: årsak,
                                                        'data-testid': `årsakManglerIdentitetsnummer.${årsak}`,
                                                    }))}
                                                    validate={getRequiredFieldValidator()}></RadioGroup>
                                            </FormBlock>
                                            <FormBlock>
                                                <Heading level="2" size="medium">
                                                    <FormattedMessage id="step.opplysningerOmPleietrengende.id.tittel" />
                                                </Heading>
                                                <Block>
                                                    <FormattedMessage id="step.opplysningerOmPleietrengende.id.info" />
                                                </Block>
                                                <IdPart />
                                            </FormBlock>
                                        </>
                                    )}
                                </FormBlock>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default OpplysningerOmPleietrengendeStep;
