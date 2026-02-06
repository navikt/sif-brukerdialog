import { BodyShort, Heading, List, VStack } from '@navikt/ds-react';
import { DurationText } from '@navikt/sif-common-ui';
import { dateRangeToISODateRange, getDateRangeText } from '@navikt/sif-common-utils';
import { TilsynsordningApiData } from '@types';
import { useIntl } from 'react-intl';

import { getTilsynsordningOppsummeringInfo } from '../../../utils';

interface Props {
    tilsynsordning: TilsynsordningApiData;
}

const TilsynsordningOppsummering = ({ tilsynsordning }: Props) => {
    const { locale } = useIntl();
    const perioder = getTilsynsordningOppsummeringInfo(tilsynsordning);
    return (
        <VStack gap="space-32">
            <div>
                <Heading level="3" size="small" spacing={true}>
                    Endringer i omsorgstilbud
                </Heading>
                <List>
                    {perioder.map((periode) => (
                        <List.Item key={dateRangeToISODateRange(periode.periode)}>
                            <VStack gap="space-1">
                                <span className="capsFirstChar">
                                    {getDateRangeText(periode.periode, locale, {
                                        compact: true,
                                        includeDayName: true,
                                    })}
                                    :
                                </span>
                                <BodyShort weight="semibold">
                                    <DurationText
                                        duration={{ hours: periode.tid.hours, minutes: periode.tid.minutes }}
                                        fullText={true}
                                    />
                                </BodyShort>
                            </VStack>
                        </List.Item>
                    ))}
                </List>
            </div>
        </VStack>
    );
};

export default TilsynsordningOppsummering;
