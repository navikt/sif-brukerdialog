import { Alert, BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { FileDropAcceptImagesAndPdf } from '@navikt/sif-common-formik-ds';
import prettyBytes from 'pretty-bytes';
import { fileSizeIsValid } from '../../../utils/attachmentUtils';

interface Props {
    filesThatDidntGetUploaded: File[];
}

const AttachmentUploadErrors = ({ filesThatDidntGetUploaded }: Props) => {
    if (filesThatDidntGetUploaded.length === 0) {
        return null;
    }

    const isValidType = (type: string) => {
        const validTypes = Object.keys(FileDropAcceptImagesAndPdf);
        return validTypes.includes(type);
    };

    return (
        <Alert variant="warning">
            <FormattedMessage id="@core.common.fileUploadError" />
            <ul>
                {filesThatDidntGetUploaded.map(({ name, size, type }) => {
                    return (
                        <li key={name} style={{ marginBottom: '.5rem' }}>
                            {name}
                            {isValidType(type) === false && (
                                <BodyShort size="small">
                                    Fila må være av type JPG/JPEG, PNG eller PDF, men har typen <code>{type}</code>.
                                </BodyShort>
                            )}

                            {size && !fileSizeIsValid(size) && (
                                <BodyShort size="small">
                                    Fila er for stor ({prettyBytes(size)}). Maks filstørrelse er {prettyBytes(10000000)}
                                    .
                                </BodyShort>
                            )}
                        </li>
                    );
                })}
            </ul>
        </Alert>
    );
};

export default AttachmentUploadErrors;
