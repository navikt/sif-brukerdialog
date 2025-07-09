import { YesOrNo } from '@navikt/sif-common-formik-ds';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { BarnSammeAdresse } from '../../../types/BarnSammeAdresse';
import { StepId } from '../../../types/StepId';
import { SøkersRelasjonTilBarnet } from '../../../types/SøkersRelasjonTilBarnet';
import { SøknadContextState } from '../../../types/SøknadContextState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import OmBarnetForm from './OmBarnetForm';
import { omBarnetFormComponents } from './omBarnetFormComponents';
import { getOmBarnetStepInitialValues, getOmBarnetSøknadsdataFromFormValues } from './omBarnetStepUtils';
import { useSøknadMellomlagring } from '../../../hooks/useSøknadMellomlagring';
import { useGyldigeVedtakForRegistrerteBarn } from '../../../api/hent-siste-gyldige-vedtak/useGyldigeVedtakForRegistrerteBarn';
import { LoadingPage } from '@navikt/sif-common-soknad-ds/src';

export enum OmBarnetFormFields {
    barnetsFødselsdato = 'barnetsFødselsdato',
    barnetsFødselsnummer = 'barnetsFødselsnummer',
    barnetsNavn = 'barnetsNavn',
    barnetSøknadenGjelder = 'barnetSøknadenGjelder',
    høyereRisikoForFravær = 'høyereRisikoForFravær',
    høyereRisikoForFraværBeskrivelse = 'høyereRisikoForFraværBeskrivelse',
    kroniskEllerFunksjonshemming = 'kroniskEllerFunksjonshemming',
    sammeAdresse = 'sammeAdresse',
    søkersRelasjonTilBarnet = 'søkersRelasjonTilBarnet',
    søknadenGjelderEtAnnetBarn = 'søknadenGjelderEtAnnetBarn',
}

export interface OmBarnetFormValues {
    [OmBarnetFormFields.barnetsFødselsdato]: string;
    [OmBarnetFormFields.barnetsFødselsnummer]: string;
    [OmBarnetFormFields.barnetsNavn]: string;
    [OmBarnetFormFields.barnetSøknadenGjelder]?: string;
    [OmBarnetFormFields.høyereRisikoForFravær]?: YesOrNo;
    [OmBarnetFormFields.høyereRisikoForFraværBeskrivelse]?: string;
    [OmBarnetFormFields.kroniskEllerFunksjonshemming]?: YesOrNo;
    [OmBarnetFormFields.sammeAdresse]?: BarnSammeAdresse;
    [OmBarnetFormFields.søkersRelasjonTilBarnet]?: SøkersRelasjonTilBarnet;
    [OmBarnetFormFields.søknadenGjelderEtAnnetBarn]?: boolean;
}

const { FormikWrapper } = omBarnetFormComponents;

const OmBarnetStep = () => {
    const {
        state: { søknadsdata, registrerteBarn, søker },
    } = useSøknadContext();

    const { lagreMellomlagring } = useSøknadMellomlagring();

    const stepId = StepId.OM_BARNET;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const gyldigeVedtak = useGyldigeVedtakForRegistrerteBarn(registrerteBarn, true);

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
            return lagreMellomlagring(state);
        },
    );

    if (gyldigeVedtak.isLoading || gyldigeVedtak.data === undefined) {
        return <LoadingPage />;
    }

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getOmBarnetStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values, setFieldValue }) => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <OmBarnetForm
                                values={values}
                                onBack={goBack}
                                isSubmitting={isSubmitting}
                                søker={søker}
                                registrerteBarn={registrerteBarn}
                                onVelgAnnetBarn={() => setFieldValue('barnetSøknadenGjelder', undefined)}
                                gyldigeVedtak={gyldigeVedtak.data}
                            />
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default OmBarnetStep;
