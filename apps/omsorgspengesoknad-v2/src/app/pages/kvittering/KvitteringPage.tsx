import { useAppIntl } from '@app/i18n';
import { Button } from '@navikt/ds-react';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import { Kvittering } from '@sif/soknad-ui/components';
import { ApplicationPage } from '@sif/soknad-ui/pages';

export const KvitteringPage = () => {
    const { text } = useAppIntl();
    const path = getRequiredEnv(EnvKey.PUBLIC_PATH);

    const onRestart = () => {
        window.location.replace(path);
    };

    return (
        <ApplicationPage
            documentTitle="Søknad om ekstra omsorgsdager mottatt"
            applicationTitle={text('application.title')}>
            <Kvittering tittel="Vi har mottatt søknaden din om ekstra omsorgsdager">
                <div>
                    <Button variant="secondary" onClick={onRestart}>
                        Tilbake til forsiden
                    </Button>
                </div>
            </Kvittering>
        </ApplicationPage>
    );
};
