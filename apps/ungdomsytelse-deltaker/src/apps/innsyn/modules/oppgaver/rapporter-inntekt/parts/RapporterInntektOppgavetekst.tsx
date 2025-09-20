import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateFormatter } from '@navikt/sif-common-utils';

import { AppText } from '../../../../../../i18n';

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
                <AppText id="rapporterInntektOppgavetekst.tittel" values={{ deltakerNavn }} />
            </Heading>
            <Box maxWidth="90%">
                <BodyLong spacing>
                    <AppText id="rapporterInntektOppgavetekst.intro" values={{ måned }} />
                </BodyLong>
                <BodyLong spacing>
                    <AppText id="rapporterInntektOppgavetekst.instruks" values={{ frist }} />
                </BodyLong>
                <BodyLong spacing>
                    <AppText id="rapporterInntektOppgavetekst.ingenLønn" values={{ måned }} />
                </BodyLong>
            </Box>
        </VStack>
    );
};

export default RapporterInntektOppgavetekst;
