import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import {
    getRequiredFieldValidator,
    getStringValidator,
    getYesOrNoValidator,
} from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useAppIntl } from '../../../i18n';
import { BarnSammeAdresse } from '../../../types/BarnSammeAdresse';
import { StepId } from '../../../types/StepId';
import { SøkersRelasjonTilBarnet } from '../../../types/SøkersRelasjonTilBarnet';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import AnnetBarnpart from './form-parts/AnnetBarnPart';
import VelgRegistrertBarn from './form-parts/VelgRegistrertBarn';
import { getOmBarnetStepInitialValues, getOmBarnetSøknadsdataFromFormValues } from './omBarnetStepUtils';
import { useEffect, useState } from 'react';
import { HentSisteGyldigeVedtakResponseDto } from '../../../types/innvilgetVedtakApiData/HentSisteGyldigeVedtakResponseDto';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import innvilgetVedtakEndpoint from '../../../api/endpoints/innvilgetVedtakEndpoint';

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

const { FormikWrapper, Form, YesOrNoQuestion, RadioGroup, Textarea } = getTypedFormComponents<
    OmBarnetFormFields,
    OmBarnetFormValues,
    ValidationError
>();

const OmBarnetStep = () => {
    const intl = useIntl();
    const { text } = useAppIntl();
    const {
        state: { søknadsdata, registrerteBarn },
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
                                {harIkkeBarn === false && (
                                    <VelgRegistrertBarn
                                        registrerteBarn={registrerteBarn}
                                        søknadenGjelderEtAnnetBarn={søknadenGjelderEtAnnetBarn}
                                        onAnnetBarnSelected={() => {
                                            setFieldValue('barnetSøknadenGjelder', undefined);
                                        }}
                                    />
                                )}
                                {harInnvilgetVedtakForValgtBarn ? (
                                    <FormBlock margin="l">
                                        <Alert variant="warning">
                                            <Heading size="small" level="3">
                                                Du trenger ikke søke for {valgtBarn.fornavn}
                                            </Heading>
                                            <BodyShort>
                                                Du har allerede et gyldig vedtak som gjelder til og med det kalenderåret{' '}
                                                {valgtBarn.fornavn} fyller 18 år. Det betyr at allerede har ekstra
                                                omsorgsdager, og at du ikke trenger å søke på nytt. Du kan finne melding
                                                og dokumentasjon om vedtaket på{' '}
                                                <Link href="https://www.nav.no/minside/">Min side</Link>.
                                            </BodyShort>
                                        </Alert>
                                    </FormBlock>
                                ) : (
                                    <>
                                        {(søknadenGjelderEtAnnetBarn || harIkkeBarn) && (
                                            <FormBlock>
                                                <AnnetBarnpart />
                                            </FormBlock>
                                        )}
                                        {(barnetSøknadenGjelder !== undefined ||
                                            søknadenGjelderEtAnnetBarn ||
                                            harIkkeBarn) && (
                                            <>
                                                <FormBlock>
                                                    <RadioGroup
                                                        name={OmBarnetFormFields.sammeAdresse}
                                                        legend={text('steg.omBarnet.spm.sammeAdresse')}
                                                        radios={[
                                                            {
                                                                label: text('steg.omBarnet.spm.sammeAdresse.ja'),
                                                                value: BarnSammeAdresse.JA,
                                                            },
                                                            {
                                                                label: text(
                                                                    'steg.omBarnet.spm.sammeAdresse.jaDeltBosted',
                                                                ),
                                                                value: BarnSammeAdresse.JA_DELT_BOSTED,
                                                            },
                                                            {
                                                                label: text('steg.omBarnet.spm.sammeAdresse.nei'),
                                                                value: BarnSammeAdresse.NEI,
                                                            },
                                                        ]}
                                                        validate={getRequiredFieldValidator()}
                                                        data-testid="sammeAdresse"
                                                        description={
                                                            <ExpandableInfo
                                                                title={text(
                                                                    'steg.omBarnet.spm.sammeAdresse.hvaBetyrDette',
                                                                )}>
                                                                {text(
                                                                    'steg.omBarnet.spm.sammeAdresse.hvaBetyrDette.info',
                                                                )}
                                                            </ExpandableInfo>
                                                        }
                                                    />
                                                </FormBlock>
                                                {sammeAdresse === BarnSammeAdresse.NEI &&
                                                    søkersRelasjonTilBarnet !==
                                                        SøkersRelasjonTilBarnet.FOSTERFORELDER && (
                                                        <FormBlock margin="l">
                                                            <Alert variant="info">
                                                                {text('steg.omBarnet.spm.sammeAdresse.neiAlert')}
                                                            </Alert>
                                                        </FormBlock>
                                                    )}
                                                <FormBlock>
                                                    <YesOrNoQuestion
                                                        name={OmBarnetFormFields.kroniskEllerFunksjonshemming}
                                                        legend={text('steg.omBarnet.spm.kroniskEllerFunksjonshemmende')}
                                                        validate={getYesOrNoValidator()}
                                                    />
                                                </FormBlock>
                                                {kroniskEllerFunksjonshemming === YesOrNo.YES && (
                                                    <>
                                                        <FormBlock>
                                                            <YesOrNoQuestion
                                                                name={OmBarnetFormFields.høyereRisikoForFravær}
                                                                legend={text('steg.omBarnet.spm.høyereRisikoForFravær')}
                                                                data-testid="høyereRisikoForFravær"
                                                                validate={getYesOrNoValidator()}
                                                            />
                                                        </FormBlock>
                                                        {høyereRisikoForFravær === YesOrNo.YES && (
                                                            <FormBlock>
                                                                <Textarea
                                                                    name={
                                                                        OmBarnetFormFields.høyereRisikoForFraværBeskrivelse
                                                                    }
                                                                    validate={(value) => {
                                                                        const error = getStringValidator({
                                                                            minLength: 5,
                                                                            maxLength: 1000,
                                                                            required: true,
                                                                        })(value);

                                                                        return error;
                                                                    }}
                                                                    maxLength={1000}
                                                                    label={text(
                                                                        'steg.omBarnet.spm.høyereRisikoForFraværBeskrivelse.tittel',
                                                                    )}
                                                                    data-testid="høyereRisikoForFraværBeskrivelse"
                                                                />
                                                            </FormBlock>
                                                        )}
                                                        {høyereRisikoForFravær === YesOrNo.NO && (
                                                            <FormBlock>
                                                                <FormBlock margin="l">
                                                                    <Alert variant="info">
                                                                        {text(
                                                                            'steg.omBarnet.spm.høyereRisikoForFravær.alert',
                                                                        )}
                                                                    </Alert>
                                                                </FormBlock>
                                                            </FormBlock>
                                                        )}
                                                    </>
                                                )}
                                                {kroniskEllerFunksjonshemming === YesOrNo.NO && (
                                                    <FormBlock margin="l">
                                                        <Alert variant="info">
                                                            {text('steg.omBarnet.alert.ikkeKroniskSykdom')}
                                                        </Alert>
                                                    </FormBlock>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
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
