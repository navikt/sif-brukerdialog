import { Alert, Heading, VStack } from '@navikt/ds-react';

import { AppText } from '../../../../i18n';
import { Arbeidsgiver, ArbeidstidApiData } from '../../../../types';
import ArbeidstidArbeidsforholdOppsummering from './ArbeidstidArbeidsforholdOppsummering';
import { UgyldigArbeidstidPeriode } from '../../../../utils/arbeidstidPeriodeValidering';

interface Props {
    arbeidstid?: ArbeidstidApiData;
    arbeidsgivere: Arbeidsgiver[];
    arbeidstidErEndret: boolean;
    harGyldigArbeidstid: boolean;
    ugyldigePerioderIArbeidstid: UgyldigArbeidstidPeriode[];
}

const ArbeidstidOppsummering = ({
    arbeidsgivere,
    arbeidstid,
    arbeidstidErEndret,
    harGyldigArbeidstid,
    ugyldigePerioderIArbeidstid,
}: Props) => {
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
                    {ugyldigePerioderIArbeidstid.length > 0 && (
                        <Alert variant="error">
                            Noen av endringene i arbeidstid viser seg å være ugyldig. Dette kan oppstå hvis grunnlaget
                            for endringene du har gjort har endret seg etter at du startet på denne endringsmeldingen.
                            Du må desverre starte på nytt for å kunne sende inn endringene.
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
