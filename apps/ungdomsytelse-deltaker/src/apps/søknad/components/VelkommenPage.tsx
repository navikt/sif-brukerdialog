import { BodyLong, Box, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import YtelseHeader from '../../../components/ytelse-header/YtelseHeader';

interface Props {
    fornavn: string;
    startdato: Date;
}

const VelkommenMelding = ({ fornavn, startdato }: Props) => {
    return (
        <VStack gap="8">
            <YtelseHeader title="Søknad om ungdomsytelse" />
            <Box className="bg-deepblue-50 p-8 rounded-md">
                <Heading level="1" size="medium" spacing={true}>
                    Hei {fornavn}!
                </Heading>
                <BodyLong as="div">
                    <p>
                        Du er meldt på av din veileder til å være med i ungdomsprogrammet fra og med{' '}
                        <strong>{dateFormatter.dateShortMonthYear(startdato)}</strong>. For å kunne motta ungdomsytelsen
                        må du fylle ut og sende inn søknadsskjemaet nedenfor.
                    </p>
                </BodyLong>
            </Box>
        </VStack>
    );

    /*  */
};

export default VelkommenMelding;
