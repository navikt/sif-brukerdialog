import { Button } from '@navikt/ds-react';
import { PropsWithChildren } from 'react';
import { ApplicationPage } from '../application-page/ApplicationPage';
import { Kvittering } from '../../components';
interface SøknadKvitteringPageProps {
    documentTitle: string;
    applicationTitle: string;
    infoTittel: string;
    infoMelding?: React.ReactNode;
    /** URL til app-roten. Send inn import.meta.env.BASE_URL fra appen. */
    appRootUrl?: string;
    restartLabel?: string;
}

export const SøknadKvitteringPage = ({
    documentTitle,
    applicationTitle,
    infoTittel,
    infoMelding,
    appRootUrl,
    restartLabel = 'Tilbake til forsiden',
    children,
}: PropsWithChildren<SøknadKvitteringPageProps>) => {
    return (
        <ApplicationPage documentTitle={documentTitle} applicationTitle={applicationTitle}>
            <Kvittering infoTittel={infoTittel} infoInnhold={infoMelding}>
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
