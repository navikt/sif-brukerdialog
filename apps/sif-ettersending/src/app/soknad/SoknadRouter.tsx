import { useIntl } from 'react-intl';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorPage, LastAvailableStepInfo, SoknadErrorMessages, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { useFormikContext } from 'formik';
import { APPLICATION_SENDT_PAGE } from '../config/routeConfig';
import ConfirmationPage from '../pages/confirmation-page/ConfirmationPage';
import VelkommenPage from '../pages/velkommen-page/VelkommenPage';
import { Person } from '../types/Person';
import { SoknadFormData, SoknadFormField } from '../types/SoknadFormData';
import { Søknadstype } from '../types/Søknadstype';
import { getAvailableSteps } from '../utils/routeUtils';
import BeskrivelseStep from './beskrivelse-step/BeskrivelseStep';
import DokumenterStep from './dokumenter-step/DokumenterStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import { useSoknadContext } from './SoknadContext';
import { StepID } from './soknadStepsConfig';
import ValgOmsTypeStep from './valgOmsType-step/ValgOmsTypeStep';
import BeskrivelsePPStep from './beskrivelsePP-step/BeskrivelsePPStep';
import { RegistrertBarn } from '../types/RegistrertBarn';

interface Props {
    søker: Person;
    barn?: RegistrertBarn[];
    søknadstype: Søknadstype;
    soknadId?: string;
    onKvitteringUnmount?: () => void;
}

const SoknadRouter = ({ søker, barn, søknadstype, soknadId, onKvitteringUnmount }: Props) => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();
    const { soknadStepsConfig } = useSoknadContext();
    const dokumenttype = values[SoknadFormField.dokumentType];

    const registrertBarn = barn ? barn : [];

    return (
        <Routes>
            <Route index={true} element={<Navigate to="velkommen" replace={false} />} />
            <Route path="velkommen" element={<VelkommenPage søknadstype={søknadstype} />} />
            {soknadId && (
                <>
                    <Route path={StepID.BESKRIVELSE} element={<BeskrivelseStep søknadstype={søknadstype} />} />
                    <Route
                        path={StepID.BESKRIVELSE_PP}
                        element={
                            <BeskrivelsePPStep
                                søknadstype={søknadstype}
                                søkersFødselsnummer={søker.fødselsnummer}
                                registrertBarn={registrertBarn}
                            />
                        }
                    />
                    <Route path={StepID.OMS_TYPE} element={<ValgOmsTypeStep søknadstype={søknadstype} />} />
                    <Route
                        path={StepID.DOKUMENTER}
                        element={<DokumenterStep søknadstype={søknadstype} soknadId={soknadId} søker={søker} />}
                    />
                    <Route
                        path={StepID.OPPSUMMERING}
                        element={<OppsummeringStep soknadId={soknadId} søknadstype={søknadstype} søker={søker} />}
                    />
                    <Route
                        path="*"
                        element={
                            <ErrorPage
                                contentRenderer={(): JSX.Element => {
                                    const availableSteps = getAvailableSteps(values, søknadstype);
                                    const lastAvailableStep = availableSteps.slice(-1)[0];
                                    const lastAvailableStepInfo: LastAvailableStepInfo | undefined = lastAvailableStep
                                        ? {
                                              route: soknadStepsConfig[lastAvailableStep].route,
                                              title: soknadStepUtils.getStepTexts(
                                                  intl,
                                                  soknadStepsConfig[lastAvailableStep],
                                              ).stepTitle,
                                          }
                                        : undefined;

                                    return (
                                        <SoknadErrorMessages.MissingSoknadDataError
                                            lastAvailableStep={lastAvailableStepInfo}
                                        />
                                    );
                                }}
                            />
                        }
                    />
                </>
            )}

            <Route
                path={APPLICATION_SENDT_PAGE}
                element={
                    <ConfirmationPage
                        søknadstype={søknadstype}
                        dokumenttype={dokumenttype}
                        onUnmount={onKvitteringUnmount}
                    />
                }
            />
            <Route path="*" element={soknadId === undefined ? <Navigate replace={true} to="velkommen" /> : undefined} />
        </Routes>
    );
};

export default SoknadRouter;
