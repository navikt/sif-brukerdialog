import { søknadStepConfig, søknadStepOrder } from '@app/setup/soknadStepConfig';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '@app/setup/constants';
import { useFormValuesToSøknadsdata } from '@app/hooks/useFormValuesToSøknadsdata';
import { SkyraHandler, SkyraTestPage, SkyraSlug } from '@sif/surveys';
import { SøknadRouter, SøknadStepGuard } from '@sif/soknad-app';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { useAppIntl } from './i18n';
import { KvitteringPage } from './pages/kvittering/KvitteringPage';
import { VelkommenPage } from './pages/velkommen/VelkommenPage';
import { DeltBostedSteg, LegeerklæringSteg, OmBarnetSteg, OppsummeringSteg } from './steps';

export const Søknad = () => {
    const { text } = useAppIntl();
    const formValuesToSøknadsdata = useFormValuesToSøknadsdata();
    const location = useLocation();

    if (location.pathname.includes('skyra/test')) {
        return <SkyraTestPage slugs={[SkyraSlug.ekstra_omsorgsdager_kronisk_syk]} />;
    }

    return (
        <SøknadRouter
            config={søknadStepConfig}
            stepOrder={søknadStepOrder}
            ytelse={APP_YTELSE}
            versjon={MELLOMLAGRING_VERSJON}
            applicationTitle={text('application.title')}
            formValuesToSøknadsdata={formValuesToSøknadsdata}
            kvitteringElement={<KvitteringPage />}>
            <SkyraHandler />
            <Routes>
                <Route path="/" element={<VelkommenPage />} />
                <Route path="/soknad" element={<SøknadStepGuard basePath="/soknad" />}>
                    <Route path={søknadStepConfig[SøknadStepId.OM_BARNET].route} element={<OmBarnetSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.LEGEERKLÆRING].route} element={<LegeerklæringSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.DELT_BOSTED].route} element={<DeltBostedSteg />} />
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadRouter>
    );
};
