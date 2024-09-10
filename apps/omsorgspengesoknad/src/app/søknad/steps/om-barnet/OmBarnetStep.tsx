import { Heading, VStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import innvilgetVedtakEndpoint from '../../../api/endpoints/innvilgetVedtakEndpoint';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText } from '../../../i18n';
import { BarnSammeAdresse } from '../../../types/BarnSammeAdresse';
import { HentSisteGyldigeVedtakResponseDto } from '../../../types/innvilgetVedtakApiData/HentSisteGyldigeVedtakResponseDto';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { StepId } from '../../../types/StepId';
import { SøkersRelasjonTilBarnet } from '../../../types/SøkersRelasjonTilBarnet';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import IkkeHøyereRisikoForFraværAlert from './info/IkkeHøyereRisikoForFraværAlert';
import IkkeKroniskEllerFunksjonshemningAlert from './info/IkkeKroniskEllerFuksjonshemningAlert';
import IkkeSammeAdresseAlert from './info/IkkeSammeAdresseAlert';
import TrengerIkkeSøkeForBarnAlert from './info/TrengerIkkeSøkeForBarnAlert';
import { getOmBarnetStepInitialValues, getOmBarnetSøknadsdataFromFormValues } from './omBarnetStepUtils';
import AnnetBarnFnrSpørsmål from './spørsmål/AnnetBarnFnrSpørsmål';
import AnnetBarnFødselsdatoSpørsmål from './spørsmål/AnnetBarnFødselsdatoSpørsmål';
import AnnetBarnNavnSpørsmål from './spørsmål/AnnetBarnNavnSpørsmål';
import AnnetBarnRelasjonSpørsmål from './spørsmål/AnnetBarnRelasjonSpørsmål';
import BorSammenMedBarnetSpørsmål from './spørsmål/BorSammenMedBarnetSpørsmål';
import HøyereRisikoForFraværBeskrivelseSpørsmål from './spørsmål/HøyereRisikoForFraværBeskrivelseSpørsmål';
import HøyereRisikoForFraværSpørsmål from './spørsmål/HøyereRisikoForFraværSpørsmål';
import KroniskEllerFunksjonshemningSpørsmål from './spørsmål/KroniskEllerFunksjonshemningSpørsmål';
import RegistrertBarnSpørsmål from './spørsmål/RegistrertBarnSpørsmål';

export enum OmBarnetFormFields {
    barnetSøknadenGjelder = 'barnetSøknadenGjelder',
    søknadenGjelderEtAnnetBarn = 'søknadenGjelderEtAnnetBarn',
    barnetsNavn = 'barnetsNavn',
    barnetsFødselsnummer = 'barnetsFødselsnummer',
    barnetsFødselsdato = 'barnetsFødselsdato',
    søkersRelasjonTilBarnet = 'søkersRelasjonTilBarnet',
    sammeAdresse = 'sammeAdresse',
    kroniskEllerFunksjonshemming = 'kroniskEllerFunksjonshemming',
    høyereRisikoForFravær = 'høyereRisikoForFravær',
    høyereRisikoForFraværBeskrivelse = 'høyereRisikoForFraværBeskrivelse',
}

export interface OmBarnetFormValues {
    [OmBarnetFormFields.barnetSøknadenGjelder]?: string;
    [OmBarnetFormFields.søknadenGjelderEtAnnetBarn]?: boolean;
    [OmBarnetFormFields.barnetsNavn]: string;
    [OmBarnetFormFields.barnetsFødselsnummer]: string;
    [OmBarnetFormFields.barnetsFødselsdato]: string;
    [OmBarnetFormFields.søkersRelasjonTilBarnet]?: SøkersRelasjonTilBarnet;
    [OmBarnetFormFields.sammeAdresse]?: BarnSammeAdresse;
    [OmBarnetFormFields.kroniskEllerFunksjonshemming]?: YesOrNo;
    [OmBarnetFormFields.høyereRisikoForFravær]?: YesOrNo;
    [OmBarnetFormFields.høyereRisikoForFraværBeskrivelse]?: string;
}

export const omBarnetFormElements = getTypedFormComponents<OmBarnetFormFields, OmBarnetFormValues, ValidationError>();

const { FormikWrapper, Form } = omBarnetFormElements;

const OmBarnetStep = () => {
    const intl = useIntl();

    const {
        state: { søknadsdata, registrerteBarn, søker },
    } = useSøknadContext();

    const stepId = StepId.OM_BARNET;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OmBarnetFormValues) => {
        const OmBarnetSøknadsdata = getOmBarnetSøknadsdataFromFormValues(values, { registrerteBarn });
        if (OmBarnetSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOmBarnet(OmBarnetSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        },
    );

    const harIkkeBarn = registrerteBarn.length === 0;

    const innvilgedeVedtak = useInnvilgedeVedtakForRegistrerteBarn(registrerteBarn);

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getOmBarnetStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({
                    values: {
                        barnetSøknadenGjelder,
                        søknadenGjelderEtAnnetBarn,
                        kroniskEllerFunksjonshemming,
                        sammeAdresse,
                        søkersRelasjonTilBarnet,
                        høyereRisikoForFravær,
                    },
                    setFieldValue,
                }) => {
                    const valgtBarn = registrerteBarn.find((barn) => barn.aktørId === barnetSøknadenGjelder);
                    const vedtakForValgtBarn = innvilgedeVedtak[barnetSøknadenGjelder || ''];
                    const harInnvilgetVedtakForValgtBarn = valgtBarn && vedtakForValgtBarn?.harInnvilgedeBehandlinger;

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'steg.omBarnet.validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}
                                submitDisabled={harInnvilgetVedtakForValgtBarn}>
                                <VStack gap="8">
                                    {harIkkeBarn === false && (
                                        <RegistrertBarnSpørsmål
                                            registrerteBarn={registrerteBarn}
                                            søknadenGjelderEtAnnetBarn={søknadenGjelderEtAnnetBarn}
                                            onAnnetBarnSelected={() => {
                                                setFieldValue('barnetSøknadenGjelder', undefined);
                                            }}
                                        />
                                    )}
                                    {harInnvilgetVedtakForValgtBarn ? (
                                        <TrengerIkkeSøkeForBarnAlert barnetsFornavn={valgtBarn.fornavn} />
                                    ) : (
                                        <>
                                            {(søknadenGjelderEtAnnetBarn || harIkkeBarn) && (
                                                <VStack gap="4">
                                                    <Heading level="2" size="medium">
                                                        <AppText id="steg.omBarnet.annetBarn.tittel" />
                                                    </Heading>
                                                    <VStack gap="8">
                                                        <AnnetBarnFnrSpørsmål søkersFnr={søker.fødselsnummer} />
                                                        <AnnetBarnNavnSpørsmål />
                                                        <AnnetBarnFødselsdatoSpørsmål />
                                                        <AnnetBarnRelasjonSpørsmål />
                                                    </VStack>
                                                </VStack>
                                            )}
                                            {(barnetSøknadenGjelder !== undefined ||
                                                søknadenGjelderEtAnnetBarn ||
                                                harIkkeBarn) && (
                                                <VStack gap="8">
                                                    <VStack gap="2">
                                                        <BorSammenMedBarnetSpørsmål />
                                                        {sammeAdresse === BarnSammeAdresse.NEI &&
                                                            søkersRelasjonTilBarnet !==
                                                                SøkersRelasjonTilBarnet.FOSTERFORELDER && (
                                                                <IkkeSammeAdresseAlert />
                                                            )}
                                                    </VStack>

                                                    <VStack gap="2">
                                                        <KroniskEllerFunksjonshemningSpørsmål />
                                                        {kroniskEllerFunksjonshemming === YesOrNo.NO && (
                                                            <IkkeKroniskEllerFunksjonshemningAlert />
                                                        )}
                                                    </VStack>

                                                    {kroniskEllerFunksjonshemming === YesOrNo.YES && (
                                                        <>
                                                            <VStack gap="2">
                                                                <HøyereRisikoForFraværSpørsmål />
                                                                {høyereRisikoForFravær === YesOrNo.NO && (
                                                                    <IkkeHøyereRisikoForFraværAlert />
                                                                )}
                                                            </VStack>
                                                            {høyereRisikoForFravær === YesOrNo.YES && (
                                                                <HøyereRisikoForFraværBeskrivelseSpørsmål />
                                                            )}
                                                        </>
                                                    )}
                                                </VStack>
                                            )}
                                        </>
                                    )}
                                </VStack>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default OmBarnetStep;

const useInnvilgedeVedtakForRegistrerteBarn = (registrerteBarn: RegistrertBarn[]) => {
    const [innvilgedeVedtak, setInnvilgedeVedtak] = useState<{ [key: string]: HentSisteGyldigeVedtakResponseDto }>({});
    useEffect(() => {
        async function getInnvilgedeVedtak() {
            const vedtakPromises = registrerteBarn.map((barn) =>
                innvilgetVedtakEndpoint.send({
                    pleietrengendeAktørId: barn.aktørId,
                }),
            );
            const responses = await Promise.all(vedtakPromises);
            const vedtakEntries = registrerteBarn.map((barn, index) => [barn.aktørId, responses[index].data]);
            setInnvilgedeVedtak(Object.fromEntries(vedtakEntries));
        }
        getInnvilgedeVedtak();
    }, [registrerteBarn]);
    return innvilgedeVedtak;
};
