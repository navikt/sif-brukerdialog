import { useAppIntl } from '@app/i18n';
import { SøknadKvitteringPage } from '@sif/soknad-ui';

export const Kvittering = () => {
    const { text } = useAppIntl();
    return (
        <SøknadKvitteringPage
            documentTitle={text('kvittering.documentTitle')}
            applicationTitle={text('application.title')}
            tittel={text('kvittering.title')}
            appRootUrl={import.meta.env.BASE_URL}
        />
    );
};
