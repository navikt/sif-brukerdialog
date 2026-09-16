import { søknadStepConfig, søknadStepOrder } from '@app/setup/soknadStepConfig';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '@app/setup/constants';
import { formValuesToSøknadsdata } from '@app/utils/formValuesToSoknadsdata';
import { SøknadRouter, SøknadStepGuard } from '@sif/soknad-app';
import { LoadingPage } from '@sif/soknad-ui';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Kvittering } from './content/kvittering/Kvittering';
import { Velkommen } from './content/velkommen/Velkommen';
import { useAppIntl } from './i18n';
import { BarnForm, BostedForm, OppsummeringSteg, VedleggForm } from './steps';

export const Søknad = () => {
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
                <Route path="/soknad" element={<SøknadStepGuard basePath="/soknad" />}>
                    <Route path={søknadStepConfig[SøknadStepId.BARN].route} element={<BarnForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.BOSTED].route} element={<BostedForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.VEDLEGG].route} element={<VedleggForm />} />
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadRouter>
    );
};
