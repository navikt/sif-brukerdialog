import { BodyLong, Box, GuidePanel, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import BehandlingAvPersonopplysningerContent from './BehandlingAvPersonopplysningerContent';
import { useAppIntl } from '../../../i18n';
import getLenker from '../../../utils/lenker';
import ExternalLink from './external-link/ExternalLink';

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
                    <BodyLong>
                        Du er meldt inn i ungdomsprogrammet fra{' '}
                        <strong>{dateFormatter.dayDateMonthYear(startdato)}</strong>.
                    </BodyLong>
                    <BodyLong>
                        Når du er med i ungdomsprogrammet, kan du søke om å få penger. Da får du utbetalt penger hver
                        måned så lenge du deltar i programmet.
                    </BodyLong>
                    <BodyLong>
                        Du søker ved å fylle ut denne søknaden. Les mer om{' '}
                        <ExternalLink href={getLenker().omUngdomsprogramytelsen}>
                            ungdomsprogrammet og -ytelsen på nav.no
                        </ExternalLink>
                        .
                    </BodyLong>
                    <VStack gap="0">
                        <ReadMore header="Hva hvis datoen ikke stemmer?">
                            Da tar du kontakt med din veileder og sier fra om dette, før du sender inn denne søknaden.
                        </ReadMore>
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
