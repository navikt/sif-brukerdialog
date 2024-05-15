import { Alert, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import ArbeidsaktiviteterMedUkjentArbeidsgiver from '../../../components/arbeidsaktiviteter-med-ukjent-arbeidsgiver/ArbeidsaktiviteterMedUkjentArbeidsgiver';
import { useSøknadContext } from '../../../hooks';
import { useStepConfig } from '../../../hooks/useStepConfig';
import { useSøknadsdataInfo } from '../../../hooks/useSøknadsdataInfo';
import { StepId } from '../../config/StepId';
import SøknadStep from '../../SøknadStep';
import ArbeidstidForm from './ArbeidstidForm';
import { AppText } from '../../../i18n';

const ArbeidstidStep = () => {
    const stepId = StepId.ARBEIDSTID;

    const {
        state: {
            sak: { arbeidsaktivitetMedUkjentArbeidsgiver, arbeidsaktiviteter },
        },
    } = useSøknadContext();

    const { goBack, stepConfig } = useStepConfig(stepId);

    const { harFjernetFerie } = useSøknadsdataInfo();

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <SifGuidePanel>
                <Heading level="2" size="xsmall" spacing={true}>
                    <AppText id="arbeidstidStep.title" />
                </Heading>
                <InfoList>
                    <li>
                        <AppText id="arbeidstidStep.info.1" />
                    </li>
                    <li>
                        <AppText id="arbeidstidStep.info.2" />
                    </li>
                    <li>
                        <AppText id="arbeidstidStep.info.3" />
                    </li>
                </InfoList>
            </SifGuidePanel>

            {harFjernetFerie && (
                <Block margin="xl">
                    <Alert variant="warning">
                        <AppText id="arbeidstidStep.fjernetFerie.melding" />
                    </Alert>
                </Block>
            )}

            {arbeidsaktivitetMedUkjentArbeidsgiver.length === 0 ? null : (
                <ArbeidsaktiviteterMedUkjentArbeidsgiver
                    arbeidsaktivitetMedUkjentArbeidsgiver={arbeidsaktivitetMedUkjentArbeidsgiver}
                    arbeidsaktiviteter={arbeidsaktiviteter}
                />
            )}

            <ArbeidstidForm goBack={goBack} />
        </SøknadStep>
    );
};

export default ArbeidstidStep;
