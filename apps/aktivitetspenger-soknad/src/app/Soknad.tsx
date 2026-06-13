import { søknadStepConfig, søknadStepOrder } from '@app/setup/config/soknadStepConfig';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '@app/setup/constants';
import { SøknadRouter, SøknadStepGuard } from '@sif/soknad-app';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppIntl } from './i18n';
import { KvitteringPage, VelkommenPage } from './pages';
import { BarnForm, BostedForm, BostedUtlandForm, KontonummerForm, OppsummeringSteg, StartdatoForm } from './steps';

export const Søknad = () => {
    const { text } = useAppIntl();

    return (
        <SøknadRouter
            config={søknadStepConfig}
            stepOrder={søknadStepOrder}
            ytelse={APP_YTELSE}
            versjon={MELLOMLAGRING_VERSJON}
            applicationTitle={text('application.title')}
            kvitteringElement={<KvitteringPage />}>
            <Routes>
                <Route path="/" element={<VelkommenPage />} />
                <Route path="/soknad" element={<SøknadStepGuard basePath="/soknad" />}>
                    <Route path={søknadStepConfig[SøknadStepId.STARTDATO].route} element={<StartdatoForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.KONTONUMMER].route} element={<KontonummerForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.BOSTED].route} element={<BostedForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.BOSTED_UTLAND].route} element={<BostedUtlandForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.BARN].route} element={<BarnForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadRouter>
    );
};
