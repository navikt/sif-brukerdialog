import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/lib/modules/samtykke-form/SamtykkeForm';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import OmSøknaden from './OmSøknaden';
import VelkommenGuide from './VelkommenGuide';
import { OmsorgsdagerKroniskApp } from '@navikt/sif-app-register';

const VelkommenPage = () => {
    const intl = useIntl();
    const {
        state: { søker },
        dispatch,
    } = useSøknadContext();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    const { logSoknadStartet } = useAmplitudeInstance();

    const startSøknad = async () => {
        await logSoknadStartet(OmsorgsdagerKroniskApp.navn);
        dispatch(actionsCreator.startSøknad());
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.OM_BARNET));
    };
    return (
        <Page title={intlHelper(intl, 'page.velkommen.sidetittel')}>
            <VelkommenGuide navn={søker.fornavn} />

            <OmSøknaden />

            <SamtykkeForm onValidSubmit={startSøknad} />
        </Page>
    );
};

export default VelkommenPage;
