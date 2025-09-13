import { useSøknadContext } from '@hooks';
import { Heading } from '@navikt/ds-react';
import AAregisteret from '../../../components/aa-registeret/AARegisteret';
import { useStepConfig } from '../../../hooks/useStepConfig';
import SøknadStep from '../../SøknadStep';
import { StepId } from '../../config/StepId';
import UkjentArbeidsforholdForm from './UkjentArbeidsforholdForm';
import { FormLayout } from '@navikt/sif-common-ui';

const UkjentArbeidsforholdStep = () => {
    const stepId = StepId.UKJENT_ARBEIDSFOHOLD;

    const {
        state: { søknadsdata, sak, arbeidsgivere },
    } = useSøknadContext();

    const { goBack, stepConfig } = useStepConfig(stepId);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <FormLayout.Guide>
                <Heading level="2" size="xsmall" spacing={true}>
                    Vi trenger informasjon om et nytt arbeidsforhold
                </Heading>
                <p>
                    Vi har funnet et arbeidsforhold på deg i <AAregisteret /> som ikke var der da du sendte inn søknad
                    om pleiepenger. Vi trenger litt informasjon fra deg før du kan fortsette.
                </p>
            </FormLayout.Guide>

            <UkjentArbeidsforholdForm
                stepId={stepId}
                goBack={goBack}
                arbeidsgivere={arbeidsgivere}
                arbeidsgivereIkkeISak={sak.arbeidsgivereIkkeISak}
                ukjentArbeidsforholdSøknadsdata={søknadsdata.ukjentArbeidsforhold}
            />
        </SøknadStep>
    );
};

export default UkjentArbeidsforholdStep;
