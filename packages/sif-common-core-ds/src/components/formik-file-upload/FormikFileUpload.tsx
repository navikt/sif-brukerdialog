import { FileRejectionReason, FileUpload, Heading, VStack } from '@navikt/ds-react';
import { useCallback, useContext } from 'react';
import {
    getErrorPropForFormikInput,
    TypedFormikFormContext,
    TypedFormInputValidationProps,
    ValidationError,
} from '@navikt/sif-common-formik-ds';
import { Field, FieldProps, useFormikContext } from 'formik';
import { CoreIntlShape, CoreText, useCoreIntl } from '../../i18n/common.messages';
import { useFileUploader, Vedlegg } from './useFileUploader';

type FileUploadLimits = {
    MAX_FILES: number;
    MAX_SIZE_MB: number;
};

interface Props extends TypedFormInputValidationProps<string, ValidationError> {
    fieldName: string;
    label: string;
    description?: string;
    headingLevel?: '2' | '3' | '4';
    limits?: {
        MAX_FILES: number;
        MAX_SIZE_MB: number;
    };
}

const FormikFileUpload = ({
    label,
    fieldName,
    limits = {
        MAX_FILES: 10,
        MAX_SIZE_MB: 10,
    },
    headingLevel = '2',
    validate,
}: Props) => {
    const MAX_SIZE = limits.MAX_SIZE_MB * 1024 * 1024;
    const { values, setFieldValue } = useFormikContext<any>();
    const intl = useCoreIntl();

    const context = useContext(TypedFormikFormContext);
    if (!context) {
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
                    const error = getErrorPropForFormikInput({ field, form, context, error: undefined });
                    return (
                        <FileUpload.Dropzone
                            id={error ? fieldName : undefined} // Denne vil feile hvis det er flere med samme fieldName på samme side
                            label={label}
                            description={intl.text('@core.formikFileUpload.description', limits)}
                            maxSizeInBytes={MAX_SIZE}
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
                                href={file.pending || !file.info ? undefined : file.info.url}
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
                                error={getRejectedError(intl, rejected.reasons[0], limits)}
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

const getRejectedError = (
    { text }: CoreIntlShape,
    reason: FileRejectionReason | string,
    limits: FileUploadLimits,
): string => {
    switch (reason) {
        case 'fileType':
            return text('@core.formikFileUpload.file-upload.error.fileType', limits);
        case 'fileSize':
            return text('@core.formikFileUpload.file-upload.error.fileSize', limits);
        default:
            throw new Error(`Ukjent feil: ${reason}`);
    }
};
