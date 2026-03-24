import { søknadStepConfig, søknadStepOrder } from '@app/setup/config/søknadStepConfig';
import { useSøknadsflyt, useSøknadMellomlagring, useSøknadStore } from '@app/setup/hooks';
import { BodyLong, Link, VStack } from '@navikt/ds-react';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { StartPage } from '@sif/soknad-ui/pages';
import { useNavigate } from 'react-router-dom';

import { useAppIntl } from '../../i18n';
import OmSøknaden from './OmSøknaden';

export const VelkommenPage = () => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const søknadState = useSøknadStore((s) => s.søknadState);
    const { startSøknad } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const handleStart = async (harForståttRettigheterOgPlikter: true) => {
        const førsteStegId = søknadStepOrder[0];
        const førsteSteg = søknadStepConfig[førsteStegId];
        clearSøknadFormValues();
        startSøknad(førsteStegId, harForståttRettigheterOgPlikter);
        await lagreSøknad();
        navigate(`/soknad/${førsteSteg.route}`);
    };

    return (
        <StartPage
            onStart={handleStart}
            isPending={isPending}
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
        </StartPage>
    );
};
