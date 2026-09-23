import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '@app/setup/constants';
import { søknadStepConfig, søknadStepOrder } from '@app/setup/soknadStepConfig';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { formValuesToSøknadsdata } from '@app/utils/formValuesToSøknadsdata';
import { SøknadRouter, SøknadStepGuard } from '@sif/soknad-app';
import { LoadingPage } from '@sif/soknad-ui';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Kvittering } from './content/kvittering/Kvittering';
import { Velkommen } from './content/velkommen/Velkommen';
import { useAppIntl } from './i18n';
import { getAppEnv } from './setup/appEnv';
import { BarnForm, BostedForm, KontonummerForm, MedlemskapForm, OppsummeringSteg } from './steps';

const ApmTestPage = lazy(() => import('./content/apm-test/ApmTestPage'));

export const Søknad = () => {
    const env = getAppEnv();
    const { text } = useAppIntl();

    return (
        <SøknadRouter
            config={søknadStepConfig}
            stepOrder={søknadStepOrder}
            ytelse={APP_YTELSE}
            versjon={MELLOMLAGRING_VERSJON}
            applicationTitle={text('application.title')}
            formValuesToSøknadsdata={formValuesToSøknadsdata}
            kvitteringElement={<Kvittering />}
            loadingElement={<LoadingPage applicationTitle={text('application.title')} />}>
            <Routes>
                <Route path="/" element={<Velkommen />} />
                {env.ENV !== 'production' && (
                    <Route
                        path="/apm-test"
                        element={
                            <Suspense fallback={null}>
                                <ApmTestPage />
                            </Suspense>
                        }
                    />
                )}
                <Route path="/soknad" element={<SøknadStepGuard basePath="/soknad" />}>
                    <Route path={søknadStepConfig[SøknadStepId.KONTONUMMER].route} element={<KontonummerForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.BOSTED].route} element={<BostedForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.MEDLEMSKAP].route} element={<MedlemskapForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.BARN].route} element={<BarnForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadRouter>
    );
};
