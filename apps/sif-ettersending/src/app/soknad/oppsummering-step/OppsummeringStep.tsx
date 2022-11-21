import { BodyLong, Panel } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import TextareaSummary from '@navikt/sif-common-core-ds/lib/components/textarea-summary/TextareaSummary';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useFormikContext } from 'formik';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { YtelseTypeApi } from '../../types/SoknadApiData';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { ApplicationType } from '../../types/ApplicationType';
import { mapFormDataToApiData } from '../../utils/mapFormDataToApiData';
import SummaryBlock from './SummaryBlock';
import './oppsummeringStep.css';
import { Person } from '../../types/Person';
import { useSoknadContext } from '../SoknadContext';
import SoknadFormStep from '../SoknadFormStep';
import { isPending } from '@devexperts/remote-data-ts';
import SoknadFormComponents from '../SoknadFormComponents';
import { StepID } from '../soknadStepsConfig';

interface Props {
    soknadId: string;
    søknadstype: ApplicationType;
    søker: Person;
}

const OppsummeringStep = ({ soknadId, søknadstype, søker }: Props) => {
    const intl = useIntl();
    const { sendSoknadStatus, sendSoknad } = useSoknadContext();
    const { values } = useFormikContext<SoknadFormData>();
    const { fornavn, mellomnavn, etternavn, fødselsnummer } = søker;
    const apiValues = mapFormDataToApiData(soknadId, values, søknadstype, intl);

    return (
        <SoknadFormStep
            id={StepID.OPPSUMMERING}
            søknadstype={søknadstype}
            includeValidationSummary={false}
            showButtonSpinner={isPending(sendSoknadStatus.status)}
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
                <SoknadFormComponents.ConfirmationCheckbox
                    label={intlHelper(intl, 'steg.oppsummering.bekrefterOpplysninger')}
                    name={SoknadFormField.harBekreftetOpplysninger}
                    validate={getCheckedValidator()}
                />
            </Block>
        </SoknadFormStep>
    );
};

export default OppsummeringStep;
