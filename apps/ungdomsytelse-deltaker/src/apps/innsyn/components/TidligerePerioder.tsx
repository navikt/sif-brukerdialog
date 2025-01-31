import { Add } from '@navikt/ds-icons';
import { BodyShort, Box, Button, ExpansionCard, Heading, HStack, VStack } from '@navikt/ds-react';
import { Rapporteringsperiode } from '../../../api/types';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useAppIntl } from '../../../i18n';
import { FormattedNumber } from 'react-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import EndreInntektDialog from './endre-inntekt-dialog/EndreInntektDialog';

interface Props {
    deltakelseId: string;
    perioder: Rapporteringsperiode[];
}

const TidligerePerioder = ({ perioder, deltakelseId }: Props) => {
    const { locale } = useAppIntl();
    const [antall, setAntall] = useState(3);
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
            <Heading level="2" size="small" spacing={true}>
                Tidligere perioder
            </Heading>

            {perioder.slice(0, antall).map((rapporteringsperiode, index) => {
                const { periode, inntekt, kanRapportere } = rapporteringsperiode;
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
                                            Registrert inntekt:{' '}
                                            <BodyShort as="span" weight="semibold">
                                                <FormattedNumber value={inntekt?.summertInntekt || 0} />
                                            </BodyShort>
                                            ,-
                                        </Box>
                                    </HStack>
                                </BodyShort>
                            </VStack>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            {kanRapportere ? (
                                <VStack gap="6">
                                    <HStack gap="4">
                                        <Box>
                                            Arbeidstaker/frilanser:{' '}
                                            <FormattedNumber value={inntekt?.inntektAnsatt || 0} />
                                            ,-
                                        </Box>
                                        <Box>
                                            Selvstendig næringsdrivende:{' '}
                                            <FormattedNumber value={inntekt?.inntektSN || 0} />
                                            ,-
                                        </Box>
                                        <Box>
                                            Ytelse fra Nav: <FormattedNumber value={inntekt?.inntektYtelse || 0} />
                                            ,-
                                        </Box>
                                    </HStack>
                                    <VStack gap="3">
                                        <Heading level="3" size="xsmall">
                                            Endre inntekt
                                        </Heading>
                                        <BodyShort>Hvis inntekten har endret seg, kan du korrigere den her.</BodyShort>
                                        <Box>
                                            <Button
                                                variant="secondary"
                                                type="button"
                                                size="small"
                                                onClick={() => {
                                                    visEndreDialog(rapporteringsperiode);
                                                }}>
                                                Endre inntekt
                                            </Button>
                                        </Box>
                                    </VStack>
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
            <EndreInntektDialog
                deltakelseId={deltakelseId}
                rapporteringsperiode={periodeForEndring}
                onCancel={() => setPeriodeForEndring(undefined)}
            />
        </VStack>
    );
};

export default TidligerePerioder;
