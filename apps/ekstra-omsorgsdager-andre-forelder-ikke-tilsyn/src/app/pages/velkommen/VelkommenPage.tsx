import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { OmsorgsdagerAnnenForelderIkkeTilsynApp } from '@navikt/sif-app-register';
import { SamtykkeForm } from '@navikt/sif-common-soknad-ds';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import OmSøknaden from './OmSøknaden';
import VelkommenGuide from './VelkommenGuide';
import { useAppIntl } from '../../i18n';

const VelkommenPage = () => {
    const { text } = useAppIntl();
    const {
        state: { søker },
        dispatch,
    } = useSøknadContext();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    const { logSoknadStartet } = useAmplitudeInstance();

    const startSøknad = async () => {
        await logSoknadStartet(OmsorgsdagerAnnenForelderIkkeTilsynApp.navn);
        dispatch(actionsCreator.startSøknad());
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.OM_ANNEN_FORELDER));
    };
    return (
        <Page title={text('application.title')}>
            <VelkommenGuide navn={søker.fornavn} />

            <OmSøknaden />

            <SamtykkeForm onValidSubmit={startSøknad} />
        </Page>
    );
};

export default VelkommenPage;
