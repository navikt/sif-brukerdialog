import { Alert, FormSummary, VStack } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import { isFailure, isPending } from '@devexperts/remote-data-ts';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import VedleggSummaryList from '@navikt/sif-common-core-ds/src/components/vedlegg-summary-list/VedleggSummaryList';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Sitat, TextareaSvar } from '@navikt/sif-common-ui';
import { prettifyDate } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../i18n';
import { DokumentType } from '../../types/DokumentType';
import { Person } from '../../types/Person';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import { mapFormDataToApiData } from '../../utils/mapFormDataToApiData';
import { useSoknadContext } from '../SoknadContext';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import './oppsummeringStep.css';

interface Props {
    soknadId: string;
    søknadstype: Søknadstype;
    søker: Person;
}

const OppsummeringStep = ({ soknadId, søknadstype, søker }: Props) => {
    const intl = useIntl();
    const { text } = useAppIntl();
    const { sendSoknadStatus, sendSoknad, resetSendSøknadStatus } = useSoknadContext();
    const { values } = useFormikContext<SoknadFormData>();
    const { fornavn, mellomnavn, etternavn, fødselsnummer } = søker;
    const apiValues = mapFormDataToApiData(søker.fødselsnummer, soknadId, values, intl);

    useEffectOnce(() => {
        resetSendSøknadStatus();
    });

    return (
        <SoknadFormStep
            id={StepID.OPPSUMMERING}
            søknadstype={søknadstype}
            includeValidationSummary={false}
            showButtonSpinner={isPending(sendSoknadStatus.status)}
            submitButtonLabel={text('step.sendButtonLabel')}
            isFinalSubmit={true}
            buttonDisabled={isPending(sendSoknadStatus.status) || apiValues === undefined}
            onSendSoknad={apiValues ? () => sendSoknad(apiValues) : undefined}>
            <SifGuidePanel>
                <AppText id="steg.oppsummering.info" />
            </SifGuidePanel>
            <Block margin="xl">
                <div data-testid="oppsummering">
                    <VStack gap="8">
                        <FormSummary>
                            <FormSummary.Header>
                                <FormSummary.Heading level="2">
                                    <AppText id="steg.oppsummering.søker.header" />
                                </FormSummary.Heading>
                            </FormSummary.Header>
                            <FormSummary.Answers>
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="steg.oppsummering.navn" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>{formatName(fornavn, etternavn, mellomnavn)}</FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="steg.oppsummering.fødselsnummer" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>{fødselsnummer}</FormSummary.Value>
                                </FormSummary.Answer>
                            </FormSummary.Answers>
                        </FormSummary>
                        <FormSummary>
                            <FormSummary.Header>
                                <FormSummary.Heading level="2">
                                    <AppText id="steg.oppsummering.ettersendelse.header" />
                                </FormSummary.Heading>
                            </FormSummary.Header>
                            <FormSummary.Answers>
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="steg.oppsummering.typeSøknad.tittel" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>{apiValues.ytelseTittel}</FormSummary.Value>
                                </FormSummary.Answer>
                                {apiValues.ettersendelsesType === DokumentType.legeerklæring && (
                                    <FormSummary.Answer>
                                        <FormSummary.Label>
                                            <AppText id="steg.oppsummering.dokumentType.header" />
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <AppText id="steg.oppsummering.dokumentType.legeerklæring" />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                )}

                                {apiValues.pleietrengende !== undefined && (
                                    <FormSummary.Answer>
                                        <FormSummary.Label>
                                            <AppText id="steg.oppsummering.barn.spm" />
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            {values.valgteRegistrertBarn && (
                                                <div>
                                                    {text('steg.oppsummering.barn.registretBarnInfo', {
                                                        navn: values.valgteRegistrertBarn?.barnetsNavn,
                                                        fødselsdato: prettifyDate(
                                                            values.valgteRegistrertBarn?.barnetsFødselsdato,
                                                        ),
                                                    })}
                                                </div>
                                            )}
                                            {apiValues.pleietrengende?.norskIdentitetsnummer && (
                                                <div data-testid="fnr-barn">
                                                    {text('steg.oppsummering.barn.fnr', {
                                                        fnr: apiValues.pleietrengende?.norskIdentitetsnummer,
                                                    })}
                                                </div>
                                            )}
                                            {!apiValues.pleietrengende?.norskIdentitetsnummer &&
                                                !apiValues.pleietrengende?.aktørId && (
                                                    <div>{text('steg.oppsummering.barn.harIkkefnr')}</div>
                                                )}
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                )}
                                {apiValues.beskrivelse && (
                                    <FormSummary.Answer>
                                        <FormSummary.Label>
                                            <AppText id="steg.oppsummering.hvaGjelder.header" />
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <Sitat>
                                                <TextareaSvar text={apiValues.beskrivelse} />
                                            </Sitat>
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                )}
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        <AppText id="steg.oppsummering.dokumenter.header" />
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <div data-testid="vedlegg-liste">
                                            <VedleggSummaryList vedlegg={values.dokumenter} />
                                        </div>
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            </FormSummary.Answers>
                        </FormSummary>
                    </VStack>
                </div>
            </Block>

            <Block margin="l">
                <SoknadFormComponents.ConfirmationCheckbox
                    label={<span data-testid="bekreft-label">{text('steg.oppsummering.bekrefterOpplysninger')}</span>}
                    name={SoknadFormField.harBekreftetOpplysninger}
                    validate={getCheckedValidator()}
                />
            </Block>

            {isFailure(sendSoknadStatus.status) && (
                <FormBlock>
                    {sendSoknadStatus.failures === 1 && (
                        <Alert variant="error">
                            <AppText id="steg.oppsummering.sendMelding.feilmelding.førsteGang" />
                        </Alert>
                    )}
                    {sendSoknadStatus.failures === 2 && (
                        <Alert variant="error">
                            <AppText id="steg.oppsummering.sendMelding.feilmelding.andreGang" />
                        </Alert>
                    )}
                </FormBlock>
            )}
        </SoknadFormStep>
    );
};

export default OppsummeringStep;
