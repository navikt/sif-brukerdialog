import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    deltakerNavn: string;
    periode: DateRange;
    svarfrist: Date;
}

const RapporterInntektOppgavetekst = ({ deltakerNavn, svarfrist, periode }: Props) => {
    const frist = dateFormatter.full(svarfrist);
    const måned = dateFormatter.month(periode.from);

    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                Hei {deltakerNavn}
            </Heading>
            <Box maxWidth="90%">
                <BodyLong spacing>Gi oss beskjed hvis du fikk utbetalt lønn i {måned}.</BodyLong>
                <BodyLong spacing>
                    Kryss av på “Ja”, skriv inn lønnen du fikk (før skatt) og send inn svaret ditt før {frist}.
                </BodyLong>
                <BodyLong spacing>
                    Du kan la være å svare eller krysse av på ”Nei” hvis du ikke hadde lønn i {måned}.
                </BodyLong>
            </Box>
        </VStack>
    );
};

export default RapporterInntektOppgavetekst;
