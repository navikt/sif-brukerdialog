import { Button } from '@navikt/ds-react';
import { Kvittering } from '@sif/soknad-ui/components';
import { ApplicationPage } from '@sif/soknad-ui/pages';
import { PropsWithChildren } from 'react';

interface SøknadKvitteringPageProps {
    documentTitle: string;
    applicationTitle: string;
    tittel: string;
    /** URL til app-roten. Send inn import.meta.env.BASE_URL fra appen. */
    appRootUrl?: string;
    restartLabel?: string;
}

export const SøknadKvitteringPage = ({
    documentTitle,
    applicationTitle,
    tittel,
    appRootUrl,
    restartLabel = 'Tilbake til forsiden',
    children,
}: PropsWithChildren<SøknadKvitteringPageProps>) => {
    return (
        <ApplicationPage documentTitle={documentTitle} applicationTitle={applicationTitle}>
            <Kvittering tittel={tittel}>
                {children}
                {appRootUrl && (
                    <div>
                        <Button variant="secondary" onClick={() => window.location.replace(appRootUrl)}>
                            {restartLabel}
                        </Button>
                    </div>
                )}
            </Kvittering>
        </ApplicationPage>
    );
};
