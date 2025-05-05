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
                        Du er meldt inn i ungdomsprogrammet fra{' '}
                        <strong>{dateFormatter.dateShortMonthYear(startdato)}</strong>.
                    </BodyLong>
                    <BodyShort>
                        Når du er med i ungdomsprogrammet, kan du søke om å få penger gjennom ungdomsprogramytelsen. Da
                        får du utbetalt penger hver måned så lenge du deltar i programmet.
                    </BodyShort>
                    <BodyShort>
                        Du søker om ungdomsprogramytelsen ved å fylle ut denne søknaden. Les mer om ungdomsprogrammet og
                        -ytelsen på nav.no.
                    </BodyShort>
                    <VStack gap="0">
                        <ReadMore header="Hva hvis datoen ikke stemmer?">[TODO]</ReadMore>
                        <ReadMore header={text('personopplysninger.accordion.header')}>
                            <BehandlingAvPersonopplysningerContent />
                        </ReadMore>
                    </VStack>
                </VStack>
            </Box>
        </GuidePanel>
    );
};

export default VelkommenMelding;
