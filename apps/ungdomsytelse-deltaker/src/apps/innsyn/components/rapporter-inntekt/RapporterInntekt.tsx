import { BodyLong, BodyShort, Box, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import InntektForm from '../inntekt-form/InntektForm';
import { getFristForRapporteringsperiode } from '../../utils/deltakelseUtils';

interface Props {
    rapporteringsperiode: Rapporteringsperiode;
}

const RapporterInntekt = ({ rapporteringsperiode }: Props) => {
    const { periode, harRapportert } = rapporteringsperiode;

    const [visSkjema, setVisSkjema] = useState(false);
    const månedNavn = dateFormatter.month(periode.from);
    const månedÅrNavn = dateFormatter.monthFullYear(periode.from);

    const fristForRapportering = getFristForRapporteringsperiode(periode);

    return (
        <Box className="bg-deepblue-50 p-8 rounded-md">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Inntekt {månedÅrNavn}
                </Heading>
                {harRapportert ? (
                    <BodyLong>Inntekt er rapportert for denne perioden</BodyLong>
                ) : (
                    <>
                        <BodyShort>
                            Hvis du har inntekt i {månedNavn}, må du oppgi denne innen utgangen av{' '}
                            <strong>{dateFormatter.dayDateMonth(fristForRapportering)}</strong>. Hvis du ikke har noe
                            inntekt denne måneden, trenger du ikke melde fra.
                        </BodyShort>
                        <ExpansionCard
                            size="small"
                            aria-label="Small-variant"
                            open={visSkjema}
                            onToggle={(isOpen) => {
                                setVisSkjema(isOpen);
                            }}>
                            <ExpansionCard.Header>
                                <ExpansionCard.Title size="small">Vis skjema</ExpansionCard.Title>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <InntektForm
                                    periode={periode}
                                    onCancel={() => {
                                        setVisSkjema(false);
                                    }}
                                />
                            </ExpansionCard.Content>
                        </ExpansionCard>
                    </>
                )}
            </VStack>
        </Box>
    );
};

export default RapporterInntekt;
