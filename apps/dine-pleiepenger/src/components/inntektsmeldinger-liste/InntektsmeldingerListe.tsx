import { BodyShort, Heading, VStack } from '@navikt/ds-react';

import { Inntektsmelding } from '../../types';
import { grupperInntektsmeldingerPåArbeidsgiver } from '../../utils/inntektsmeldingUtils';
import InntektsmeldingLinkCard from '../inntektsmelding-link-card/InntektsmeldingLinkCard';

interface Props {
    inntektsmeldinger: Inntektsmelding[];
    saksnummer: string;
}

const InntektsmeldingerListe = ({ inntektsmeldinger, saksnummer }: Props) => {
    const arbeidsgivereMedInntektsmeldinger = grupperInntektsmeldingerPåArbeidsgiver(inntektsmeldinger);

    return (
        <VStack gap="space-32">
            <Heading level="2" size="medium">
                Arbeidsgivere og inntektsmeldinger
            </Heading>
            <VStack gap="space-48">
                {arbeidsgivereMedInntektsmeldinger.map((arbeidsgiver) => {
                    return (
                        <VStack gap="space-12" key={arbeidsgiver.arbeidsgiverId}>
                            <Heading level="3" size="medium">
                                {arbeidsgiver.arbeidsgiverNavn}
                                <BodyShort>{arbeidsgiver.arbeidsgiverId}</BodyShort>
                            </Heading>
                            {arbeidsgiver.inntektsmeldinger.map((inntektsmelding) => {
                                return (
                                    <VStack gap="space-8" key={inntektsmelding.journalpostId}>
                                        <InntektsmeldingLinkCard
                                            inntektsmelding={inntektsmelding}
                                            saksnummer={saksnummer}
                                        />
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
