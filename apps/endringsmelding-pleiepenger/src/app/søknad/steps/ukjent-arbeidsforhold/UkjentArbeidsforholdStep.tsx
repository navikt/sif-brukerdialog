import AAregisteret from '@app/components/aa-registeret/AARegisteret';
import { useSøknadContext } from '@app/hooks';
import { useStepConfig } from '@app/hooks/useStepConfig';
import { AppText } from '@app/i18n';
import { StepId } from '@app/søknad/config/StepId';
import SøknadStep from '@app/søknad/SøknadStep';
import { Heading } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';

import UkjentArbeidsforholdForm from './UkjentArbeidsforholdForm';

const UkjentArbeidsforholdStep = () => {
    const stepId = StepId.UKJENT_ARBEIDSFOHOLD;

    const {
        state: { søknadsdata, sak, arbeidsgivere },
    } = useSøknadContext();

    const { goBack, includeBackLink, stepConfig } = useStepConfig(stepId);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig} includeBackLink={includeBackLink}>
            <FormLayout.Guide>
                <Heading level="2" size="xsmall" spacing={true}>
                    <AppText id="ukjentArbeidsforholdStep.tittel" />
                </Heading>
                <p>
                    <AppText id="ukjentArbeidsforholdStep.intro" values={{ AAregisteret: <AAregisteret /> }} />
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
