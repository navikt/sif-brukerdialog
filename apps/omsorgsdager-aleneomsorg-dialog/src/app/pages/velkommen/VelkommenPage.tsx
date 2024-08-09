import { OmsorgsdagerAleneomsorgApp } from '@navikt/sif-app-register';
import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude';
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

    useLogSidevisning(SIFCommonPageKey.velkommen);

    const { logSoknadStartet } = useAmplitudeInstance();

    const startSøknad = async () => {
        await logSoknadStartet(OmsorgsdagerAleneomsorgApp.navn);
        dispatch(actionsCreator.startSøknad());
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.OM_OMSORGEN_FOR_BARN));
    };
    return (
        <SoknadVelkommenPage
            onStartSøknad={startSøknad}
            guide={{
                navn: søker.fornavn,
                content: <VelkommenGuideContent />,
            }}
            title={text('application.title')}>
            <OmSøknaden />
        </SoknadVelkommenPage>
    );
};

export default VelkommenPage;
