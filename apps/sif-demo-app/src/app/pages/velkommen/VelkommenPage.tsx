import { søknadStepOrder } from '@app/setup/config/soknadStepConfig';
import { useSøknadMellomlagring, useSøknadsflyt, useSøknadStore } from '@app/setup/hooks';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { StartPage } from '@sif/soknad-ui/pages';

import { useAppIntl } from '../../i18n';
import OmSøknaden from './OmSoknaden';

export const VelkommenPage = () => {
    const { text } = useAppIntl();
    const søknadState = useSøknadStore((s) => s.søknadState);
    const { startSøknad } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const handleStart = async (harForståttRettigheterOgPlikter: true) => {
        const førsteStegId = søknadStepOrder[0];
        clearSøknadFormValues();
        await lagreSøknad();
        startSøknad(førsteStegId, harForståttRettigheterOgPlikter);
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
            <OmSøknaden />
        </StartPage>
    );
};
