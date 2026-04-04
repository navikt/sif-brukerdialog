import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadMellomlagring, useSøknadRhfForm, useSøknadsflyt, useSøknadState } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';
import { FormSummary, InlineMessage, LocalAlert } from '@navikt/ds-react';
import { dateFormatter, formatName, ISODateToDate } from '@navikt/sif-common-utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { Søker } from '@sif/api/k9-prosessering';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { FormLayout, VedleggSummaryList } from '@sif/soknad-ui/components';

import { useSendSøknad } from '../../hooks/useSendSoknad';
import { BarnSammeAdresse } from '../../types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '../../types/SøkersRelasjonTilBarnet';
import { SøknadApiData } from '../../types/SoknadApiData';
import { PersistedVedlegg } from '../../types/Soknadsdata';
import { søknadsdataToSøknadDTO } from '../../utils/soknadsdataToSoknadDTO';

enum FormFields {
    bekrefterOpplysninger = 'bekrefterOpplysninger',
}

type FormValues = {
    [FormFields.bekrefterOpplysninger]: boolean;
};

const { Checkbox } = createSifFormComponents<FormValues>();

export const OppsummeringSteg = () => {
    const stepId = SøknadStepId.OPPSUMMERING;

    const { validateField } = useSifValidate('oppsummeringForm');
    const methods = useSøknadRhfForm<FormValues>(stepId, {});

    const { setSøknadSendt } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring } = useSøknadMellomlagring();
    const state = useSøknadState();

    const { isPending, mutateAsync } = useSendSøknad();

    const dto = søknadsdataToSøknadDTO({
        søker: state.søker,
        søknadsdata: state.søknadsdata,
        språk: 'nb',
    });

    const harBekreftetOpplysninger = methods.watch(FormFields.bekrefterOpplysninger);

    const onSubmit = async () => {
        if (dto === undefined) {
            return;
        }
        await mutateAsync({ ...dto, harBekreftetOpplysninger });
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
                submitDisabled={!dto}>
                <FormLayout.Content>
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
                            <OmSøkerOppsummering søker={state.søker} />
                            <OmBarnetOppsummering dto={dto} />
                            <VedleggOppsummering
                                legeerklæring={state.søknadsdata[SøknadStepId.LEGEERKLÆRING]?.vedlegg ?? []}
                                samværsavtale={state.søknadsdata[SøknadStepId.DELT_BOSTED]?.samværsavtale}
                            />
                        </>
                    )}
                    <Checkbox
                        name={FormFields.bekrefterOpplysninger}
                        validate={validateField(FormFields.bekrefterOpplysninger, getCheckedValidator())}>
                        <AppText id="oppsummeringSteg.bekrefterOpplysninger.label" />
                    </Checkbox>
                </FormLayout.Content>
            </AppForm>
        </SøknadStep>
    );
};

const OmSøkerOppsummering = ({ søker }: { søker: Søker }) => {
    const { text } = useAppIntl();
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

type DtoUtenBekreftelse = Omit<SøknadApiData, 'harBekreftetOpplysninger'>;

const OmBarnetOppsummering = ({ dto }: { dto: DtoUtenBekreftelse }) => {
    const { text } = useAppIntl();
    const {
        barn,
        relasjonTilBarnet,
        sammeAdresse,
        kroniskEllerFunksjonshemming,
        høyereRisikoForFravær,
        høyereRisikoForFraværBeskrivelse,
    } = dto;
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">{text('oppsummeringSteg.barnet.header')}</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {barn.aktørId ? (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="oppsummeringSteg.barnet.navn" />
                            </FormSummary.Label>
                            <FormSummary.Value>{barn.navn}</FormSummary.Value>
                        </FormSummary.Answer>
                        {barn.fødselsdato ? (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummeringSteg.barnet.fødselsdato" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {dateFormatter.full(ISODateToDate(barn.fødselsdato))}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        ) : null}
                    </>
                ) : (
                    <>
                        {barn.norskIdentifikator ? (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummeringSteg.barnet.fnr" />
                                </FormSummary.Label>
                                <FormSummary.Value>{barn.norskIdentifikator}</FormSummary.Value>
                            </FormSummary.Answer>
                        ) : null}
                        {barn.navn ? (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummeringSteg.barnet.navn" />
                                </FormSummary.Label>
                                <FormSummary.Value>{barn.navn}</FormSummary.Value>
                            </FormSummary.Answer>
                        ) : null}
                        {barn.fødselsdato ? (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummeringSteg.barnet.fødselsdato" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {dateFormatter.full(ISODateToDate(barn.fødselsdato))}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        ) : null}
                        {relasjonTilBarnet ? (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummeringSteg.barnet.søkersRelasjonTilBarnet" />
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <RelasjonTilBarnetTekst relasjon={relasjonTilBarnet} />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        ) : null}
                    </>
                )}
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.barnet.sammeAdresse.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {sammeAdresse === BarnSammeAdresse.JA && text('oppsummeringSteg.barnet.sammeAdresse.ja')}
                        {sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED &&
                            text('oppsummeringSteg.barnet.sammeAdresse.jaDeltBosted')}
                        {sammeAdresse === BarnSammeAdresse.NEI && text('oppsummeringSteg.barnet.sammeAdresse.nei')}
                    </FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.barnet.kroniskEllerFunksjonshemmende.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {kroniskEllerFunksjonshemming ? text('oppsummeringSteg.ja') : text('oppsummeringSteg.nei')}
                    </FormSummary.Value>
                </FormSummary.Answer>
                {kroniskEllerFunksjonshemming ? (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <AppText id="oppsummeringSteg.barnet.høyereRisikoForFravær.header" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                {høyereRisikoForFravær ? text('oppsummeringSteg.ja') : text('oppsummeringSteg.nei')}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        {høyereRisikoForFravær && høyereRisikoForFraværBeskrivelse ? (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <AppText id="oppsummeringSteg.barnet.høyereRisikoForFraværBeskrivelse.header" />
                                </FormSummary.Label>
                                <FormSummary.Value>{høyereRisikoForFraværBeskrivelse}</FormSummary.Value>
                            </FormSummary.Answer>
                        ) : null}
                    </>
                ) : null}
            </FormSummary.Answers>
        </FormSummary>
    );
};

const VedleggOppsummering = ({
    legeerklæring,
    samværsavtale,
}: {
    legeerklæring: PersistedVedlegg[];
    samværsavtale?: PersistedVedlegg[];
}) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="oppsummeringSteg.vedlegg.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <AppText id="oppsummeringSteg.legeerklæring.header" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {legeerklæring.length === 0 ? (
                            <InlineMessage status="info">
                                <AppText id="oppsummeringSteg.vedlegg.ingenLastetOpp" />
                            </InlineMessage>
                        ) : (
                            <VedleggListe vedlegg={legeerklæring} />
                        )}
                    </FormSummary.Value>
                </FormSummary.Answer>
                {samværsavtale !== undefined ? (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <AppText id="oppsummeringSteg.samværsavtale.header" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {samværsavtale.length === 0 ? (
                                <InlineMessage status="info">
                                    <AppText id="oppsummeringSteg.vedlegg.ingenLastetOpp" />
                                </InlineMessage>
                            ) : (
                                <VedleggListe vedlegg={samværsavtale} />
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                ) : null}
            </FormSummary.Answers>
        </FormSummary>
    );
};

const VedleggListe = ({ vedlegg }: { vedlegg: PersistedVedlegg[] }) => {
    return <VedleggSummaryList vedlegg={vedlegg} />;
};

const RelasjonTilBarnetTekst = ({ relasjon }: { relasjon: SøkersRelasjonTilBarnet }): any => {
    switch (relasjon) {
        case SøkersRelasjonTilBarnet.MOR:
            return <AppText id="omBarnetSteg.relasjon.mor" />;
        case SøkersRelasjonTilBarnet.FAR:
            return <AppText id="omBarnetSteg.relasjon.far" />;
        case SøkersRelasjonTilBarnet.FOSTERFORELDER:
            return <AppText id="omBarnetSteg.relasjon.fosterforelder" />;
        case SøkersRelasjonTilBarnet.ADOPTIVFORELDER:
            return <AppText id="omBarnetSteg.relasjon.adoptivforelder" />;
    }
};
