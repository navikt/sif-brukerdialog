import { useAppIntl } from '@app/i18n';
import { useAppContext } from '@app/context/AppContext';
import { StartPage } from '@sif/soknad-ui/pages';
import { useStartSøknad } from '@sif/soknad-app';

import OmSøknaden from './OmSoknaden';

export const VelkommenPage = () => {
    const { text } = useAppIntl();
    const { søker } = useAppContext();
    const { startSøknad } = useStartSøknad();

    const handleStart = async (harForståttRettigheterOgPlikter: true) => {
        await startSøknad({ harForståttRettigheterOgPlikter });
    };

    return (
        <StartPage
            onStart={handleStart}
            isPending={false}
            guide={{
                navn: søker.fornavn || '',
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
