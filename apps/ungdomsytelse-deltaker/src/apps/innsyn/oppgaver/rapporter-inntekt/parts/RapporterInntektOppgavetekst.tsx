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
                <BodyLong spacing>
                    Hadde du inntekt i {måned}, må du gi oss beskjed innen {frist}.
                </BodyLong>
                <BodyLong spacing>Hadde du ingen inntekt, trenger du ikke gjøre noe eller du kan svare nei.</BodyLong>
            </Box>
        </VStack>
    );
};

export default RapporterInntektOppgavetekst;
