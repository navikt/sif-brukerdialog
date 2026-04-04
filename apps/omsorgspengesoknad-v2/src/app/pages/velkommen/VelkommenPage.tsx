import { AppText, useAppIntl } from '@app/i18n';
import { søknadStepConfig, søknadStepOrder } from '@app/setup/config/soknadStepConfig';
import { useSøknadMellomlagring, useSøknadsflyt, useSøknadStore } from '@app/setup/hooks';
import { BodyLong, VStack } from '@navikt/ds-react';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { StartPage } from '@sif/soknad-ui/pages';
import { useNavigate } from 'react-router-dom';

import OmSøknaden from './om-søknaden/OmSøknaden';

export const VelkommenPage = () => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const søknadState = useSøknadStore((s) => s.søknadState);
    const { startSøknad } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { opprettMellomlagring, isPending } = useSøknadMellomlagring();

    const handleStart = async (harForståttRettigheterOgPlikter: true) => {
        const førsteStegId = søknadStepOrder[0];
        const førsteSteg = søknadStepConfig[førsteStegId];
        clearSøknadFormValues();
        startSøknad(førsteStegId, harForståttRettigheterOgPlikter);
        await opprettMellomlagring();
        navigate(`/soknad/${førsteSteg.route}`);
    };

    return (
        <StartPage
            onStart={handleStart}
            isPending={isPending}
            guide={{
                navn: søknadState?.søker.fornavn || '',
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
            }}
            title={text('page.velkommen.sidetittel')}>
            <OmSøknaden />
        </StartPage>
    );
};
