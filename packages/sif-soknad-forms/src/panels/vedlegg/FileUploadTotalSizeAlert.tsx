import { Alert, Link } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';

interface Props {
    uploadLaterURL?: string;
}

const FileUploadTotalSizeAlert = ({ uploadLaterURL }: Props) => (
    <Alert variant="warning">
        {uploadLaterURL ? (
            <SifSoknadFormsText
                id="@sifSoknadForms.vedlegg.totalSize.alert"
                values={{
                    Lenke: (children: React.ReactNode) => (
                        <Link target="_blank" rel="noopener noreferrer" href={uploadLaterURL}>
                            {children}
                        </Link>
                    ),
                }}
            />
        ) : (
            <SifSoknadFormsText id="@sifSoknadForms.vedlegg.totalSize.alert.noLink" />
        )}
    </Alert>
);

export default FileUploadTotalSizeAlert;
