import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorPage, LastAvailableStepInfo, SoknadErrorMessages, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import { useFormikContext } from 'formik';
import { APPLICATION_SENDT_PAGE } from '../config/routeConfig';
import KvitteringPage from '../pages/kvittering-page/KvitteringPage';
import VelkommenPage from '../pages/velkommen-page/VelkommenPage';
import { Person } from '../types/Person';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { SoknadFormData, SoknadFormField } from '../types/SoknadFormData';
import { Søknadstype } from '../types/Søknadstype';
import { getAvailableSteps } from '../utils/routeUtils';
import BeskrivelseStep from './beskrivelse-step/BeskrivelseStep';
import DokumentTypeStep from './dokument-type-step/DokumentTypeStep';
import DokumenterStep from './dokumenter-step/DokumenterStep';
import OppsummeringStep from './oppsummering-step/OppsummeringStep';
import { useSoknadContext } from './SoknadContext';
import { StepID } from './soknadStepsConfig';
import ValgOmsTypeStep from './valgOmsType-step/ValgOmsTypeStep';

interface Props {
    søker: Person;
    barn?: RegistrertBarn[];
    søknadstype: Søknadstype;
    soknadId?: string;
}

const SoknadRouter = ({ søker, barn, søknadstype, soknadId }: Props) => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();
    const { soknadStepsConfig } = useSoknadContext();
    const dokumenttype = values[SoknadFormField.dokumentType];

    const registrertBarn = barn ? barn : [];

    return (
        <Routes>
            <Route index={true} element={<Navigate to="velkommen" replace={false} />} />
            <Route path="velkommen" element={<VelkommenPage søknadstype={søknadstype} søker={søker} />} />
            {soknadId && (
                <>
                    <Route path={StepID.BESKRIVELSE} element={<BeskrivelseStep søknadstype={søknadstype} />} />
                    <Route
                        path={StepID.DOKUMENT_TYPE}
                        element={
                            <DokumentTypeStep
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
                                contentRenderer={(): ReactElement => {
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
                element={<KvitteringPage søknadstype={søknadstype} dokumenttype={dokumenttype} />}
            />
            <Route path="*" element={soknadId === undefined ? <Navigate replace={true} to="velkommen" /> : undefined} />
        </Routes>
    );
};

export default SoknadRouter;
