import { useAppContext } from '@app/context/AppContext';
import { useAppIntl } from '@app/i18n';
import { SøknadVelkommenPage } from '@sif/soknad-app';

import OmSøknaden from './OmSoknaden';
import { Todo } from '../../components/Todo';

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
                        <Todo>Tekst er ikke skrevet</Todo>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique quo a laudantium debitis
                        quas perferendis minus corporis facilis iusto, inventore maxime magnam facere beatae veritatis
                        vel asperiores molestias, fugit consequatur?
                    </>
                ),
            }}>
            <OmSøknaden />
        </SøknadVelkommenPage>
    );
};
