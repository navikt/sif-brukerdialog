import { Alert, Heading, InlineMessage, VStack } from '@navikt/ds-react';
import { ActionLink } from '@navikt/sif-common-ui';
import { useNavigate } from 'react-router-dom';

import { AppText } from '../../../../i18n';
import { ArbeidsgiverMedAnsettelseperioder, ArbeidstidApiData } from '../../../../types';
import { getSøknadStepRoute } from '../../../config/SøknadRoutes';
import { StepId } from '../../../config/StepId';
import ArbeidstidArbeidsforholdOppsummering from './ArbeidstidArbeidsforholdOppsummering';

interface Props {
    arbeidstid?: ArbeidstidApiData;
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[];
    arbeidstidErEndret: boolean;
    harGyldigArbeidstid: boolean;
}

const ArbeidstidOppsummering = ({ arbeidsgivere, arbeidstid, arbeidstidErEndret, harGyldigArbeidstid }: Props) => {
    const navigate = useNavigate();
    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                <AppText id="oppsummeringStep.arbeidstid.tittel" />
            </Heading>
            {arbeidstid && arbeidstidErEndret ? (
                <VStack gap="space-16">
                    <ArbeidstidArbeidsforholdOppsummering arbeidstid={arbeidstid} arbeidsgivere={arbeidsgivere} />
                    {!harGyldigArbeidstid && (
                        <Alert variant="error">
                            <AppText id="oppsummeringStep.arbeidstid.flereTimerEnnTilgjengelig" />
                        </Alert>
                    )}
                    <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.ARBEIDSTID))}>
                        Gå til endring av arbeidstid
                    </ActionLink>
                </VStack>
            ) : (
                <VStack gap="space-16">
                    <InlineMessage status="info">
                        <AppText id="oppsummeringStep.arbeidstid.ingenEndringer" />
                    </InlineMessage>
                    <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.ARBEIDSTID))}>
                        Gå til endring av arbeidstid
                    </ActionLink>
                </VStack>
            )}
        </VStack>
    );
};

export default ArbeidstidOppsummering;
