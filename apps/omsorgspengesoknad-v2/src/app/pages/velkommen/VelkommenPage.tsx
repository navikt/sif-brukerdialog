import { useAppIntl } from '@app/i18n';
import { søknadStepConfig, søknadStepOrder } from '@app/setup/config/soknadStepConfig';
import { useSøknadMellomlagring, useSøknadsflyt, useSøknadStore } from '@app/setup/hooks';
import { BodyLong, Link, VStack } from '@navikt/ds-react';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { StartPage } from '@sif/soknad-ui/pages';
import { useNavigate } from 'react-router-dom';

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
                            Du kan søke om ekstra omsorgsdager hvis barnet ditt har en kronisk sykdom eller
                            funksjonshemming som gir deg høyere risiko for fravær fra arbeid.
                        </BodyLong>
                        <BodyLong>
                            Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din.{' '}
                            <Link href="https://www.nav.no/endringer">
                                Les mer om viktigheten av å gi riktige opplysninger.
                            </Link>
                        </BodyLong>
                    </VStack>
                ),
            }}
            title={text('application.title')}>
            <span />
        </StartPage>
    );
};
