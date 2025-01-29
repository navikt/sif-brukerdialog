import { Alert, BodyShort, Box, Button, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { Rapporteringsperiode } from '../../../api/types';
import { dateFormatter } from '@navikt/sif-common-utils';
import { useState } from 'react';
import InntektForm from './inntekt-form/InntektForm';
import { FormattedNumber } from 'react-intl';

interface Props {
    deltakelseId: string;
    rapporteringsperiode: Rapporteringsperiode;
}

const Inntektsperiode = ({ rapporteringsperiode, deltakelseId }: Props) => {
    const { periode, fristForRapportering, harRapportert, kanEndre } = rapporteringsperiode;
    const [visSkjema, setVisSkjema] = useState(false);

    if (!fristForRapportering) {
        return <Alert variant="warning">FristForRapportering mangler</Alert>;
    }

    const månedNavn = dateFormatter.month(periode.from);
    const månedÅrNavn = dateFormatter.monthFullYear(periode.from);
    return (
        <Box className="bg-deepblue-50 p-8 rounded-md">
            <VStack gap="4">
                <Heading level="2" size="medium">
                    Inntekt {månedÅrNavn}
                </Heading>
                {harRapportert ? (
                    <BodyShort>
                        For {månedNavn} har du rapportert{' '}
                        <strong>
                            <FormattedNumber value={rapporteringsperiode.inntekt || 0} /> kroner
                        </strong>{' '}
                        i inntekt.
                    </BodyShort>
                ) : (
                    <BodyShort>
                        Hvis du har inntekt i {månedNavn}, må du oppgi denne innen utgangen av{' '}
                        <strong>{dateFormatter.dayDateMonth(fristForRapportering)}</strong>. Hvis du ikke har noe
                        inntekt denne måneden, trenger du ikke melde fra.
                    </BodyShort>
                )}
                <ReadMore header="Mer om inntekt, hva skal jeg ta med">Kort info</ReadMore>
                <Box className="mt-4">
                    {visSkjema ? (
                        <InntektForm
                            gjelderEndring={harRapportert}
                            deltakelseId={deltakelseId}
                            periode={periode}
                            onCancel={() => {
                                setVisSkjema(false);
                            }}
                        />
                    ) : (
                        <>
                            {kanEndre || harRapportert === false ? (
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => {
                                        setVisSkjema(true);
                                    }}>
                                    {harRapportert ? (
                                        <>Endre inntekt for {månedNavn} </>
                                    ) : (
                                        <>Meld inn inntekt for {månedNavn} </>
                                    )}
                                </Button>
                            ) : (
                                <>Du kan ikke endre inntekten for denne måneden enda</>
                            )}
                        </>
                    )}
                </Box>
            </VStack>
        </Box>
    );
};

export default Inntektsperiode;
