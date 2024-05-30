import { Alert, Link } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';

const AdvarselSamletDokumentstørrelse = () => {
    const intl = useIntl();
    return (
        <Alert variant="warning">
            <AppText
                id="dokumenter.advarsel.totalstørrelse"
                values={{
                    Lenke: (children: React.ReactNode) => (
                        <Link target={'_blank'} rel={'noopener noreferrer'} href={getLenker(intl.locale).ettersend}>
                            {children}
                        </Link>
                    ),
                }}
            />
        </Alert>
    );
};

export default AdvarselSamletDokumentstørrelse;
