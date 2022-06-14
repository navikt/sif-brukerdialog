import React from 'react';
import { useIntl } from 'react-intl';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isFailure, isInitial, isPending, isSuccess } from '@devexperts/remote-data-ts';
import LoadWrapper from '@navikt/sif-common-core/lib/components/load-wrapper/LoadWrapper';
import ErrorPage from '@navikt/sif-common-soknad/lib/soknad-common-pages/ErrorPage';
import SoknadErrorMessages, {
    LastAvailableStepInfo,
} from '@navikt/sif-common-soknad/lib/soknad-error-messages/SoknadErrorMessages';
import soknadStepUtils from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepUtils';
import { useFormikContext } from 'formik';
import AppRoutes from '../config/routeConfig';
import KvitteringPage from '../pages/kvittering-page/KvitteringPage';
import { Person } from '../types/Person';
import { Barn, SoknadFormData } from '../types/SoknadFormData';
import { getAvailableSteps } from '../utils/getAvailableSteps';
import { mapFormDataToApiData } from '../utils/map-form-data-to-api-data/mapFormDataToApiData';
import DinSituasjonStep from './din-situasjon-step/DinSituasjonStep';
import DineBarnStep from './dine-barn-step/DineBarnStep';
import MottakerStep from './mottaker-step/MottakerStep';
import OmBarnaStep from './om-barna-step/OmBarnaStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import { useSoknadContext } from './SoknadContext';
import { StepID } from './soknadStepsConfig';
import VelkommenPage from './velkommen-page/VelkommenPage';
import SamværsavtaleStep from './samværsavtale-step/SamværsavtaleStep';

interface Props {
    soknadId?: string;
    barn?: Barn[];
    søker: Person;
}

const SoknadRoutes: React.FunctionComponent<Props> = ({ soknadId, søker, barn = [] }) => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();
    const availableSteps = getAvailableSteps(values, søker, barn);
    const { soknadStepsConfig, sendSoknadStatus } = useSoknadContext();

    const renderSoknadStep = (id: string, barn: Barn[], søker: Person, stepID: StepID): React.ReactNode => {
        switch (stepID) {
            case StepID.MOTTAKER:
                return <MottakerStep søker={søker} />;
            case StepID.DINE_BARN:
                return <DineBarnStep barn={barn} søker={søker} />;
            case StepID.OM_BARNA:
                return <OmBarnaStep barn={barn} />;
            case StepID.DIN_SITUASJON:
                return <DinSituasjonStep />;
            case StepID.SAMVÆRSAVTALE:
                return <SamværsavtaleStep />;
            case StepID.OPPSUMMERING:
                const apiValues = mapFormDataToApiData({
                    soknadId: id,
                    locale: intl.locale,
                    formData: values,
                    registrerteBarn: barn,
                });
                return <OppsummeringStep apiValues={apiValues} søker={søker} barn={barn} />;
        }
    };

    const lastAvailableStep = availableSteps.slice(-1)[0];
    const lastAvailableStepInfo: LastAvailableStepInfo | undefined = lastAvailableStep
        ? {
              route: soknadStepsConfig[lastAvailableStep].route,
              title: soknadStepUtils.getStepTexts(intl, soknadStepsConfig[lastAvailableStep]).stepTitle,
          }
        : undefined;

    return (
        <Switch>
            <Route path={AppRoutes.SOKNAD_SENT} exact={true}>
                <LoadWrapper
                    isLoading={isPending(sendSoknadStatus.status) || isInitial(sendSoknadStatus.status)}
                    contentRenderer={(): React.ReactNode => {
                        if (isSuccess(sendSoknadStatus.status)) {
                            return <KvitteringPage />;
                        }
                        if (isFailure(sendSoknadStatus.status)) {
                            return <ErrorPage />;
                        }
                        return <div>Det oppstod en feil</div>;
                    }}
                />
            </Route>
            <Route path={AppRoutes.SOKNAD} exact={true}>
                <VelkommenPage />
            </Route>
            {soknadId === undefined && <Redirect key="redirectToWelcome" to={AppRoutes.SOKNAD} />}
            {soknadId &&
                availableSteps.map((step) => {
                    return (
                        <Route
                            key={step}
                            path={soknadStepsConfig[step].route}
                            exact={true}
                            render={(): React.ReactNode => renderSoknadStep(soknadId, barn, søker, step)}
                        />
                    );
                })}
            <Route path="*">
                <ErrorPage
                    contentRenderer={(): JSX.Element => (
                        <SoknadErrorMessages.MissingSoknadDataError lastAvailableStep={lastAvailableStepInfo} />
                    )}></ErrorPage>
            </Route>
        </Switch>
    );
};
export default SoknadRoutes;
