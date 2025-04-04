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
    const [oppdatertPeriode, setOppdatertPeriode] = useState<Rapporteringsperiode | null>(null);
    const [periodeErOppdatert, setPeriodeErOppdatert] = useState(false);
    const { refetchDeltakelser } = useDeltakerContext();

    const meldingRef = useRef<HTMLDivElement>(null);

    const [visSkjema, setVisSkjema] = useState(false);
    const månedNavn = dateFormatter.month(periode.from);
    const månedÅrNavn = dateFormatter.monthFullYear(periode.from);

    const fristForRapportering = getFristForRapporteringsperiode(periode);
    const synligPeriode = oppdatertPeriode || rapporteringsperiode;

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
                            periode={synligPeriode.periode}
                            inntekt={{
                                summertInntekt: synligPeriode.summertInntekt || 0,
                                arbeidOgFrilansInntekter: synligPeriode.arbeidstakerOgFrilansInntekt || 0,
                                ytelseInntekter: synligPeriode.inntektFraYtelse || 0,
                            }}
                        />
                        <div role="status" aria-live="assertive">
                            {periodeErOppdatert && (
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
                                    onSuccess={(data) => {
                                        setOppdatertPeriode({
                                            ...rapporteringsperiode,
                                            arbeidstakerOgFrilansInntekt:
                                                data.oppgittInntektForPeriode.arbeidstakerOgFrilansInntekt,
                                            inntektFraYtelse: data.oppgittInntektForPeriode.inntektFraYtelse,
                                            summertInntekt:
                                                (data.oppgittInntektForPeriode.arbeidstakerOgFrilansInntekt || 0) +
                                                (data.oppgittInntektForPeriode.inntektFraYtelse || 0),
                                        });
                                        setPeriodeErOppdatert(true);
                                        setTimeout(() => {
                                            refetchDeltakelser().then(() => {
                                                meldingRef.current?.focus();
                                                setOppdatertPeriode(null);
                                            });
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
