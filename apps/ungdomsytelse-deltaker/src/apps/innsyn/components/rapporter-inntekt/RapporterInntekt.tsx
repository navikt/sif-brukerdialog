import { Bleed, BodyLong, Box, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import InntektForm from '../inntekt-form/InntektForm';
import RapporterInntektPart from './RapporterInntektPart';

interface Props {
    rapporteringsperiode: Rapporteringsperiode;
}

const FremhevetInntektsperiode = ({ rapporteringsperiode }: Props) => {
    const { periode, harRapportert, kanRapportere, fristForRapportering } = rapporteringsperiode;

    if (!fristForRapportering) {
        return null;
    }

    const [visSkjema, setVisSkjema] = useState(false);
    const månedNavn = dateFormatter.month(periode.from);
    const månedÅrNavn = dateFormatter.monthFullYear(periode.from);

    return (
        <Box className="bg-deepblue-50 p-8 rounded-md">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Inntekt {månedÅrNavn}
                </Heading>
                {harRapportert ? (
                    <BodyLong>Inntekt er rapportert for denne perioden</BodyLong>
                ) : (
                    <RapporterInntektPart
                        visSkjema={visSkjema}
                        månedNavn={månedNavn}
                        fristForRapportering={fristForRapportering}
                        kanRapportere={kanRapportere}
                        onRapporterInntekt={() => setVisSkjema(true)}
                    />
                )}

                {visSkjema ? (
                    <Box className="mt-4">
                        <Bleed marginInline="5">
                            <VStack gap="4" className="rounded-md bg-white p-8 shadow-small">
                                <InntektForm
                                    gjelderEndring={harRapportert}
                                    periode={periode}
                                    onCancel={() => {
                                        setVisSkjema(false);
                                    }}
                                />
                            </VStack>
                        </Bleed>
                    </Box>
                ) : null}
            </VStack>
        </Box>
    );
};

export default FremhevetInntektsperiode;
