import { Alert, Heading, VStack } from '@navikt/ds-react';

import { AppText } from '../../../../i18n';
import { Arbeidsgiver, ArbeidstidApiData } from '../../../../types';
import ArbeidstidArbeidsforholdOppsummering from './ArbeidstidArbeidsforholdOppsummering';

interface Props {
    arbeidstid?: ArbeidstidApiData;
    arbeidsgivere: Arbeidsgiver[];
    arbeidstidErEndret: boolean;
    harGyldigArbeidstid: boolean;
}

const ArbeidstidOppsummering = ({ arbeidsgivere, arbeidstid, arbeidstidErEndret, harGyldigArbeidstid }: Props) => {
    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                <AppText id="oppsummeringStep.arbeidstid.tittel" />
            </Heading>
            {arbeidstid && arbeidstidErEndret ? (
                <>
                    <ArbeidstidArbeidsforholdOppsummering arbeidstid={arbeidstid} arbeidsgivere={arbeidsgivere} />
                    {!harGyldigArbeidstid && (
                        <Alert variant="error">
                            <AppText id="oppsummeringStep.arbeidstid.flereTimerEnnTilgjengelig" />
                        </Alert>
                    )}
                </>
            ) : (
                <Alert variant="info">
                    <AppText id="oppsummeringStep.arbeidstid.ingenEndringer" />
                </Alert>
            )}
        </VStack>
    );
};

export default ArbeidstidOppsummering;
