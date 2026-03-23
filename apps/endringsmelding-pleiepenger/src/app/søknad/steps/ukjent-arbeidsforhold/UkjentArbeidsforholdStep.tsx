import AAregisteret from '@app/components/aa-registeret/AARegisteret';
import { useSøknadContext } from '@app/hooks';
import { Heading } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';

import { useStepConfig } from '../../../hooks/useStepConfig';
import { StepId } from '../../config/StepId';
import SøknadStep from '../../SøknadStep';
import UkjentArbeidsforholdForm from './UkjentArbeidsforholdForm';

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
