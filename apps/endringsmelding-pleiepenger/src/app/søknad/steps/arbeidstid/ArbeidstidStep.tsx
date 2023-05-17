import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import InfoList from '@navikt/sif-common-core-ds/lib/components/lists/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { harFjernetLovbestemtFerie } from '../../../utils/lovbestemtFerieUtils';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import ArbeidstidForm from './ArbeidstidForm';

const ArbeidstidStep = () => {
    const stepId = StepId.ARBEIDSTID;

    const {
        state: { søknadsdata, sak, valgtHvaSkalEndres: hvaSkalEndres },
    } = useSøknadContext();

    const harFjernetFerie = harFjernetLovbestemtFerie(søknadsdata.lovbestemtFerie);
    const stepConfig = getSøknadStepConfig(hvaSkalEndres, søknadsdata, sak.harUkjentArbeidsforhold);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <>
                    <BodyLong as="div">
                        <Heading level="2" size="xsmall" spacing={true}>
                            Slik endrer du jobb i pleiepengeperioden
                        </Heading>
                        <InfoList>
                            <li>Du oppgir hvor mye du jobber i timer eller prosent per uke.</li>
                            <li>Du kan endre flere uker samtidig, eller én og én uke.</li>
                            <li>
                                Hvis du har endring som gjelder kun enkeltdager, skal du fremdeles oppgi hvor mye du
                                jobber samlet for hele uken.
                            </li>
                        </InfoList>
                    </BodyLong>
                </>
            </SifGuidePanel>

            {harFjernetFerie && (
                <Block margin="xl">
                    <Alert variant="warning">
                        Du har fjernet dager med ferie. Skal du jobbe disse dagene, se over at jobb i perioden er
                        riktig.
                    </Alert>
                </Block>
            )}
            <ArbeidstidForm goBack={goBack} />
        </SøknadStep>
    );
};

export default ArbeidstidStep;
