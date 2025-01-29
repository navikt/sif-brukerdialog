import { Add } from '@navikt/ds-icons';
import { BodyShort, Box, Button, ExpansionCard, Heading, HStack, VStack } from '@navikt/ds-react';
import { Rapporteringsperiode } from '../../../api/types';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useAppIntl } from '../../../i18n';
import { FormattedNumber } from 'react-intl';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
    perioder: Rapporteringsperiode[];
}

const TidligerePerioder = ({ perioder }: Props) => {
    const { locale } = useAppIntl();
    const [antall, setAntall] = useState(3);
    const [focusIndex, setFocusIndex] = useState<number | undefined>();
    const ref = useRef<HTMLDivElement>(null);

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

    return (
        <VStack gap="2">
            <Heading level="2" size="small" spacing={true}>
                Tidligere perioder
            </Heading>

            {perioder.slice(0, antall).map(({ periode, inntekt = 0, kanRapportere }, index) => {
                const periodeNavn = dateFormatter.MonthFullYear(periode.from, locale);
                return (
                    <ExpansionCard
                        size="small"
                        aria-label={periodeNavn}
                        key={periode.from.toISOString()}
                        ref={index === focusIndex ? ref : undefined}>
                        <ExpansionCard.Header>
                            <VStack gap="2">
                                <ExpansionCard.Title size="small">{periodeNavn}</ExpansionCard.Title>
                                <BodyShort as="div" size="small">
                                    <HStack gap="4">
                                        <Box>
                                            Inntekt: <FormattedNumber value={inntekt} /> kroner
                                        </Box>
                                    </HStack>
                                </BodyShort>
                            </VStack>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            {kanRapportere ? (
                                <VStack gap="2">
                                    <Heading level="3" size="xsmall">
                                        Har inntekten endret seg?
                                    </Heading>
                                    <Box>
                                        <Button variant="secondary" type="button" size="small" disabled={true}>
                                            Endre inntekt
                                        </Button>
                                    </Box>
                                </VStack>
                            ) : (
                                <VStack gap="2">
                                    <BodyShort>
                                        Evt. informasjon som er relevant for deltaker på denne perioden. Hvis inntekten
                                        kan endres, vises knapp for det.
                                    </BodyShort>
                                    <Box>Inntekten kan ikke endres på dette tidspunktet.</Box>
                                </VStack>
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
        </VStack>
    );
};

export default TidligerePerioder;
