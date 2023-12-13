import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import OmSøknaden from './OmSøknaden';
import VelkommenGuide from './VelkommenGuide';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/src/modules/samtykke-form/SamtykkeForm';
import { OmsorgsdagerAleneomsorgApp } from '@navikt/sif-app-register';

const VelkommenPage = () => {
    const intl = useIntl();
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
        <Page title={intlHelper(intl, 'application.title')}>
            <VelkommenGuide navn={søker.fornavn} />

            <OmSøknaden />

            <SamtykkeForm onValidSubmit={startSøknad} />
        </Page>
    );
};

export default VelkommenPage;
