import { FileUpload, Heading, VStack } from '@navikt/ds-react';
import { useCallback, useContext } from 'react';
import {
    getErrorPropForFormikInput,
    TypedFormikFormContext,
    TypedFormInputValidationProps,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { Field, FieldProps, useFormikContext } from 'formik';
import { CoreText, useCoreIntl } from '../../i18n/common.messages';
import { getRejectedFileError } from './vedleggUtils';
import { useFileUploader, Vedlegg } from './useFileUploader';

interface Props extends TypedFormInputValidationProps<string, ValidationError> {
    fieldName: string;
    label: string;
    headingLevel?: '2' | '3' | '4';
    limits?: {
        MAX_FILES: number;
        MAX_SIZE_MB: number;
    };
}

const FormikFileUpload = ({
    label,
    fieldName,
    headingLevel = '2',
    limits = {
        MAX_FILES: 100,
        MAX_SIZE_MB: 10,
    },
    validate,
}: Props) => {
    const { values, setFieldValue } = useFormikContext<any>();
    const intl = useCoreIntl();
    const typedFormikContext = useContext(TypedFormikFormContext);

    if (!typedFormikContext) {
        throw new Error('TypedFormikFormContext is required');
    }

    const updateFiles = useCallback(
        (files: Vedlegg[]) => {
            setFieldValue(fieldName, files, false);
        },
        [setFieldValue, fieldName],
    );

    const { onSelect, removeFile, acceptedFiles, rejectedFiles } = useFileUploader({
        addedFiles: values[fieldName],
        onFilesChanged: updateFiles,
    });

    return (
        <VStack gap="6">
            <Field validate={validate ? (value: any) => validate(value, fieldName) : undefined} name={fieldName}>
                {({ field, form }: FieldProps) => {
                    const error = getErrorPropForFormikInput({
                        field,
                        form,
                        context: typedFormikContext,
                        error: undefined,
                    });
                    return (
                        <FileUpload.Dropzone
                            id={error ? fieldName : undefined} // Denne vil feile hvis det er flere med samme fieldName på samme side
                            label={label}
                            description={intl.text('@core.formikFileUpload.description', limits)}
                            maxSizeInBytes={limits.MAX_SIZE_MB * 1024 * 1024}
                            accept=".pdf, .png, .jpg, .jpeg"
                            fileLimit={{ max: limits.MAX_FILES, current: acceptedFiles.length }}
                            onSelect={onSelect}
                            error={error}
                        />
                    );
                }}
            </Field>

            {acceptedFiles.length > 0 && (
                <VStack gap="2">
                    <Heading level={headingLevel} size="xsmall">
                        <CoreText
                            id="@core.formikFileUpload.dokumenterLastetOpp.tittel"
                            values={{ antall: acceptedFiles.length }}
                        />
                    </Heading>
                    <VStack as="ul" gap="3">
                        {acceptedFiles.map((file, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={file.file}
                                onFileClick={file.info ? () => window.open(file.info?.url, '_blank') : undefined}
                                status={file.pending ? 'uploading' : undefined}
                                button={{
                                    action: 'delete',
                                    onClick: () => removeFile(file),
                                }}
                                translations={{
                                    uploading: intl.text('@core.formikFileUpload.dokumenterLastetOpp.lasterOpp'),
                                }}
                            />
                        ))}
                    </VStack>
                </VStack>
            )}

            {rejectedFiles.length > 0 && (
                <VStack gap="2">
                    <Heading level={headingLevel} size="xsmall">
                        <CoreText id="@core.formikFileUpload.dokumenterAvvist.tittel" />
                    </Heading>
                    <VStack as="ul" gap="3">
                        {rejectedFiles.map((rejected, index) => (
                            <FileUpload.Item
                                as="li"
                                key={index}
                                file={rejected.file}
                                error={getRejectedFileError(intl, rejected.reasons[0], limits)}
                                button={{
                                    action: 'delete',
                                    onClick: () => removeFile(rejected),
                                }}
                            />
                        ))}
                    </VStack>
                </VStack>
            )}
        </VStack>
    );
};

export default FormikFileUpload;
