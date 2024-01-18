import { Alert, BodyShort } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import prettyBytes from 'pretty-bytes';
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
            <FormattedMessage id="common.fileUploadError" />
            <ul>
                {filesThatDidntGetUploaded.map(({ name, size, type }) => {
                    return (
                        <li key={name}>
                            {name}
                            {type}
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
