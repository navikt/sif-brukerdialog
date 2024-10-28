import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { ValidationError } from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { ÅrsakManglerIdentitetsnummer } from '../../../types/ÅrsakManglerIdentitetsnummer';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import AnnetBarnPart from './form-parts/AnnetBarnPart';
import VelgRegistrertBarn from './form-parts/VelgRegistrertBarn';
import { getOmBarnetStepInitialValues, getOmBarnetSøknadsdataFromFormValues } from './omBarnetStepUtils';
import { BarnRelasjon } from '../../../types/BarnRelasjon';
import { Attachment } from '@navikt/sif-common-core-ds/src/types';

export enum OmBarnetFormFields {
    barnetSøknadenGjelder = 'barnetSøknadenGjelder',
    søknadenGjelderEtAnnetBarn = 'søknadenGjelderEtAnnetBarn',
    barnetsNavn = 'barnetsNavn',
    barnetsFødselsnummer = 'barnetsFødselsnummer',
    barnetsFødselsdato = 'barnetsFødselsdato',
    barnetHarIkkeFnr = 'barnetHarIkkeFnr',
    årsakManglerIdentitetsnummer = 'årsakManglerIdentitetsnummer',
    relasjonTilBarnet = 'relasjonTilBarnet',
    relasjonTilBarnetBeskrivelse = 'relasjonTilBarnetBeskrivelse',
    fødselsattest = 'fødselsattest',
}

export interface OmBarnetFormValues {
    [OmBarnetFormFields.barnetSøknadenGjelder]?: string;
    [OmBarnetFormFields.søknadenGjelderEtAnnetBarn]?: boolean;
    [OmBarnetFormFields.barnetsNavn]: string;
    [OmBarnetFormFields.barnetsFødselsnummer]: string;
    [OmBarnetFormFields.barnetsFødselsdato]: string;
    [OmBarnetFormFields.barnetHarIkkeFnr]?: boolean;
    [OmBarnetFormFields.relasjonTilBarnet]?: BarnRelasjon;
    [OmBarnetFormFields.relasjonTilBarnetBeskrivelse]?: string;
    [OmBarnetFormFields.årsakManglerIdentitetsnummer]?: ÅrsakManglerIdentitetsnummer;
    [OmBarnetFormFields.fødselsattest]?: Attachment[];
}

const { FormikWrapper, Form } = getTypedFormComponents<OmBarnetFormFields, OmBarnetFormValues, ValidationError>();

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
        const OmBarnetSøknadsdata = getOmBarnetSøknadsdataFromFormValues(values, registrerteBarn);
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
    const initialValues = getOmBarnetStepInitialValues(søknadsdata, stepFormValues[stepId]);
    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={initialValues}
                onSubmit={handleSubmit}
                renderForm={({ values, setFieldValue }) => {
                    const { søknadenGjelderEtAnnetBarn } = values;
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'steg.omBarnet.validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                {harIkkeBarn === false && (
                                    <VelgRegistrertBarn
                                        registrerteBarn={registrerteBarn}
                                        søknadenGjelderEtAnnetBarn={søknadenGjelderEtAnnetBarn}
                                        onAnnetBarnSelected={() => {
                                            setFieldValue('barnetSøknadenGjelder', undefined);
                                        }}
                                    />
                                )}

                                {(søknadenGjelderEtAnnetBarn || harIkkeBarn) && (
                                    <FormBlock>
                                        <AnnetBarnPart
                                            formValues={values}
                                            søkersFødselsnummer={søker.fødselsnummer}
                                            harRegistrerteBarn={harIkkeBarn === false}
                                            initialValues={initialValues}
                                        />
                                    </FormBlock>
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
