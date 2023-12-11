import { Alert, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import InfoList from '@navikt/sif-common-core-ds/lib/components/lists/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { useStepConfig } from '../../../hooks/useStepConfig';
import { useSøknadsdataInfo } from '../../../hooks/useSøknadsdataInfo';
import SøknadStep from '../../SøknadStep';
import { StepId } from '../../config/StepId';
import ArbeidsaktiviteterMedUkjentArbeidsgiver from './ArbeidsaktiviteterMedUkjentArbeidsgiver';
import ArbeidstidForm from './ArbeidstidForm';

const ArbeidstidStep = () => {
    const stepId = StepId.ARBEIDSTID;

    const { goBack, stepConfig } = useStepConfig(stepId);

    const { harFjernetFerie } = useSøknadsdataInfo();

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <Heading level="2" size="xsmall" spacing={true}>
                    Slik endrer du jobb i pleiepengeperioden
                </Heading>
                <InfoList>
                    <li>Du oppgir hvor mye du jobber i timer eller prosent per uke.</li>
                    <li>Du kan endre flere uker samtidig, eller én og én uke.</li>
                    <li>
                        Hvis du har endring som gjelder kun enkeltdager, skal du fremdeles oppgi hvor mye du jobber
                        samlet for hele uken.
                    </li>
                </InfoList>
            </SifGuidePanel>

            {harFjernetFerie && (
                <Block margin="xl">
                    <Alert variant="warning">
                        Du har fjernet dager med ferie. Skal du jobbe disse dagene, se over at jobb i perioden er
                        riktig.
                    </Alert>
                </Block>
            )}
            <ArbeidsaktiviteterMedUkjentArbeidsgiver />
            <ArbeidstidForm goBack={goBack} />
        </SøknadStep>
    );
};

export default ArbeidstidStep;
