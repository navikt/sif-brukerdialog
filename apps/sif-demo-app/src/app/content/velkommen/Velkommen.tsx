import { useAppContext } from '@app/context/AppContext';
import { useAppIntl } from '@app/i18n';
import { SøknadVelkommenPage } from '@sif/soknad-app';

import OmSøknaden from './OmSoknaden';

export const Velkommen = () => {
    const { text } = useAppIntl();
    const { søker } = useAppContext();

    return (
        <SøknadVelkommenPage
            title={text('application.title')}
            guide={{
                navn: søker.fornavn || '',
                content: (
                    <>
                        <p>{text('page.velkommen.guide.ingress')}</p>
                    </>
                ),
            }}>
            <OmSøknaden />
        </SøknadVelkommenPage>
    );
};
