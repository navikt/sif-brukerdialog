import { Alert, BodyShort } from '@navikt/ds-react';
import prettyBytes from 'pretty-bytes';
import { CoreText } from '../../i18n/common.messages';
import { fileSizeIsValid } from '../../utils/attachmentUtils';

interface Props {
    filesThatDidntGetUploaded: File[];
}

const FileUploadErrors = ({ filesThatDidntGetUploaded }: Props) => {
    if (filesThatDidntGetUploaded.length === 0) {
        return null;
    }

    return (
        <Alert variant="warning">
            <CoreText id="@core.common.fileUploadError" />
            <ul>
                {filesThatDidntGetUploaded.map(({ name, size }) => {
                    return (
                        <li key={name}>
                            {name}
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

export default FileUploadErrors;
