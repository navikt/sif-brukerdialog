import { OmsorgspengerutbetalingSNFriApp } from '@navikt/sif-app-register';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { SoknadVelkommenPage } from '@navikt/sif-common-soknad-ds';
import { useAppIntl } from '../../i18n';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import OmSøknaden from './OmSøknaden';
import VelkommenGuideContent from './VelkommenGuideContent';

const VelkommenPage = () => {
    const { text } = useAppIntl();
    const {
        state: { søker },
        dispatch,
    } = useSøknadContext();

    const { logSoknadStartet } = useAmplitudeInstance();

    const startSøknad = async () => {
        await logSoknadStartet(OmsorgspengerutbetalingSNFriApp.key);
        dispatch(actionsCreator.startSøknad());
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.DINE_BARN));
    };
    return (
        <SoknadVelkommenPage
            title={text('page.velkommen.sidetittel')}
            guide={{ navn: søker.fornavn, content: <VelkommenGuideContent /> }}
            onStartSøknad={startSøknad}>
            <OmSøknaden />
        </SoknadVelkommenPage>
    );
};

export default VelkommenPage;
