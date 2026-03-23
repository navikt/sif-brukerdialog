import { Button } from '@navikt/ds-react';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import { Kvittering } from '@sif/soknad-ui/components';
import { ApplicationPage } from '@sif/soknad-ui/pages';

import { useAppIntl } from '../../i18n';

export const KvitteringPage = () => {
    const { text } = useAppIntl();
    const path = getRequiredEnv(EnvKey.PUBLIC_PATH);

    const onRestart = () => {
        window.location.replace(path);
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
