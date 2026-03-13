import { søknadStepConfig, søknadStepOrder } from '@app/setup';
import { BodyLong, Link, VStack } from '@navikt/ds-react';
import { StartPage } from '@sif/soknad/pages';
import { useNavigate } from 'react-router-dom';

import { useSøknadContext } from '../../context/søknadContext';
import { useSøknadMellomlagring } from '../../hooks';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { useAppIntl } from '../../i18n';
import OmSøknaden from './OmSøknaden';

export const VelkommenPage = () => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const søknadState = useSøknadStore((s) => s.søknadState);
    const { clearAllFormValues, startSøknad } = useSøknadContext();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const handleStart = async (harForståttRettigheterOgPlikter: true) => {
        const førsteSteg = søknadStepConfig[søknadStepOrder[0]];
        clearAllFormValues();
        startSøknad(førsteSteg.id, harForståttRettigheterOgPlikter);
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
