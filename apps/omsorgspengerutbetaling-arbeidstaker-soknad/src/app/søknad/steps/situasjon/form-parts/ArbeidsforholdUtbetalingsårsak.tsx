import { getAttachmentsValidator, useAttachmentsHelper } from '@navikt/sif-common-core-ds';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds/src';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import {
    getRequiredFieldValidator,
    getStringValidator,
    ValidateStringError,
} from '@navikt/sif-common-formik-ds/src/validation';
import { useFormikContext } from 'formik';
import { useAppIntl } from '../../../../i18n';
import getLenker from '../../../../lenker';
import { Arbeidsforhold, Utbetalingsårsak, ÅrsakNyoppstartet } from '../../../../types/ArbeidsforholdTypes';
import { relocateToLoginPage } from '../../../../utils/navigationUtils';
import { AppFieldValidationErrors } from '../../../../utils/validations';
import { ArbeidsforholdFormFields, SituasjonFormValues } from '../SituasjonStep';
import { Attachment } from '@navikt/sif-common-core-ds/src/types';

const { RadioGroup, Textarea } = getTypedFormComponents<ArbeidsforholdFormFields, Arbeidsforhold, ValidationError>();

interface Props {
    arbeidsforhold: Arbeidsforhold;
    parentFieldName: string;
    andreVedlegg: Attachment[];
}

const ArbeidsforholdUtbetalingsårsak = ({ arbeidsforhold, parentFieldName, andreVedlegg }: Props) => {
    const { text, intl } = useAppIntl();
    const { setFieldValue } = useFormikContext<SituasjonFormValues>();

    const getFieldName = (field: ArbeidsforholdFormFields) => `${parentFieldName}.${field}` as ArbeidsforholdFormFields;

    const utbetalingsårsak: Utbetalingsårsak | undefined = arbeidsforhold.utbetalingsårsak;
    const arbeidsgivernavn = arbeidsforhold.navn;

    const attachments = arbeidsforhold.dokumenter || [];

    useAttachmentsHelper(attachments, andreVedlegg, (att) => {
        setFieldValue(
            `arbeidsforhold.${parentFieldName}.${ArbeidsforholdFormFields.dokumenter}` as ArbeidsforholdFormFields,
            att,
        );
    });

    return (
        <>
            <FormBlock>
                <RadioGroup
                    radios={[
                        {
                            label: text('step.situasjon.arbeidsforhold.utbetalingsårsak.nyoppstartetHosArbeidsgiver'),
                            value: Utbetalingsårsak.nyoppstartetHosArbeidsgiver,
                            'data-testid': 'arbeidsforhold-utbetalingsårsak-nyoppstartetHosArbeidsgiver',
                        },
                        {
                            label: text('step.situasjon.arbeidsforhold.utbetalingsårsak.arbeidsgiverKonkurs'),
                            value: Utbetalingsårsak.arbeidsgiverKonkurs,
                            'data-testid': 'arbeidsforhold-utbetalingsårsak-arbeidsgiverKonkurs',
                        },
                        {
                            label: text('step.situasjon.arbeidsforhold.utbetalingsårsak.konfliktMedArbeidsgiver'),
                            value: Utbetalingsårsak.konfliktMedArbeidsgiver,
                            'data-testid': 'arbeidsforhold-utbetalingsårsak-konfliktMedArbeidsgiver',
                        },
                    ]}
                    legend={text('step.situasjon.arbeidsforhold.utbetalingsårsak.spm')}
                    name={getFieldName(ArbeidsforholdFormFields.utbetalingsårsak)}
                    validate={(value) => {
                        return getRequiredFieldValidator()(value === Utbetalingsårsak.ikkeBesvart ? undefined : value)
                            ? {
                                  key: AppFieldValidationErrors.arbeidsforhold_utbetalings_årsak_no_Value,
                                  values: { arbeidsgivernavn },
                                  keepKeyUnaltered: true,
                              }
                            : undefined;
                    }}
                />
            </FormBlock>
            {utbetalingsårsak === Utbetalingsårsak.konfliktMedArbeidsgiver && (
                <>
                    <FormBlock>
                        <Textarea
                            name={getFieldName(ArbeidsforholdFormFields.konfliktForklaring)}
                            validate={(value) => {
                                const error = getStringValidator({ minLength: 5, maxLength: 2000, required: true })(
                                    value,
                                );
                                switch (error) {
                                    case ValidateStringError.stringHasNoValue:
                                        return {
                                            key: 'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringHasNoValue',
                                            keepKeyUnaltered: true,
                                            values: { min: 5, maks: 2000 },
                                        };
                                    case ValidateStringError.stringIsTooShort:
                                        return {
                                            key: 'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooShort',
                                            values: { min: 5, maks: 2000 },
                                            keepKeyUnaltered: true,
                                        };
                                    case ValidateStringError.stringIsTooLong:
                                        return {
                                            key: 'validation.arbeidsforhold.utbetalingsårsak.konfliktForklaring.stringIsTooLong',
                                            values: { min: 5, maks: 2000 },
                                            keepKeyUnaltered: true,
                                        };
                                }
                                return error;
                            }}
                            maxLength={2000}
                            label={text(
                                'step.situasjon.arbeidsforhold.utbetalingsårsak.konfliktMedArbeidsgiver.forklaring',
                            )}
                            data-testid="konfliktMedArbeidsgiver-forklaring"
                        />
                    </FormBlock>
                    <FormBlock>
                        <FormikAttachmentForm
                            attachments={attachments}
                            otherAttachments={andreVedlegg}
                            fieldName={getFieldName(ArbeidsforholdFormFields.dokumenter)}
                            labels={{
                                addLabel: text('step.situasjon.arbeidsforhold.utbetalingsårsak.vedlegg'),
                                noAttachmentsText: text('step.situasjon.vedleggsliste.ingenDokumenterLastetOpp'),
                            }}
                            validate={getAttachmentsValidator(
                                {
                                    errors: {
                                        noAttachmentsUploaded: {
                                            keyPrefix: 'validation.arbeidsforhold.utbetalingsårsak.vedlegg',
                                            keepKeyUnaltered: true,
                                            values: { arbeidsgivernavn },
                                        },
                                    },
                                    useDefaultMessages: true,
                                },
                                andreVedlegg,
                            )}
                            uploadLaterURL={getLenker(intl.locale).ettersending}
                            onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                        />
                    </FormBlock>
                </>
            )}
            {utbetalingsårsak === Utbetalingsårsak.nyoppstartetHosArbeidsgiver && (
                <>
                    <FormBlock>
                        <RadioGroup
                            radios={[
                                {
                                    label: text(
                                        'step.situasjon.arbeidsforhold.årsakMinde4Uker.jobbetHosAnnenArbeidsgiver',
                                    ),
                                    value: ÅrsakNyoppstartet.jobbetHosAnnenArbeidsgiver,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-jobbetHosAnnenArbeidsgiver',
                                },
                                {
                                    label: text('step.situasjon.arbeidsforhold.årsakMinde4Uker.varFrilanser'),
                                    value: ÅrsakNyoppstartet.varFrilanser,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-varFrilanser',
                                },
                                {
                                    label: text('step.situasjon.arbeidsforhold.årsakMinde4Uker.varSelvstendige'),
                                    value: ÅrsakNyoppstartet.varSelvstendige,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-varSelvstendige',
                                },
                                {
                                    label: text('step.situasjon.arbeidsforhold.årsakMinde4Uker.søkteAndreUtbetalinger'),
                                    value: ÅrsakNyoppstartet.søkteAndreUtbetalinger,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-søkteAndreUtbetalinger',
                                },
                                {
                                    label: text('step.situasjon.arbeidsforhold.årsakMinde4Uker.arbeidIUtlandet'),
                                    value: ÅrsakNyoppstartet.arbeidIUtlandet,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-arbeidIUtlandet',
                                },
                                {
                                    label: text('step.situasjon.arbeidsforhold.årsakMinde4Uker.utøvdeVerneplikt'),
                                    value: ÅrsakNyoppstartet.utøvdeVerneplikt,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-utøvdeVerneplikt',
                                },
                                {
                                    label: text('step.situasjon.arbeidsforhold.årsakMinde4Uker.annet'),
                                    value: ÅrsakNyoppstartet.annet,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-annet',
                                },
                            ]}
                            legend={text('step.situasjon.arbeidsforhold.årsakMinde4Uker.spm')}
                            name={getFieldName(ArbeidsforholdFormFields.årsakNyoppstartet)}
                            validate={(value) => {
                                return getRequiredFieldValidator()(value)
                                    ? {
                                          key: AppFieldValidationErrors.arbeidsforhold_årsak_mindre_4uker_no_Value,
                                          values: { arbeidsgivernavn },
                                          keepKeyUnaltered: true,
                                      }
                                    : undefined;
                            }}
                        />
                    </FormBlock>
                </>
            )}
        </>
    );
};

export default ArbeidsforholdUtbetalingsårsak;
