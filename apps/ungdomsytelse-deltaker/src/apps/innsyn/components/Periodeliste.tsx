import { BodyShort, Box, Button, ExpansionCard, Heading, HStack, VStack } from '@navikt/ds-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedNumber } from 'react-intl';
import { Add } from '@navikt/ds-icons';
import { dateFormatter, dateRangeFormatter } from '@navikt/sif-common-utils';
import { Rapporteringsperiode } from '@navikt/ung-common';
import { useAppIntl } from '../../../i18n';
import { erDatoIFørsteMånedIProgrammet } from '../utils/deltakelseUtils';
import EndreInntektDialog from './endre-inntekt-dialog/EndreInntektDialog';

interface Props {
    perioder: Rapporteringsperiode[];
    programperiodeStartDato: Date;
    erLåstForEndring?: boolean;
}

const Periodeliste = ({ perioder, programperiodeStartDato, erLåstForEndring }: Props) => {
    const { locale } = useAppIntl();
    const [antall, setAntall] = useState(2);
    const [focusIndex, setFocusIndex] = useState<number | undefined>();
    const ref = useRef<HTMLDivElement>(null);
    const [periodeForEndring, setPeriodeForEndring] = useState<Rapporteringsperiode | undefined>();

    useEffect(() => {
        if (focusIndex && ref.current) {
            ref.current.focus();
            setFocusIndex(undefined);
        }
    }, [antall, focusIndex]);

    if (perioder.length === 0) {
        return null;
    }

    const totalt = useMemo(() => perioder.length, perioder);

    const visFlere = () => {
        setFocusIndex(antall);
        setAntall(Math.min(perioder.length, antall + 3));
    };

    const visEndreDialog = (periode: Rapporteringsperiode) => {
        setPeriodeForEndring(periode);
    };

    return (
        <VStack gap="2">
            {perioder.slice(0, antall).map((rapporteringsperiode, index) => {
                const { periode, inntekt, kanRapportere = true } = rapporteringsperiode;
                const måned = dateFormatter.MonthFullYear(periode.from, locale);
                const datoperiode = dateRangeFormatter.getDateRangeText(periode, locale);
                const periodeNavn = `${måned} - ${datoperiode}`;
                const erFørsteMåned = erDatoIFørsteMånedIProgrammet(periode.from, programperiodeStartDato);
                return (
                    <ExpansionCard
                        size="small"
                        aria-label={periodeNavn}
                        key={periode.from.toISOString()}
                        ref={index === focusIndex ? ref : undefined}>
                        <ExpansionCard.Header>
                            <VStack gap="2">
                                <ExpansionCard.Title size="small">{måned}</ExpansionCard.Title>
                                <BodyShort as="div" size="small">
                                    <HStack gap="4">
                                        <Box>
                                            <BodyShort size="small" as="span">
                                                {datoperiode}
                                            </BodyShort>
                                        </Box>
                                        {erFørsteMåned ? null : (
                                            <>
                                                |
                                                <Box>
                                                    Registrert inntekt:{' '}
                                                    <BodyShort size="small" as="span" weight="semibold">
                                                        <FormattedNumber value={inntekt?.summertInntekt || 0} />
                                                    </BodyShort>
                                                    ,-
                                                </Box>
                                            </>
                                        )}
                                    </HStack>
                                </BodyShort>
                            </VStack>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            {erFørsteMåned ? (
                                <>
                                    Dette er den første måneden din i programmet. Du trenger ikke rapportere inntekt for
                                    denne måneden.
                                </>
                            ) : (
                                <>
                                    {kanRapportere ? (
                                        <VStack gap="6">
                                            <HStack gap="4">
                                                <Box>
                                                    Arbeidstaker/frilanser:{' '}
                                                    <FormattedNumber
                                                        value={inntekt?.arbeidstakerOgFrilansInntekt || 0}
                                                    />
                                                    ,-
                                                </Box>
                                                <Box>
                                                    Ytelse fra Nav:{' '}
                                                    <FormattedNumber value={inntekt?.inntektFraYtelse || 0} />
                                                    ,-
                                                </Box>
                                            </HStack>
                                            <VStack gap="2">
                                                <Heading level="3" size="xsmall">
                                                    Endre inntekt
                                                </Heading>
                                                <BodyShort>
                                                    Hvis inntekten har endret seg, kan du korrigere den her.
                                                </BodyShort>
                                                <Box style={{ marginTop: '.25rem' }}>
                                                    {erLåstForEndring ? null : (
                                                        <Button
                                                            variant="secondary"
                                                            type="button"
                                                            size="small"
                                                            onClick={() => {
                                                                visEndreDialog(rapporteringsperiode);
                                                            }}>
                                                            Endre inntekt
                                                        </Button>
                                                    )}
                                                </Box>
                                            </VStack>
                                        </VStack>
                                    ) : (
                                        <VStack gap="2">
                                            <BodyShort>
                                                Evt. informasjon som er relevant for deltaker på denne perioden. Hvis
                                                inntekten kan endres, vises knapp for det.
                                            </BodyShort>
                                            <Box>
                                                {erFørsteMåned
                                                    ? 'Du skal ikke rapportere inntekt for den første måneden i programmet.'
                                                    : 'Inntekten kan ikke endres på dette tidspunktet.'}
                                            </Box>
                                        </VStack>
                                    )}
                                </>
                            )}
                        </ExpansionCard.Content>
                    </ExpansionCard>
                );
            })}
            {antall < totalt ? (
                <Box className="flex justify-start">
                    <Button variant="tertiary" type="button" onClick={visFlere}>
                        <HStack gap="2" align="center" wrap={false}>
                            <Add role="presentation" />
                            Vis flere perioder
                        </HStack>
                    </Button>
                </Box>
            ) : null}
            <EndreInntektDialog
                rapporteringsperiode={periodeForEndring}
                onCancel={() => setPeriodeForEndring(undefined)}
            />
        </VStack>
    );
};

export default Periodeliste;
