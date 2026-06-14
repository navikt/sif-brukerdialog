import { useAppIntl } from '@app/i18n';
import { Button } from '@navikt/ds-react';
import { useSøknadAppContext } from '@sif/soknad-app';
import { Kvittering } from '@sif/soknad-ui/components';
import { ApplicationPage } from '@sif/soknad-ui/pages';

export const KvitteringPage = () => {
    const { text } = useAppIntl();
    const { basePath } = useSøknadAppContext();

    const onRestart = () => {
        window.location.replace(basePath);
    };

    return (
        <ApplicationPage
            documentTitle="Søknad om aktivitetspenger mottatt"
            applicationTitle={text('application.title')}>
            <Kvittering tittel="Vi har mottatt søknaden din om aktivitetspenger">
                <div>
                    <Button variant="secondary" onClick={onRestart}>
                        Tilbake til forsiden
                    </Button>
                </div>
            </Kvittering>
        </ApplicationPage>
    );
};
