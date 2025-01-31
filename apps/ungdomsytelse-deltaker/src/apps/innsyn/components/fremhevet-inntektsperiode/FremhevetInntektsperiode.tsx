import { Bleed, Box, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { dateFormatter, isDateInDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { Rapporteringsperiode } from '../../../../api/types';
import InntektForm from '../inntekt-form/InntektForm';
import EndreInntektPart from './EndreInntektPart';
import RapporterInntektPart from './RapporterInntektPart';

interface Props {
    deltakelseId: string;
    rapporteringsperiode: Rapporteringsperiode;
}

const FremhevetInntektsperiode = ({ rapporteringsperiode, deltakelseId }: Props) => {
    const {
        periode,
        harRapportert,
        kanRapportere = isDateInDateRange(new Date(), periode), // TODO - fallback frem til backend er klar
        fristForRapportering = dayjs().endOf('month').toDate(), // TODO - fallback frem til backend er klar
    } = rapporteringsperiode;

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
                    <EndreInntektPart
                        visSkjema={visSkjema}
                        månedNavn={månedNavn}
                        onEndreInntekt={() => setVisSkjema(true)}
                        kanRapportere={kanRapportere}
                        inntekt={rapporteringsperiode.inntekt}
                    />
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
                                    deltakelseId={deltakelseId}
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
