import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { Søknadsdata } from '@app/types/Soknadsdata';
import { useAppContext } from '@app/context/AppContext';
import { SøknadStepForm } from '@sif/soknad-app';
import { FormSummary, InlineMessage } from '@navikt/ds-react';
import { dateFormatter, formatName } from '@sif/utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { SøknadStep, useSøknadSendt, useSøknadsdata } from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui';
import { PersistedVedlegg } from '@sif/soknad-forms';
import { VedleggSummaryList } from '@sif/soknad-ui/components';
import { useForm } from 'react-hook-form';

import { useSendSøknad } from '../../hooks/useSendSoknad';
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

    const { søker, barn: registrerteBarn } = useAppContext();
    const søknadsdata = useSøknadsdata<Søknadsdata>();

    const { onSøknadSendt } = useSøknadSendt();
    const methods = useForm<FormValues>({ defaultValues: {} });
    const { isPending, mutateAsync } = useSendSøknad();

    const dto = getSøknadApiDataFromSøknad({
        søker,
        registrerteBarn,
        søknadsdata,
        språk: 'nb',
    });

    const harBekreftetOpplysninger = methods.watch(FormFields.bekrefterOpplysninger);

    const onSubmit = async () => {
        if (!dto) return;
        await mutateAsync({ ...dto, harBekreftetOpplysninger });
        await onSøknadSendt();
    };

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                isPending={isPending}
                isFinalSubmit={true}
                submitDisabled={!dto}
                submitLabel={text('oppsummeringSteg.submitLabel')}>
                {!dto && (
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">
                                <AppText id="oppsummeringSteg.feil.tittel" />
                            </FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Value>
                                    <AppText id="oppsummeringSteg.feil.innhold" />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary>
                )}
                {dto && (
                    <FormLayout.Summary>
                        <OmSøkerOppsummering />
                        <OmBarnetOppsummering />
                        <BostedOppsummering />
                        <VedleggOppsummering vedlegg={søknadsdata[SøknadStepId.VEDLEGG]?.vedlegg ?? []} />
                    </FormLayout.Summary>
                )}
                <FormLayout.Questions>
                    <Checkbox
                        name={FormFields.bekrefterOpplysninger}
                        validate={validateField(FormFields.bekrefterOpplysninger, getCheckedValidator())}>
                        <AppText id="oppsummeringSteg.bekrefterOpplysninger.label" />
                    </Checkbox>
                </FormLayout.Questions>
            </SøknadStepForm>
        </SøknadStep>
    );
};

const OmSøkerOppsummering = () => {
    const { text } = useAppIntl();
    const { søker } = useAppContext();

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
    const { barn: registrerteBarn } = useAppContext();
    const søknadsdata = useSøknadsdata<Søknadsdata>();
    const valgtBarn = søknadsdata[SøknadStepId.BARN];
    const barn = registrerteBarn.find((item) => item.aktørId === valgtBarn?.barnetSøknadenGjelder);

    if (!barn) return null;

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
    const bosted = useSøknadsdata<Søknadsdata>()[SøknadStepId.BOSTED];

    if (!bosted) return null;

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">{text('oppsummeringSteg.bosted.header')}</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.bosted.erBosattITrondheim" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {bosted.erBosattITrondheim ? text('oppsummeringSteg.ja') : text('oppsummeringSteg.nei')}
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
