import { useAppContext } from '@app/context/AppContext';
import { useAppIntl } from '@app/i18n';
import { SøknadVelkommenPage } from '@sif/soknad-app';

import { OmSøknaden } from './OmSøknaden';
import { VelkommenGuideContent } from './VelkommenGuideContent';

export const Velkommen = () => {
    const { søker } = useAppContext();
    const { text } = useAppIntl();

    return (
        <SøknadVelkommenPage
            title={text('application.title')}
            guide={{
                navn: søker.fornavn,
                content: <VelkommenGuideContent />,
            }}>
            <OmSøknaden />
        </SøknadVelkommenPage>
    );
};
