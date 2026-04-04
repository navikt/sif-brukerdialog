import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/soknadStepConfig';
import { useSøknadMellomlagring, useSøknadRhfForm, useSøknadsflyt, useSøknadState } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';
import { FormSummary, InlineMessage, LocalAlert } from '@navikt/ds-react';
import { dateFormatter, formatName } from '@navikt/sif-common-utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { VedleggSummaryList } from '@sif/soknad-ui/components';

import { useSendSøknad } from '../../hooks/useSendSoknad';
import { PersistedVedlegg } from '../../types/Soknadsdata';
import { getSøknadApiDataFromSøknad } from '../../utils/soknadsdataToSoknadApiData';

enum FormFields {
    bekrefterOpplysninger = 'bekrefterOpplysninger',
}

type FormValues = {
    [FormFields.bekrefterOpplysninger]: boolean;
};

const { Checkbox } = createSifFormComponents<FormValues>();

export const OppsummeringSteg = () => {
    const stepId = SøknadStepId.OPPSUMMERING;
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('oppsummeringForm');
    const methods = useSøknadRhfForm<FormValues>(stepId, {});

    const { setSøknadSendt } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring } = useSøknadMellomlagring();
    const state = useSøknadState();
    const { isPending, mutateAsync } = useSendSøknad();

    const dto = getSøknadApiDataFromSøknad({
        søker: state.søker,
        registrerteBarn: state.barn,
        søknadsdata: state.søknadsdata,
        språk: 'nb',
    });

    const onSubmit = async (values: FormValues) => {
        if (!dto) {
            return;
        }

        await mutateAsync({
            ...dto,
            harBekreftetOpplysninger: values.bekrefterOpplysninger,
        });
        await slettMellomlagring();
        clearSøknadFormValues();
        setSøknadSendt();
    };

    return (
        <SøknadStep stepId={SøknadStepId.OPPSUMMERING}>
            <AppForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                isPending={isPending}
                isFinalSubmit={true}
                submitDisabled={!dto}
                submitLabel={text('oppsummeringSteg.submitLabel')}>
                {!dto && (
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>
                                <AppText id="oppsummeringSteg.feil.tittel" />
                            </LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>
                            <AppText id="oppsummeringSteg.feil.innhold" />
                        </LocalAlert.Content>
                    </LocalAlert>
                )}

                {dto && (
                    <>
                        <OmSøkerOppsummering />
                        <OmBarnetOppsummering />
                        <BostedOppsummering />
                        <VedleggOppsummering vedlegg={state.søknadsdata[SøknadStepId.VEDLEGG]?.vedlegg ?? []} />
                    </>
                )}

                <Checkbox
                    name={FormFields.bekrefterOpplysninger}
                    validate={validateField(FormFields.bekrefterOpplysninger, getCheckedValidator())}>
                    <AppText id="oppsummeringSteg.bekrefterOpplysninger.label" />
                </Checkbox>
            </AppForm>
        </SøknadStep>
    );
};

const OmSøkerOppsummering = () => {
    const { text } = useAppIntl();
    const { søker } = useSøknadState();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">{text('oppsummeringSteg.søker.header')}</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.søker.navn" />
                    </FormSummary.Label>
                    <FormSummary.Value>{formatName(søker)}</FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.søker.fnr" />
                    </FormSummary.Label>
                    <FormSummary.Value>{søker.fødselsnummer}</FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

const OmBarnetOppsummering = () => {
    const { text } = useAppIntl();
    const state = useSøknadState();
    const valgtBarn = state.søknadsdata[SøknadStepId.BARN];
    const barn = state.barn.find((item) => item.aktørId === valgtBarn?.barnetSøknadenGjelder);

    if (!barn) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">{text('oppsummeringSteg.barn.header')}</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.barn.navn" />
                    </FormSummary.Label>
                    <FormSummary.Value>{formatName(barn.fornavn, barn.etternavn, barn.mellomnavn)}</FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.barn.fødselsdato" />
                    </FormSummary.Label>
                    <FormSummary.Value>{dateFormatter.full(barn.fødselsdato)}</FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

const BostedOppsummering = () => {
    const { text } = useAppIntl();
    const bosted = useSøknadState().søknadsdata[SøknadStepId.BOSTED];

    if (!bosted) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">{text('oppsummeringSteg.bosted.header')}</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.bosted.borITrondheim" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {bosted.borITrondheim ? text('oppsummeringSteg.ja') : text('oppsummeringSteg.nei')}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

const VedleggOppsummering = ({ vedlegg }: { vedlegg: PersistedVedlegg[] }) => {
    const { text } = useAppIntl();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">{text('oppsummeringSteg.vedlegg.header')}</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.vedlegg.lastetOpp" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {vedlegg.length === 0 ? (
                            <InlineMessage status="info">
                                <AppText id="oppsummeringSteg.vedlegg.ingenLastetOpp" />
                            </InlineMessage>
                        ) : (
                            <VedleggSummaryList vedlegg={vedlegg} />
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};
