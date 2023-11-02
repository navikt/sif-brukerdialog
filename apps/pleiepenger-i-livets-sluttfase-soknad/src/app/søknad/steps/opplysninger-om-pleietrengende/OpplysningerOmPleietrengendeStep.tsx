import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import {
    ValidationError,
    getTypedFormComponents,
    resetFieldValue,
    resetFieldValues,
} from '@navikt/sif-common-formik-ds/lib';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { dateToday } from '@navikt/sif-common-utils/lib';
import { FormattedMessage, useIntl } from 'react-intl';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { YesOrNoDontKnow } from '../../../types/YesOrNoDontKnow';
import { ÅrsakManglerIdentitetsnummer } from '../../../types/ÅrsakManglerIdentitetsnummer';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import SøknadStep from '../../SøknadStep';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import IdPart from './form-parts/IdPart';
import {
    getOpplysningerOmPleietrengendeStepInitialValues,
    getOpplysningerOmPleietrengendeSøknadsdataFromFormValues,
    opplysningerOmPleietrengendeDefaultValues,
} from './opplysningerOmPleietrengendeStepUtils';

export enum OpplysningerOmPleietrengendeFormFields {
    navn = 'navn',
    flereSokere = 'flereSokere',
    norskIdentitetsnummer = 'norskIdentitetsnummer',
    harIkkeFnr = 'harIkkeFnr',
    årsakManglerIdentitetsnummer = 'årsakManglerIdentitetsnummer',
    fødselsdato = 'fødselsdato',
    pleietrengendeId = 'pleietrengendeId',
}

export interface OpplysningerOmPleietrengendeFormValues {
    [OpplysningerOmPleietrengendeFormFields.flereSokere]?: YesOrNoDontKnow;
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

                                <FormBlock>
                                    <RadioGroup
                                        legend={intlHelper(intl, 'steg.opplysningerOmPleietrengende.flereSokere.spm')}
                                        name={OpplysningerOmPleietrengendeFormFields.flereSokere}
                                        validate={getRequiredFieldValidator()}
                                        description={
                                            <ExpandableInfo
                                                title={intlHelper(
                                                    intl,
                                                    'steg.opplysningerOmPleietrengende.flereSokere.spm.description.tittle',
                                                )}>
                                                {intlHelper(
                                                    intl,
                                                    'steg.opplysningerOmPleietrengende.flereSokere.spm.description',
                                                )}
                                            </ExpandableInfo>
                                        }
                                        radios={[
                                            {
                                                label: intlHelper(intl, `step.tidsrom.flereSokere.ja`),
                                                value: YesOrNoDontKnow.YES,
                                            },
                                            {
                                                label: intlHelper(intl, `step.tidsrom.flereSokere.nei`),
                                                value: YesOrNoDontKnow.NO,
                                            },
                                            {
                                                label: intlHelper(intl, `step.tidsrom.flereSokere.usikker`),
                                                value: YesOrNoDontKnow.DO_NOT_KNOW,
                                            },
                                        ]}
                                    />
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
