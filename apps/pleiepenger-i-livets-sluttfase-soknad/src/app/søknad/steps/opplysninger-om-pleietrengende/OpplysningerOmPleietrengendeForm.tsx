import { Heading } from '@navikt/ds-react';
import { Søker } from '@navikt/sif-common-api';
import { useVedleggHelper } from '@navikt/sif-common-core-ds';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { isDevMode } from '@navikt/sif-common-env';
import {
    getIntlFormErrorHandler,
    getTypedFormComponents,
    resetFieldValue,
    resetFieldValues,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { getDateToday } from '@navikt/sif-common-utils';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-validation';
import { useFormikContext } from 'formik';

import { AppText, useAppIntl } from '../../../i18n';
import { ÅrsakManglerIdentitetsnummer } from '../../../types/ÅrsakManglerIdentitetsnummer';
import { YesOrNoDontKnow } from '../../../types/YesOrNoDontKnow';
import IdPart from './form-parts/IdPart';
import { opplysningerOmPleietrengendeDefaultValues } from './opplysningerOmPleietrengendeStepUtils';

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
    [OpplysningerOmPleietrengendeFormFields.pleietrengendeId]: Vedlegg[];
}

const { Form, DatePicker, TextField, RadioGroup, Checkbox } = getTypedFormComponents<
    OpplysningerOmPleietrengendeFormFields,
    OpplysningerOmPleietrengendeFormValues,
    ValidationError
>();

interface Props {
    søker: Søker;
    andreVedlegg: Vedlegg[];
    goBack?: () => void;
    isSubmitting: boolean;
}

const OpplysningerOmPleietrengendeForm = ({ andreVedlegg, søker, isSubmitting, goBack }: Props) => {
    const { text, intl } = useAppIntl();

    const { setFieldValue, values } = useFormikContext<OpplysningerOmPleietrengendeFormValues>();

    const { hasPendingUploads } = useVedleggHelper(
        values[OpplysningerOmPleietrengendeFormFields.pleietrengendeId],
        andreVedlegg,
    );
    const { harIkkeFnr, pleietrengendeId } = values;

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads || isSubmitting}
            onBack={goBack}
            runDelayedFormValidation={true}>
            <FormLayout.Guide>
                <p>
                    <AppText id="step.opplysningerOmPleietrengende.counsellorPanel.info" />
                </p>
            </FormLayout.Guide>

            <FormLayout.Questions>
                <TextField
                    name={OpplysningerOmPleietrengendeFormFields.navn}
                    label={text('step.opplysningerOmPleietrengende.spm.navn')}
                    validate={getStringValidator({ required: true, maxLength: 50 })}
                    style={{ maxWidth: '20rem' }}
                />

                <TextField
                    name={OpplysningerOmPleietrengendeFormFields.norskIdentitetsnummer}
                    label={text('step.opplysningerOmPleietrengende.spm.fnr')}
                    validate={
                        harIkkeFnr
                            ? undefined
                            : getFødselsnummerValidator({
                                  required: true,
                                  allowHnr: isDevMode(),
                                  disallowedValues: søker.fødselsnummer ? [søker.fødselsnummer] : [],
                              })
                    }
                    inputMode="numeric"
                    maxLength={11}
                    minLength={11}
                    style={{ maxWidth: '20rem' }}
                    disabled={harIkkeFnr}
                />
                <FormLayout.QuestionBleedTop>
                    <Checkbox
                        label={text('step.opplysningerOmPleietrengende.fnr.harIkkeFnr')}
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
                </FormLayout.QuestionBleedTop>

                {harIkkeFnr && (
                    <>
                        <DatePicker
                            name={OpplysningerOmPleietrengendeFormFields.fødselsdato}
                            label={text('step.opplysningerOmPleietrengende.fødselsdato')}
                            validate={(value) => {
                                const dateError = getDateValidator({
                                    required: true,
                                    max: getDateToday(),
                                })(value);

                                return dateError;
                            }}
                            maxDate={getDateToday()}
                            minDate={new Date('01.01.1900')}
                            dropdownCaption={true}
                        />
                        <RadioGroup
                            legend={text('step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.spm')}
                            name={OpplysningerOmPleietrengendeFormFields.årsakManglerIdentitetsnummer}
                            radios={[
                                {
                                    label: text(
                                        `step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.${ÅrsakManglerIdentitetsnummer.BOR_I_UTLANDET}`,
                                    ),
                                    value: ÅrsakManglerIdentitetsnummer.BOR_I_UTLANDET,
                                },
                                {
                                    label: text(
                                        `step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.${ÅrsakManglerIdentitetsnummer.ANNET}`,
                                    ),
                                    value: ÅrsakManglerIdentitetsnummer.ANNET,
                                },
                            ]}
                            validate={getRequiredFieldValidator()}></RadioGroup>
                        <div>
                            <Heading level="2" size="medium">
                                <AppText id="step.opplysningerOmPleietrengende.id.tittel" />
                            </Heading>
                            <p>
                                <AppText id="step.opplysningerOmPleietrengende.id.info" />
                            </p>
                            <IdPart pleietrengendeId={pleietrengendeId} andreVedlegg={andreVedlegg} />
                        </div>
                    </>
                )}

                <RadioGroup
                    legend={text('steg.opplysningerOmPleietrengende.flereSokere.spm')}
                    name={OpplysningerOmPleietrengendeFormFields.flereSokere}
                    validate={getRequiredFieldValidator()}
                    description={
                        <ExpandableInfo
                            title={text('steg.opplysningerOmPleietrengende.flereSokere.spm.description.tittle')}>
                            {text('steg.opplysningerOmPleietrengende.flereSokere.spm.description')}
                        </ExpandableInfo>
                    }
                    radios={[
                        {
                            label: text(`step.tidsrom.flereSokere.ja`),
                            value: YesOrNoDontKnow.YES,
                        },
                        {
                            label: text(`step.tidsrom.flereSokere.nei`),
                            value: YesOrNoDontKnow.NO,
                        },
                        {
                            label: text(`step.tidsrom.flereSokere.usikker`),
                            value: YesOrNoDontKnow.DO_NOT_KNOW,
                        },
                    ]}
                />
            </FormLayout.Questions>
        </Form>
    );
};

export default OpplysningerOmPleietrengendeForm;
