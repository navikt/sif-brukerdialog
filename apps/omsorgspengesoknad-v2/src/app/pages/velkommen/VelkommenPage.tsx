import { AppText, useAppIntl } from '@app/i18n';
import { useAppContext } from '@app/context/AppContext';
import { BodyLong, VStack } from '@navikt/ds-react';
import { SøknadVelkommenPage } from '@sif/soknad-app';

import OmSøknaden from './om-søknaden/OmSøknaden';

export const VelkommenPage = () => {
    const { text } = useAppIntl();
    const { søker } = useAppContext();

    return (
        <SøknadVelkommenPage
            title={text('page.velkommen.sidetittel')}
            guide={{
                navn: søker.fornavn || '',
                content: (
                    <VStack gap="space-8">
                        <BodyLong>
                            <AppText id="page.velkommen.guide.ingress" />
                        </BodyLong>
                        <BodyLong>
                            <AppText id="page.velkommen.guide.tekst.1" />
                        </BodyLong>
                        <BodyLong>
                            <AppText id="page.velkommen.guide.tekst.2" />
                        </BodyLong>
                    </VStack>
                ),
            }}>
            <OmSøknaden />
        </SøknadVelkommenPage>
    );
};
