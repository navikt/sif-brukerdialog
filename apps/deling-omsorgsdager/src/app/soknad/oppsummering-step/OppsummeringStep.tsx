import { Alert, BodyLong } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isFailure, isPending } from '@devexperts/remote-data-ts';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import ResponsivePanel from '@navikt/sif-common-core-ds/lib/components/responsive-panel/ResponsivePanel';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { Person } from '../../types/Person';
import { Barn, SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Soknadstype';
import { verifySoknadApiData } from '../../validation/verifySoknadApiData';
import { useSoknadContext } from '../SoknadContext';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import DineBarnSummary from './DineBarnSummary';
import DinSituasjonSummary from './DinSituasjonSummary';
import MottakerSummary from './MottakerSummary';
import OmBarnaSummary from './OmBarnaSummary';
import SamværsavtaleSummary from './SamværsavtaleSummary';
import SøknadstypeSummary from './SoknadstypeSummary';
import SøkerSummary from './SøkerSummary';
import { mapFormDataToApiData } from '../../utils/map-form-data-to-api-data/mapFormDataToApiData';
import { useFormikContext } from 'formik';

type Props = {
    soknadId: string;
    søker: Person;
    barn: Barn[];
};

const OppsummeringStep: React.FunctionComponent<Props> = ({ soknadId, søker, barn }) => {
    const intl = useIntl();
    const { sendSoknadStatus, sendSoknad } = useSoknadContext();
    const { values } = useFormikContext<SoknadFormData>();
    const apiValues = mapFormDataToApiData({
        soknadId,
        locale: intl.locale,
        formData: values,
        registrerteBarn: barn,
    });

    const apiDataIsValid = apiValues !== undefined && verifySoknadApiData(apiValues);

    return (
        <SoknadFormStep
            id={StepID.OPPSUMMERING}
            showButtonSpinner={isPending(sendSoknadStatus.status)}
            buttonDisabled={isPending(sendSoknadStatus.status) || apiDataIsValid === false}
            onSendSoknad={apiValues ? (): void => sendSoknad(apiValues) : undefined}>
            <Block margin="xl">
                <SifGuidePanel>
                    <BodyLong as="div">
                        <FormattedMessage id="step.oppsummering.info" />
                    </BodyLong>
                </SifGuidePanel>

                {apiValues === undefined && (
                    <Block margin="l">
                        <Alert variant="error">
                            <FormattedMessage id="oppsummering.advarsel.ingenApiValues" />
                        </Alert>
                    </Block>
                )}

                {apiValues !== undefined && apiDataIsValid === false && (
                    <Block margin="l">
                        <Alert variant="error">
                            <FormattedMessage id="oppsummering.advarsel.invalidApiValues" />
                        </Alert>
                    </Block>
                )}
                {apiValues !== undefined && (
                    <>
                        <Block margin="xxl">
                            <ResponsivePanel border={true}>
                                <SøkerSummary søker={søker} />
                                <SøknadstypeSummary apiValues={apiValues} />
                                <DineBarnSummary apiValues={apiValues} />
                                <OmBarnaSummary apiValues={apiValues} />
                                <DinSituasjonSummary apiValues={apiValues} />
                                <MottakerSummary apiValues={apiValues} />
                                {apiValues.type === Søknadstype.fordeling && (
                                    <SamværsavtaleSummary apiValues={apiValues} />
                                )}
                            </ResponsivePanel>
                        </Block>

                        <Block margin="l">
                            <SoknadFormComponents.ConfirmationCheckbox
                                label={intlHelper(intl, 'step.oppsummering.bekrefterOpplysninger')}
                                name={SoknadFormField.harBekreftetOpplysninger}
                                validate={getCheckedValidator()}
                            />
                        </Block>
                    </>
                )}
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
