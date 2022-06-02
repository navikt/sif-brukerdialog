import { Alert } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { fileSizeIsValid } from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import prettyBytes from 'pretty-bytes';

interface Props {
    filesThatDidntGetUploaded: File[];
}

const FileUploadErrors = ({ filesThatDidntGetUploaded }: Props) => {
    if (filesThatDidntGetUploaded.length === 0) {
        return null;
    }

    return (
        <Alert variant="warning">
            <FormattedMessage id="fileUploadErrors.part1" />
            <ul>
                {filesThatDidntGetUploaded.map(({ name, size, type }) => {
                    return (
                        <li key={name}>
                            {name}
                            {type}
                            {size && !fileSizeIsValid(size) && (
                                <div className="text-small">
                                    Fila er for stor ({prettyBytes(size)}). Maks filstørrelse er {prettyBytes(10000000)}
                                    .
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </Alert>
    );
};

export default FileUploadErrors;
