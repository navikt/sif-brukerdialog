import { BodyLong, Heading } from '@navikt/ds-react';
import { useStepNavigation, useSøknadContext } from '@hooks';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import SøknadStep from '../../SøknadStep';
import UkjentArbeidsforholdForm from './UkjentArbeidsforholdForm';

const UkjentArbeidsforholdStep = () => {
    const stepId = StepId.UKJENT_ARBEIDSFOHOLD;

    const {
        state: { søknadsdata, valgtHvaSkalEndres: hvaSkalEndres, sak, arbeidsgivere },
    } = useSøknadContext();

    const stepConfig = getSøknadStepConfig(hvaSkalEndres, søknadsdata, sak.harUkjentArbeidsforhold);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <BodyLong as="div">
                    <Heading level="2" size="xsmall" spacing={true}>
                        Vi trenger mer informasjon om ukjent arbeidsforhold
                    </Heading>
                    <p>
                        Vi har funnet et nytt arbeidsforhold på deg i{' '}
                        <abbr title="Arbeidsgiver- og arbeidstakerregisteret">Aa-registeret</abbr>, som ikke var
                        registrert da du søkte om pleiepenger. Vi trenger litt mer informasjon før du kan fortsette.
                    </p>
                </BodyLong>
            </SifGuidePanel>

            <Block margin="xl">
                <UkjentArbeidsforholdForm
                    stepId={stepId}
                    goBack={goBack}
                    arbeidsgivere={arbeidsgivere}
                    ukjenteArbeidsgivere={sak.ukjenteArbeidsgivere}
                    ukjentArbeidsforholdSøknadsdata={søknadsdata.ukjentArbeidsforhold}
                />
            </Block>
        </SøknadStep>
    );
};

export default UkjentArbeidsforholdStep;
