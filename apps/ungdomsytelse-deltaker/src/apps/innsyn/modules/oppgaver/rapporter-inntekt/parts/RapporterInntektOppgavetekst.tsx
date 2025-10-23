import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';
import dayjs from 'dayjs';

interface Props {
    deltakerNavn: string;
    periode: DateRange;
    svarfrist: Date;
}

const RapporterInntektOppgavetekst = ({ deltakerNavn, svarfrist, periode }: Props) => {
    /** Finn datoen før fristen, i og med teksten er "senest [dato]" */
    const senestDato = dayjs(svarfrist).subtract(1, 'day').toDate();
    const frist = dateFormatter.full(senestDato);
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
                    <AppText
                        id="rapporterInntektOppgavetekst.instruks"
                        values={{ frist, strong: (content) => <strong>{content}</strong> }}
                    />
                </BodyLong>
                <BodyLong spacing>
                    <AppText id="rapporterInntektOppgavetekst.ingenInntekt" values={{ måned }} />
                </BodyLong>
            </Box>
        </VStack>
    );
};

export default RapporterInntektOppgavetekst;
