import { Box, BoxNew, Switch, VStack } from '@navikt/ds-react';
import { useState } from 'react';

import { Inntektsmelding, InntektsmeldingStatus } from '../../types';
import InntektsmeldingLinkCard from '../inntektsmelding-link-card/InntektsmeldingLinkCard';

interface Props {
    inntektsmeldinger: Inntektsmelding[];
    saksnummer: string;
}

const InntektsmeldingerListe = ({ inntektsmeldinger, saksnummer }: Props) => {
    const [visIkkeIBruk, setVisIkkeIBruk] = useState(false);

    const filterteInntektsmeldinger = visIkkeIBruk
        ? inntektsmeldinger
        : inntektsmeldinger.filter((im) => im.status === InntektsmeldingStatus.I_BRUK);

    const harInntektsmeldingerSomIkkeErIBruk = inntektsmeldinger.some(
        (im) => im.status !== InntektsmeldingStatus.I_BRUK,
    );
    return (
        <VStack gap="2">
            {harInntektsmeldingerSomIkkeErIBruk && (
                <Box>
                    <Switch
                        checked={visIkkeIBruk}
                        onChange={(e) => {
                            setVisIkkeIBruk(e.target.checked);
                        }}>
                        Inkluder inntektsmeldinger som ikke er i bruk
                    </Switch>
                </Box>
            )}
            {filterteInntektsmeldinger.map((inntektsmelding) => {
                const iBruk = inntektsmelding.status === InntektsmeldingStatus.I_BRUK;
                return iBruk ? (
                    <InntektsmeldingLinkCard
                        key={inntektsmelding.journalpostId}
                        inntektsmelding={inntektsmelding}
                        saksnummer={saksnummer}
                    />
                ) : (
                    <BoxNew key={inntektsmelding.journalpostId} marginBlock="0 4" marginInline="6 0">
                        <InntektsmeldingLinkCard saksnummer={saksnummer} inntektsmelding={inntektsmelding} />
                    </BoxNew>
                );
            })}
        </VStack>
    );
};

export default InntektsmeldingerListe;
