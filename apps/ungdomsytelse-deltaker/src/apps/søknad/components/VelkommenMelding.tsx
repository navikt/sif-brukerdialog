import { BodyLong, BodyShort, Box, GuidePanel, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';
import { useAppIntl } from '../../../i18n';

interface Props {
    fornavn: string;
    startdato: Date;
}

const VelkommenMelding = ({ fornavn, startdato }: Props) => {
    const { text } = useAppIntl();
    return (
        <GuidePanel poster={true}>
            <Box paddingBlock="4 0">
                <Heading level="1" size="medium" spacing={true}>
                    Hei {fornavn}!
                </Heading>
                <VStack gap="4">
                    <BodyLong size="large">
                        Veilederen din har meldt deg inn i ungdomsprogrammet fra{' '}
                        <strong>{dateFormatter.dateShortMonthYear(startdato)}</strong>.
                    </BodyLong>
                    <BodyShort>
                        Fordi du er med i ungdomsprogrammet kan du søke om ytelse fra oss. Det sikrer deg inntekt mens
                        du jobber med å komme i jobb eller utdanning. For å søke om ytelsen, må du fylle ut denne
                        søknaden. Les mer om ungdomsprogrammet og ytelsen på nav.no[TODO].
                    </BodyShort>
                    <ReadMore header={text('personopplysninger.accordion.header')}>
                        <BehandlingAvPersonopplysningerContent />
                    </ReadMore>
                </VStack>
            </Box>
        </GuidePanel>
    );
};

export default VelkommenMelding;
