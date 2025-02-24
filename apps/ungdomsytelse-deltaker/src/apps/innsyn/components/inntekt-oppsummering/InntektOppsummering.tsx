import { BodyShort, Heading, HGrid, VStack } from '@navikt/ds-react';
import { FormattedNumber } from 'react-intl';
import { DateRange, dateRangeFormatter } from '@navikt/sif-common-utils';
import { Inntekt } from '@navikt/ung-common';
import { useAppIntl } from '../../../../i18n';

interface Props {
    periode: DateRange;
    inntekt: Inntekt;
}

const InntektOppsummering = ({ periode, inntekt }: Props) => {
    const { intl } = useAppIntl();
    return (
        <VStack gap="4">
            <VStack gap="1">
                <Heading level="3" size="small">
                    Oppsummering av din inntekt
                </Heading>
                <BodyShort size="small" className="text-text-subtle">
                    {dateRangeFormatter.getDateRangeText(periode, intl.locale)}
                </BodyShort>
            </VStack>
            <VStack className="border-t-2 border-t-border-divider border-b-border-default border-b-2">
                <HGrid columns={'1fr auto'} gap="4" className="border-b-2 border-border-divider p-2">
                    <BodyShort>Arbeidsgiver/&shy;frilanser</BodyShort>
                    <BodyShort>
                        <FormattedNumber value={inntekt.arbeidstakerOgFrilansInntekt || 0} />
                    </BodyShort>
                </HGrid>
                <HGrid columns={'1fr auto'} gap="4" className="border-b-2 border-border-divider p-2">
                    <BodyShort>Selvstendig næringsdrivende</BodyShort>
                    <BodyShort>
                        <FormattedNumber value={inntekt.næringsinntekt || 0} />
                    </BodyShort>
                </HGrid>
                <HGrid columns={'1fr auto'} gap="4" className="border-b-2 border-border-default p-2">
                    <BodyShort>Ytelse fra Nav</BodyShort>
                    <BodyShort>
                        <FormattedNumber value={inntekt.inntektFraYtelse || 0} />
                    </BodyShort>
                </HGrid>
                <HGrid
                    columns={'1fr auto'}
                    gap="4"
                    className="border-b-2 border-border-default p-2"
                    style={{ marginBottom: '.125rem' }}>
                    <BodyShort weight="semibold">Samlet inntekt</BodyShort>
                    <BodyShort weight="semibold">
                        <FormattedNumber value={inntekt.summertInntekt} />
                    </BodyShort>
                </HGrid>
            </VStack>
        </VStack>
    );
};

export default InntektOppsummering;
