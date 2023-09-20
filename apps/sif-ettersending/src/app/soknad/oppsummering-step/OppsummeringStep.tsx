import { Alert, BodyLong, Panel } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isFailure, isPending } from '@devexperts/remote-data-ts';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import TextareaSummary from '@navikt/sif-common-core-ds/lib/atoms/textarea-summary/TextareaSummary';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useFormikContext } from 'formik';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { ApplicationType } from '../../types/ApplicationType';
import { Person } from '../../types/Person';
import { YtelseTypeApi } from '../../types/SoknadApiData';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { mapFormDataToApiData } from '../../utils/mapFormDataToApiData';
import { useSoknadContext } from '../SoknadContext';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import SummaryBlock from './SummaryBlock';
import './oppsummeringStep.css';

interface Props {
    soknadId: string;
    søknadstype: ApplicationType;
    søker: Person;
}

const OppsummeringStep = ({ soknadId, søknadstype, søker }: Props) => {
    const intl = useIntl();
    const { sendSoknadStatus, sendSoknad, resetSendSøknadStatus } = useSoknadContext();
    const { values } = useFormikContext<SoknadFormData>();
    const { fornavn, mellomnavn, etternavn, fødselsnummer } = søker;
    const apiValues = mapFormDataToApiData(soknadId, values, søknadstype, intl);

    useEffectOnce(() => {
        resetSendSøknadStatus();
    });

    return (
        <SoknadFormStep
            id={StepID.OPPSUMMERING}
            søknadstype={søknadstype}
            includeValidationSummary={false}
            showButtonSpinner={isPending(sendSoknadStatus.status)}
            submitButtonLabel={intlHelper(intl, 'step.sendButtonLabel')}
            buttonDisabled={
                isPending(sendSoknadStatus.status) ||
                apiValues === undefined ||
                apiValues.søknadstype === YtelseTypeApi.ukjent
            }
            onSendSoknad={apiValues ? () => sendSoknad(apiValues) : undefined}>
            <SifGuidePanel>
                <BodyLong>
                    <FormattedMessage id="steg.oppsummering.info" />
                </BodyLong>
            </SifGuidePanel>
            <Block margin="xl">
                <div data-testid="oppsummering">
                    <Panel border={true}>
                        <SummaryBlock header={intlHelper(intl, 'steg.oppsummering.søker.header')}>
                            <p>{formatName(fornavn, etternavn, mellomnavn)}</p>
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
                            <div data-testid="vedlegg-liste">
                                <UploadedDocumentsList includeDeletionFunctionality={false} />
                            </div>
                        </SummaryBlock>
                    </Panel>
                </div>
            </Block>

            <Block margin="l">
                <SoknadFormComponents.ConfirmationCheckbox
                    label={
                        <span data-testid="bekreft-label">
                            {intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger')}
                        </span>
                    }
                    name={SoknadFormField.harBekreftetOpplysninger}
                    validate={getCheckedValidator()}
                />
            </Block>

            {isFailure(sendSoknadStatus.status) && (
                <FormBlock>
                    {sendSoknadStatus.failures === 1 && (
                        <Alert variant="error">
                            <FormattedMessage id="step.oppsummering.sendMelding.feilmelding.førsteGang" />
                        </Alert>
                    )}
                    {sendSoknadStatus.failures === 2 && (
                        <Alert variant="error">
                            <FormattedMessage id="step.oppsummering.sendMelding.feilmelding.andreGang" />
                        </Alert>
                    )}
                </FormBlock>
            )}
        </SoknadFormStep>
    );
};

export default OppsummeringStep;
