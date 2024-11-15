import { Alert, Link } from '@navikt/ds-react';
import { CoreText } from '../../i18n/common.messages';

const VedleggTotalSizeAlert = ({ uploadLaterURL }: { uploadLaterURL?: string }) => {
    return (
        <Alert variant="warning">
            {uploadLaterURL ? (
                <CoreText
                    id="@core.formik-vedlegg-form.alert.totalSize"
                    values={{
                        Lenke: (children: React.ReactNode) => (
                            <Link target={'_blank'} rel={'noopener noreferrer'} href={uploadLaterURL}>
                                {children}
                            </Link>
                        ),
                    }}
                />
            ) : (
                <CoreText id="@core.formik-vedlegg-form.alert.totalSize.noLink" />
            )}
        </Alert>
    );
};

export default VedleggTotalSizeAlert;
