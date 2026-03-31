import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useSøknadState, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { BarnSammeAdresse } from '@app/types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '@app/types/SøkersRelasjonTilBarnet';
import { OmBarnetSøknadsdata } from '@app/types/Soknadsdata';
import { Alert } from '@navikt/ds-react';
import { QuestionRelatedMessage } from '@navikt/sif-common-ui';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getRequiredFieldValidator,
    getStringValidator,
    getYesOrNoValidator,
} from '@navikt/sif-validation';
import { RegistrertBarn } from '@sif/api/k9-prosessering';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { AriaLiveRegion, FormLayout } from '@sif/soknad-ui/components';
import { useEffect } from 'react';

import { toOmBarnetFormValues, toOmBarnetSøknadsdata } from './omBarnetStegUtils';
import { ANNET_BARN, OmBarnetFormFields, OmBarnetFormValues } from './types';

const { RadioGroup, TextField, Datepicker, Textarea, YesOrNoQuestion } = createSifFormComponents<OmBarnetFormValues>();

const stepId = SøknadStepId.OM_BARNET;

export const OmBarnetForm = () => {
    const { validateField } = useSifValidate('omBarnetForm');
    const { text } = useAppIntl();
    const { barn } = useSøknadState();

    const registrerteBarn: RegistrertBarn[] = barn ?? [];

    const defaultValues = useStepDefaultValues<OmBarnetFormValues, OmBarnetSøknadsdata>({
        stepId,
        toFormValues: toOmBarnetFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<OmBarnetFormValues, OmBarnetSøknadsdata>({
        stepId,
        toSøknadsdata: (values) => {
            const result = toOmBarnetSøknadsdata(values, registrerteBarn);
            if (!result) throw new Error('OmBarnet: mangler nødvendig data etter validering');
            return result;
        },
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);
    const { watch } = methods;

    const barnetSøknadenGjelder = watch(OmBarnetFormFields.barnetSøknadenGjelder);
    const søknadenGjelderAnnetBarn = barnetSøknadenGjelder === ANNET_BARN;
    const harValgtBarn = barnetSøknadenGjelder !== undefined;

    const sammeAdresse = watch(OmBarnetFormFields.sammeAdresse);
    const kroniskEllerFunksjonshemming = watch(OmBarnetFormFields.kroniskEllerFunksjonshemming);
    const høyereRisikoForFravær = watch(OmBarnetFormFields.høyereRisikoForFravær);

    useEffect(() => {
        if (!søknadenGjelderAnnetBarn) {
            methods.clearErrors([
                OmBarnetFormFields.barnetsFødselsdato,
                OmBarnetFormFields.barnetsFødselsnummer,
                OmBarnetFormFields.barnetsNavn,
                OmBarnetFormFields.søkersRelasjonTilBarnet,
            ]);
        }
    }, [søknadenGjelderAnnetBarn]);

    const visIkkeSammeAdresseAlert = sammeAdresse === BarnSammeAdresse.NEI;
    const erKronisk = kroniskEllerFunksjonshemming === YesOrNo.YES;
    const visHøyereRisikoSpørsmål = harValgtBarn && kroniskEllerFunksjonshemming === YesOrNo.NO;
    const visHøyereRisikoBeskrivelseSpørsmål = visHøyereRisikoSpørsmål && høyereRisikoForFravær === YesOrNo.YES;

    const barnRadioOptions = [
        ...registrerteBarn.map((b) => ({
            value: b.aktørId,
            label: `${b.fornavn}${b.etternavn ? ` ${b.etternavn}` : ''}`,
        })),
        { value: ANNET_BARN, label: text('omBarnetSteg.valgAnnetBarn') },
    ];

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <RadioGroup
                        name={OmBarnetFormFields.barnetSøknadenGjelder}
                        legend={text('omBarnetSteg.spørsmål.barnetSøknadenGjelder')}
                        radios={barnRadioOptions}
                        validate={validateField(OmBarnetFormFields.barnetSøknadenGjelder, getRequiredFieldValidator())}
                    />

                    {søknadenGjelderAnnetBarn && (
                        <FormLayout.Section title={text('omBarnetSteg.annetBarn.tittel')}>
                            <FormLayout.Questions>
                                <Datepicker
                                    name={OmBarnetFormFields.barnetsFødselsdato}
                                    label={text('omBarnetSteg.spørsmål.barnetsFødselsdato')}
                                    maxDate={new Date()}
                                    validate={validateField(
                                        OmBarnetFormFields.barnetsFødselsdato,
                                        getDateValidator({ required: true, max: new Date() }),
                                    )}
                                />
                                <TextField
                                    name={OmBarnetFormFields.barnetsFødselsnummer}
                                    label={text('omBarnetSteg.spørsmål.barnetsFødselsnummer')}
                                    inputMode="numeric"
                                    maxLength={11}
                                    validate={validateField(
                                        OmBarnetFormFields.barnetsFødselsnummer,
                                        getFødselsnummerValidator({ required: true }),
                                    )}
                                />
                                <TextField
                                    name={OmBarnetFormFields.barnetsNavn}
                                    label={text('omBarnetSteg.spørsmål.barnetsNavn')}
                                    validate={validateField(
                                        OmBarnetFormFields.barnetsNavn,
                                        getStringValidator({ required: true }),
                                    )}
                                />
                                <RadioGroup
                                    name={OmBarnetFormFields.søkersRelasjonTilBarnet}
                                    legend={text('omBarnetSteg.spørsmål.søkersRelasjonTilBarnet')}
                                    radios={[
                                        {
                                            value: SøkersRelasjonTilBarnet.MOR,
                                            label: text('omBarnetSteg.relasjon.mor'),
                                        },
                                        {
                                            value: SøkersRelasjonTilBarnet.FAR,
                                            label: text('omBarnetSteg.relasjon.far'),
                                        },
                                        {
                                            value: SøkersRelasjonTilBarnet.ADOPTIVFORELDER,
                                            label: text('omBarnetSteg.relasjon.adoptivforelder'),
                                        },
                                        {
                                            value: SøkersRelasjonTilBarnet.FOSTERFORELDER,
                                            label: text('omBarnetSteg.relasjon.fosterforelder'),
                                        },
                                    ]}
                                    validate={validateField(
                                        OmBarnetFormFields.søkersRelasjonTilBarnet,
                                        getRequiredFieldValidator(),
                                    )}
                                />
                            </FormLayout.Questions>
                        </FormLayout.Section>
                    )}

                    {harValgtBarn && (
                        <>
                            <RadioGroup
                                name={OmBarnetFormFields.sammeAdresse}
                                legend={text('omBarnetSteg.spørsmål.sammeAdresse')}
                                radios={[
                                    { value: BarnSammeAdresse.JA, label: text('omBarnetSteg.sammeAdresse.JA') },
                                    {
                                        value: BarnSammeAdresse.JA_DELT_BOSTED,
                                        label: text('omBarnetSteg.sammeAdresse.JA_DELT_BOSTED'),
                                    },
                                    { value: BarnSammeAdresse.NEI, label: text('omBarnetSteg.sammeAdresse.NEI') },
                                ]}
                                validate={validateField(OmBarnetFormFields.sammeAdresse, getRequiredFieldValidator())}
                            />
                            <AriaLiveRegion visible={visIkkeSammeAdresseAlert}>
                                <QuestionRelatedMessage>
                                    <Alert variant="warning">
                                        <AppText id="omBarnetSteg.alert.ikkeSammeAdresse" />
                                    </Alert>
                                </QuestionRelatedMessage>
                            </AriaLiveRegion>

                            <YesOrNoQuestion
                                name={OmBarnetFormFields.kroniskEllerFunksjonshemming}
                                legend={text('omBarnetSteg.spørsmål.kroniskEllerFunksjonshemming')}
                                validate={validateField(
                                    OmBarnetFormFields.kroniskEllerFunksjonshemming,
                                    getYesOrNoValidator(),
                                )}
                            />
                            <AriaLiveRegion visible={!erKronisk && kroniskEllerFunksjonshemming === YesOrNo.NO}>
                                <QuestionRelatedMessage>
                                    <Alert variant="warning">
                                        <AppText id="omBarnetSteg.alert.ikkeKronisk" />
                                    </Alert>
                                </QuestionRelatedMessage>
                            </AriaLiveRegion>

                            {visHøyereRisikoSpørsmål && (
                                <>
                                    <YesOrNoQuestion
                                        name={OmBarnetFormFields.høyereRisikoForFravær}
                                        legend={text('omBarnetSteg.spørsmål.høyereRisikoForFravær')}
                                        validate={validateField(
                                            OmBarnetFormFields.høyereRisikoForFravær,
                                            getYesOrNoValidator(),
                                        )}
                                    />
                                    <AriaLiveRegion visible={høyereRisikoForFravær === YesOrNo.NO}>
                                        <QuestionRelatedMessage>
                                            <Alert variant="warning">
                                                <AppText id="omBarnetSteg.alert.ikkeHøyereRisiko" />
                                            </Alert>
                                        </QuestionRelatedMessage>
                                    </AriaLiveRegion>
                                </>
                            )}

                            {visHøyereRisikoBeskrivelseSpørsmål && (
                                <Textarea
                                    name={OmBarnetFormFields.høyereRisikoForFraværBeskrivelse}
                                    label={text('omBarnetSteg.spørsmål.høyereRisikoForFraværBeskrivelse')}
                                    validate={validateField(
                                        OmBarnetFormFields.høyereRisikoForFraværBeskrivelse,
                                        getStringValidator({ required: true }),
                                    )}
                                />
                            )}
                        </>
                    )}
                </FormLayout.Questions>
            </FormLayout.Content>
        </AppForm>
    );
};
