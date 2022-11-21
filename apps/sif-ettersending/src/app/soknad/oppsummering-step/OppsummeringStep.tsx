import { BodyLong, Panel } from '@navikt/ds-react';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import TextareaSummary from '@navikt/sif-common-core-ds/lib/components/textarea-summary/TextareaSummary';
import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { FormikValidationErrorSummary } from '@navikt/sif-common-formik-ds/lib';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useFormikContext } from 'formik';
import { sendApplication } from '../../api/api';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { getRouteConfig } from '../../config/routeConfig';
import { StepID } from '../../config/stepConfig';
import { SøkerdataContext } from '../../context/ApplicantDataContext';
import { ApplicantData } from '../../types/ApplicantData';
import { SoknadApiData, YtelseTypeApi } from '../../types/SoknadApiData';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { ApplicationType } from '../../types/ApplicationType';
import { getSkjemanavn } from '../../types/skjemanavn';
import appSentryLogger from '../../utils/appSentryLogger';
import { mapFormDataToApiData } from '../../utils/mapFormDataToApiData';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';
import SummaryBlock from './SummaryBlock';
import './oppsummeringStep.css';

interface Props {
    søknadstype: ApplicationType;
    onApplicationSent: (apiValues: SoknadApiData, søkerdata: ApplicantData) => void;
}
const OppsummeringStep = ({ onApplicationSent, søknadstype }: Props) => {
    const intl = useIntl();
    const { values } = useFormikContext<SoknadFormData>();
    const søkerdata = React.useContext(SøkerdataContext);
    const { logSoknadSent, logSoknadFailed, logUserLoggedOut, logInfo } = useAmplitudeInstance();
    const [sendingInProgress, setSendingInProgress] = useState(false);
    const navigate = useNavigate();

    if (!søkerdata) {
        return null;
    }

    const {
        person: { fornavn, mellomnavn, etternavn, fødselsnummer },
    } = søkerdata;

    const apiValues = mapFormDataToApiData(values, søknadstype, intl.locale as Locale);
    async function sendApiData(data: SoknadApiData, søker: ApplicantData) {
        const skjemanavn = getSkjemanavn(søknadstype);
        try {
            await sendApplication(data);
            await logSoknadSent(skjemanavn);
            await logInfo({ 'Antall vedlegg sendt': data.vedlegg.length });
            onApplicationSent(apiValues, søker);
        } catch (error) {
            if (isForbidden(error) || isUnauthorized(error)) {
                await logUserLoggedOut('Logget ut ved innsending');
                navigateToLoginPage(søknadstype);
            } else {
                await logSoknadFailed(skjemanavn);
                appSentryLogger.logApiError(error);
                navigate(getRouteConfig(søknadstype).ERROR_PAGE_ROUTE);
            }
        }
    }

    return (
        <ApplicationStep
            id={StepID.OPPSUMMERING}
            onValidFormSubmit={() => {
                setTimeout(() => {
                    setSendingInProgress(true);
                    sendApiData(apiValues, søkerdata);
                });
            }}
            validationSummary={<FormikValidationErrorSummary />}
            buttonDisabled={sendingInProgress || apiValues.søknadstype === YtelseTypeApi.ukjent}
            showButtonSpinner={sendingInProgress}>
            <SifGuidePanel>
                <BodyLong>
                    <FormattedMessage id="steg.oppsummering.info" />
                </BodyLong>
            </SifGuidePanel>
            <Block margin="xl">
                <Panel border={true}>
                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.søker.header')}>
                        <div>{formatName(fornavn, etternavn, mellomnavn)}</div>
                        <div>
                            {intlHelper(intl, 'steg.oppsummering.fødselsnummer')}: {fødselsnummer}
                        </div>
                    </SummaryBlock>

                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.typeSøknad.tittel')}>
                        {intlHelper(intl, `steg.oppsummering.typeSøknad.type.${apiValues.søknadstype}`)}
                    </SummaryBlock>

                    {apiValues.beskrivelse && (
                        <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.hvaGjelder.header')}>
                            <TextareaSummary text={apiValues.beskrivelse} />
                        </SummaryBlock>
                    )}

                    <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.dokumenter.header')}>
                        <UploadedDocumentsList includeDeletionFunctionality={false} />
                    </SummaryBlock>
                </Panel>
            </Block>

            <Block margin="l">
                <ApplicationFormComponents.ConfirmationCheckbox
                    label={intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger')}
                    name={SoknadFormField.harBekreftetOpplysninger}
                    validate={getCheckedValidator()}
                />
            </Block>
        </ApplicationStep>
    );
};

export default OppsummeringStep;
