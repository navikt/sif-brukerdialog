import { BodyLong, Link, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { useStepFormValues } from '../../../rammeverk';
import SoknadVelkommenPage from '../../../rammeverk/components/velkommen-page/VelkommenPage';
import { søknadStepConfig, søknadStepOrder } from '../../config/søknadStepConfig';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { useAppIntl } from '../../i18n';
import OmSøknaden from './OmSøknaden';

export const VelkommenPage = () => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const startSøknad = useSøknadStore((s) => s.startSøknad);
    const søknadState = useSøknadStore((s) => s.søknadState);
    const { clearAllStepFormValues } = useStepFormValues();

    const handleStart = () => {
        const førsteSteg = søknadStepConfig[søknadStepOrder[0]];
        clearAllStepFormValues();
        startSøknad(førsteSteg.id);
        navigate(`/soknad/${førsteSteg.route}`);
    };

    return (
        <SoknadVelkommenPage
            onStart={handleStart}
            guide={{
                navn: søknadState?.søker.fornavn || '',
                content: (
                    <>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique quo a laudantium debitis
                        quas perferendis minus corporis facilis iusto, inventore maxime magnam facere beatae veritatis
                        vel asperiores molestias, fugit consequatur?
                    </>
                ),
            }}
            title={text('application.title')}>
            <VStack gap="space-24">
                <OmSøknaden />
                <BodyLong>
                    Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din.{' '}
                    <Link href="https://www.nav.no/endringer">
                        Les mer om viktigheten av å gi riktige opplysninger.
                    </Link>
                </BodyLong>
            </VStack>
        </SoknadVelkommenPage>
    );
};
