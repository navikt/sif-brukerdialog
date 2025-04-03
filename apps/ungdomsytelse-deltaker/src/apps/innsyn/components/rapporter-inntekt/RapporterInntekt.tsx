import { Alert, BodyLong, BodyShort, Box, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import { useRef, useState } from 'react';
import { dateFormatter, dateRangeFormatter } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import InntektForm from '../inntekt-form/InntektForm';
import { getFristForRapporteringsperiode } from '../../utils/deltakelseUtils';
import InntektOppsummering from '../inntekt-oppsummering/InntektOppsummering';
import { useAppIntl } from '../../../../i18n';
import { useDeltakerContext } from '../../../../context/DeltakerContext';

interface Props {
    rapporteringsperiode: Rapporteringsperiode;
}

const RapporterInntekt = ({ rapporteringsperiode }: Props) => {
    const { intl } = useAppIntl();
    const { periode, harRapportert } = rapporteringsperiode;
    const [inntektFormSent, setInntektFormSent] = useState(false);
    const { refetchDeltakelser } = useDeltakerContext();

    const meldingRef = useRef<HTMLDivElement>(null);

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
                    <VStack gap="4">
                        <BodyLong>
                            Inntekt er rapportert for denne perioden (
                            {dateRangeFormatter.getDateRangeText(periode, intl.locale)}).
                        </BodyLong>
                        <InntektOppsummering
                            visHeading={false}
                            periode={periode}
                            inntekt={{
                                summertInntekt: rapporteringsperiode.summertInntekt || 0,
                                arbeidOgFrilansInntekter: rapporteringsperiode.arbeidstakerOgFrilansInntekt || 0,
                                ytelseInntekter: rapporteringsperiode.inntektFraYtelse || 0,
                            }}
                        />
                        <div role="status" aria-live="assertive">
                            {inntektFormSent && (
                                <Alert variant="success" ref={meldingRef} tabIndex={-1}>
                                    Inntekt er rapportert
                                </Alert>
                            )}
                        </div>
                    </VStack>
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
                                    onSuccess={() => {
                                        setInntektFormSent(true);
                                        refetchDeltakelser();
                                        setTimeout(() => {
                                            meldingRef.current?.focus();
                                        }, 20);
                                    }}
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
