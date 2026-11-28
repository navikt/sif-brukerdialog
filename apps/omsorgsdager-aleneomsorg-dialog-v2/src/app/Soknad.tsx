import { formValuesToSøknadsdata } from '@app/utils/formValuesToSøknadsdata';
import { SøknadProvider, SøknadStepGuard } from '@sif/soknad-app';
import { LoadingPage } from '@sif/soknad-ui';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppIntl } from './i18n';
import { Kvittering } from './pages/kvittering/Kvittering';
import { Velkommen } from './pages/velkommen/Velkommen';
import { getAppEnv } from './setup/appEnv';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from './setup/constants';
import { søknadStepConfig, søknadStepOrder } from './setup/soknadStepConfig';
import { OmOmsorgenForBarnSteg, OppsummeringSteg, TidspunktForAleneomsorgSteg } from './steps';
import { SøknadStepId } from './types/SoknadStepId';

export const Søknad = () => {
    const { text } = useAppIntl();
    const { SIF_PUBLIC_MINSIDE_URL } = getAppEnv();

    return (
        <SøknadProvider
            config={søknadStepConfig}
            stepOrder={søknadStepOrder}
            ytelse={APP_YTELSE}
            versjon={MELLOMLAGRING_VERSJON}
            applicationTitle={text('application.title')}
            resumeLaterUrl={SIF_PUBLIC_MINSIDE_URL}
            formValuesToSøknadsdata={formValuesToSøknadsdata}
            kvitteringElement={<Kvittering />}
            loadingElement={<LoadingPage applicationTitle={text('application.title')} />}>
            <Routes>
                <Route path="/" element={<Velkommen />} />
                <Route path="/soknad" element={<SøknadStepGuard basePath="/soknad" />}>
                    <Route
                        path={søknadStepConfig[SøknadStepId.OM_OMSORGEN_FOR_BARN].route}
                        element={<OmOmsorgenForBarnSteg />}
                    />
                    <Route
                        path={søknadStepConfig[SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG].route}
                        element={<TidspunktForAleneomsorgSteg />}
                    />
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadProvider>
    );
};
