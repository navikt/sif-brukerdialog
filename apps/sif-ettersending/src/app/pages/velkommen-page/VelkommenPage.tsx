import { Søker } from '@navikt/sif-common-api';
import { SoknadVelkommenPage } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';
import { useSoknadContext } from '../../soknad/SoknadContext';
import { Søknadstype } from '../../types/Søknadstype';
import OmSøknaden from './OmSøknaden';

interface Props {
    søknadstype: Søknadstype;
    søker: Søker;
}

const VelkommenPage = ({ søknadstype, søker }: Props) => {
    const { text } = useAppIntl();
    const { startSoknad } = useSoknadContext();

    return (
        <SoknadVelkommenPage
            title={text(`application.title.${søknadstype}`)}
            onStartSøknad={startSoknad}
            submitButtonLabel={text('ettersendelse.samtykkeForm.submitButtonLabel')}
            guide={{
                navn: søker.fornavn,
                content: <AppText id="page.velkommen.guide.ingress" />,
            }}>
            <OmSøknaden />
        </SoknadVelkommenPage>
    );
};

export default VelkommenPage;
