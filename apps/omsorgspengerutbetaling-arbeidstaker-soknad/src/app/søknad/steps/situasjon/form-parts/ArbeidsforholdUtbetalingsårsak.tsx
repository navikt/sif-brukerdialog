import React from 'react';
import { useIntl } from 'react-intl';
import { useFormikContext } from 'formik';
import PictureScanningGuide from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/PictureScanningGuide';
import { Arbeidsforhold, Utbetalingsårsak, ÅrsakNyoppstartet } from '../../../../types/ArbeidsforholdTypes';
import { ArbeidsforholdFormFields, SituasjonFormValues } from '../SituasjonStep';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { ValidationError, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import {
    ValidateStringError,
    getRequiredFieldValidator,
    getStringValidator,
} from '@navikt/sif-common-formik-ds/src/validation';
import { AppFieldValidationErrors } from '../../../../utils/validations';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
// import { valuesToAlleDokumenterISøknaden } from '../../../../utils/attachmentUtils';
import FormikFileUploader from '../../../../components/formik-file-uploader/FormikFileUploader';
import { ApiEndpoint } from '../../../../api/api';
import FileUploadErrors from '@navikt/sif-common-core-ds/src/components/file-upload-errors/FileUploadErrors';
import { ValidateAttachmentsErrors, validateAttachments } from '../../../../utils/validateAttachments';
import { validateAll } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { relocateToLoginPage } from '../../../../utils/navigationUtils';
import ArbeidsforholdAttachmentList from './ArbeidsforholdAttachmentList';

const { RadioGroup, Textarea } = getTypedFormComponents<ArbeidsforholdFormFields, Arbeidsforhold, ValidationError>();

interface Props {
    arbeidsforhold: Arbeidsforhold;
    parentFieldName: string;
}

const ArbeidsforholdUtbetalingsårsak = ({ arbeidsforhold, parentFieldName }: Props) => {
    const intl = useIntl();
    const { values, setFieldValue } = useFormikContext<SituasjonFormValues>();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);

    const getFieldName = (field: ArbeidsforholdFormFields) => `${parentFieldName}.${field}` as ArbeidsforholdFormFields;

    const utbetalingsårsak: Utbetalingsårsak | undefined = arbeidsforhold.utbetalingsårsak;
    const arbeidsgivernavn = arbeidsforhold.navn;

    const attachments: Attachment[] = React.useMemo(() => {
        return arbeidsforhold ? arbeidsforhold.dokumenter : [];
    }, [arbeidsforhold]);

    // const alleDokumenterISøknaden: Attachment[] = valuesToAlleDokumenterISøknaden(values);
    const ref = React.useRef({ attachments });

    React.useEffect(() => {
        const hasPendingAttachments = attachments.find((a) => a.pending === true);
        if (hasPendingAttachments) {
            return;
        }
        if (attachments.length !== ref.current.attachments.length) {
            setFieldValue(
                `arbeidsforhold.${parentFieldName}.${ArbeidsforholdFormFields.dokumenter}` as ArbeidsforholdFormFields,
                attachments,
            );
        }
        ref.current = {
            attachments,
        };
    }, [attachments, setFieldValue, values, parentFieldName]);

    return (
        <>
            <FormBlock>
                <RadioGroup
                    radios={[
                        {
                            label: intlHelper(
                                intl,
                                'step.situasjon.arbeidsforhold.utbetalingsårsak.nyoppstartetHosArbeidsgiver',
                            ),
                            value: Utbetalingsårsak.nyoppstartetHosArbeidsgiver,
                            'data-testid': 'arbeidsforhold-utbetalingsårsak-nyoppstartetHosArbeidsgiver',
                        },
                        {
                            label: intlHelper(
                                intl,
                                'step.situasjon.arbeidsforhold.utbetalingsårsak.arbeidsgiverKonkurs',
                            ),
                            value: Utbetalingsårsak.arbeidsgiverKonkurs,
                            'data-testid': 'arbeidsforhold-utbetalingsårsak-arbeidsgiverKonkurs',
                        },
                        {
                            label: intlHelper(
                                intl,
                                'step.situasjon.arbeidsforhold.utbetalingsårsak.konfliktMedArbeidsgiver',
                            ),
                            value: Utbetalingsårsak.konfliktMedArbeidsgiver,
                            'data-testid': 'arbeidsforhold-utbetalingsårsak-konfliktMedArbeidsgiver',
                        },
                    ]}
                    legend={intlHelper(intl, 'step.situasjon.arbeidsforhold.utbetalingsårsak.spm')}
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
                            label={intlHelper(
                                intl,
                                'step.situasjon.arbeidsforhold.utbetalingsårsak.konfliktMedArbeidsgiver.forklaring',
                            )}
                            data-testid="konfliktMedArbeidsgiver-forklaring"
                        />
                    </FormBlock>

                    <FormBlock>
                        <FormikFileUploader
                            attachments={attachments}
                            name={getFieldName(ArbeidsforholdFormFields.dokumenter)}
                            buttonLabel={intlHelper(intl, 'step.situasjon.arbeidsforhold.utbetalingsårsak.vedlegg')}
                            apiEndpoint={ApiEndpoint.vedlegg}
                            onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                            onFileInputClick={() => {
                                setFilesThatDidntGetUploaded([]);
                            }}
                            validate={(attachments: Attachment[] = []) => {
                                return validateAll<ValidateAttachmentsErrors | ValidationError>([
                                    // () => validateAttachments([...attachments, ...andreVedlegg]),
                                    () => validateAttachments([...attachments]),
                                ]);
                            }}
                            onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                        />
                    </FormBlock>
                    <div data-testid="legeerklæring-liste">
                        <ArbeidsforholdAttachmentList
                            wrapNoAttachmentsInBlock={true}
                            dokumenter={attachments}
                            fieldName={getFieldName(ArbeidsforholdFormFields.dokumenter)}
                            includeDeletionFunctionality={true}
                        />
                    </div>
                    <Block margin={'l'}>
                        <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
                    </Block>

                    <Block margin={'l'}>
                        <PictureScanningGuide />
                    </Block>
                </>
            )}
            {utbetalingsårsak === Utbetalingsårsak.nyoppstartetHosArbeidsgiver && (
                <>
                    <FormBlock>
                        <RadioGroup
                            radios={[
                                {
                                    label: intlHelper(
                                        intl,
                                        'step.situasjon.arbeidsforhold.årsakMinde4Uker.jobbetHosAnnenArbeidsgiver',
                                    ),
                                    value: ÅrsakNyoppstartet.jobbetHosAnnenArbeidsgiver,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-jobbetHosAnnenArbeidsgiver',
                                },
                                {
                                    label: intlHelper(
                                        intl,
                                        'step.situasjon.arbeidsforhold.årsakMinde4Uker.varFrilanser',
                                    ),
                                    value: ÅrsakNyoppstartet.varFrilanser,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-varFrilanser',
                                },
                                {
                                    label: intlHelper(
                                        intl,
                                        'step.situasjon.arbeidsforhold.årsakMinde4Uker.varSelvstendige',
                                    ),
                                    value: ÅrsakNyoppstartet.varSelvstendige,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-varSelvstendige',
                                },
                                {
                                    label: intlHelper(
                                        intl,
                                        'step.situasjon.arbeidsforhold.årsakMinde4Uker.søkteAndreUtbetalinger',
                                    ),
                                    value: ÅrsakNyoppstartet.søkteAndreUtbetalinger,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-søkteAndreUtbetalinger',
                                },
                                {
                                    label: intlHelper(
                                        intl,
                                        'step.situasjon.arbeidsforhold.årsakMinde4Uker.arbeidIUtlandet',
                                    ),
                                    value: ÅrsakNyoppstartet.arbeidIUtlandet,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-arbeidIUtlandet',
                                },
                                {
                                    label: intlHelper(
                                        intl,
                                        'step.situasjon.arbeidsforhold.årsakMinde4Uker.utøvdeVerneplikt',
                                    ),
                                    value: ÅrsakNyoppstartet.utøvdeVerneplikt,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-utøvdeVerneplikt',
                                },
                                {
                                    label: intlHelper(intl, 'step.situasjon.arbeidsforhold.årsakMinde4Uker.annet'),
                                    value: ÅrsakNyoppstartet.annet,
                                    'data-testid': 'nyoppstartetHosArbeidsgiver-annet',
                                },
                            ]}
                            legend={intlHelper(intl, 'step.situasjon.arbeidsforhold.årsakMinde4Uker.spm')}
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
