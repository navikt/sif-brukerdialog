import { useAppIntl } from '@app/i18n';
import { SøknadKvitteringPage } from '@sif/soknad-ui';
import { getAppEnv } from '../../setup/appEnv';

export const Kvittering = () => {
    const { text } = useAppIntl();
    return (
        <SøknadKvitteringPage
            documentTitle={text('kvittering.documentTitle')}
            applicationTitle={text('application.title')}
            infoTittel={text('kvittering.title')}
            infoMelding={text('kvittering.message')}
            appRootUrl={getAppEnv().PUBLIC_PATH}
        />
    );
};
