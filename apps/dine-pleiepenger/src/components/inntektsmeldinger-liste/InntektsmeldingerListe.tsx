import { BodyShort, Box, Heading, Switch, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { Inntektsmelding, InntektsmeldingStatus } from '../../types';
import { grupperInntektsmeldingerPåArbeidsgiver } from '../../utils/inntektsmeldingUtils';
import InntektsmeldingLinkCard from '../inntektsmelding-link-card/InntektsmeldingLinkCard';

interface Props {
    inntektsmeldinger: Inntektsmelding[];
    saksnummer: string;
}

const InntektsmeldingerListe = ({ inntektsmeldinger, saksnummer }: Props) => {
    const [visIkkeIBruk, setVisIkkeIBruk] = useState(false);

    const arbeidsgivereMedInntektsmeldinger = grupperInntektsmeldingerPåArbeidsgiver(inntektsmeldinger);

    const harInntektsmeldingerSomIkkeErIBruk = inntektsmeldinger.some(
        (im) => im.status !== InntektsmeldingStatus.I_BRUK,
    );

    const renderInntektsmeldinger = (im: Inntektsmelding[]) => {
        return (
            <VStack gap="space-8">
                {im.map((inntektsmelding) => (
                    <InntektsmeldingLinkCard
                        key={inntektsmelding.journalpostId}
                        inntektsmelding={inntektsmelding}
                        saksnummer={saksnummer}
                    />
                ))}
            </VStack>
        );
    };

    return (
        <VStack gap="space-32">
            <VStack gap="space-6">
                <Heading level="2" size="medium">
                    Arbeidsgivere og inntektsmeldinger
                </Heading>
                {harInntektsmeldingerSomIkkeErIBruk && (
                    <Box>
                        <Switch
                            checked={visIkkeIBruk}
                            onChange={(e) => {
                                setVisIkkeIBruk(e.target.checked);
                            }}>
                            Vis inntektsmeldinger som ikke er i bruk eller er erstattet av nyere
                        </Switch>
                    </Box>
                )}
            </VStack>
            <VStack gap="space-48">
                {arbeidsgivereMedInntektsmeldinger.map((arbeidsgiver) => {
                    return (
                        <VStack gap="space-12" key={arbeidsgiver.arbeidsgiverId}>
                            <Heading level="3" size="medium">
                                {arbeidsgiver.arbeidsgiverNavn}
                                <BodyShort>Organisasjonsnummer {arbeidsgiver.arbeidsgiverId}</BodyShort>
                            </Heading>
                            {arbeidsgiver.inntektsmeldinger.map((inntektsmelding) => {
                                if (visIkkeIBruk === false && inntektsmelding.status !== InntektsmeldingStatus.I_BRUK) {
                                    return null;
                                }
                                return (
                                    <VStack gap="space-8" key={inntektsmelding.journalpostId}>
                                        <InntektsmeldingLinkCard
                                            inntektsmelding={inntektsmelding}
                                            saksnummer={saksnummer}
                                        />
                                        {visIkkeIBruk && inntektsmelding.erstatter.length > 0 && (
                                            <Box
                                                borderWidth="0 0 0 1"
                                                borderColor="info-subtleA"
                                                paddingBlock="space-0 space-4"
                                                marginInline={{ xs: 'space-12 space-0', md: 'space-16 space-0' }}>
                                                <VStack
                                                    gap="space-12"
                                                    marginInline={{ xs: 'space-12 space-0', md: 'space-16 space-0' }}
                                                    marginBlock="space-8 space-8">
                                                    <Heading level="3" size="xsmall">
                                                        Inntektsmeldingen over erstatter disse:
                                                    </Heading>
                                                    {renderInntektsmeldinger(inntektsmelding.erstatter)}
                                                </VStack>
                                            </Box>
                                        )}
                                    </VStack>
                                );
                            })}
                        </VStack>
                    );
                })}
            </VStack>
        </VStack>
    );
};

export default InntektsmeldingerListe;
